import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

export function openDatabase(filename = process.env.AGRIPULSE_DB_PATH || '.data/agripulse.sqlite') {
  if (filename !== ':memory:') mkdirSync(dirname(filename), { recursive: true });

  const db = new Database(filename);
  db.pragma('foreign_keys = ON');
  db.pragma('busy_timeout = 5000');
  if (filename !== ':memory:') db.pragma('journal_mode = WAL');
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE COLLATE NOCASE,
      password_hash TEXT,
      roles_json TEXT NOT NULL,
      is_demo INTEGER NOT NULL DEFAULT 0 CHECK (is_demo IN (0, 1)),
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sessions (
      token_hash TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      portal_type TEXT NOT NULL CHECK (portal_type IN ('farmer', 'seller')),
      remember_me INTEGER NOT NULL DEFAULT 0 CHECK (remember_me IN (0, 1)),
      created_at TEXT NOT NULL,
      expires_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS sessions_user_idx ON sessions(user_id);
    CREATE INDEX IF NOT EXISTS sessions_expiry_idx ON sessions(expires_at);

    CREATE TABLE IF NOT EXISTS workspace_snapshots (
      user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
      revision INTEGER NOT NULL DEFAULT 1,
      payload_json TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS farms (
      owner_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      id TEXT NOT NULL,
      data_json TEXT NOT NULL,
      PRIMARY KEY (owner_user_id, id)
    );

    CREATE TABLE IF NOT EXISTS plots (
      owner_user_id TEXT NOT NULL,
      farm_id TEXT NOT NULL,
      id TEXT NOT NULL,
      data_json TEXT NOT NULL,
      PRIMARY KEY (owner_user_id, farm_id, id),
      FOREIGN KEY (owner_user_id, farm_id) REFERENCES farms(owner_user_id, id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS plots_farm_idx ON plots(owner_user_id, farm_id);

    CREATE TABLE IF NOT EXISTS devices (
      id TEXT PRIMARY KEY,
      owner_user_id TEXT NOT NULL,
      farm_id TEXT NOT NULL,
      plot_id TEXT,
      gateway_id TEXT,
      type TEXT NOT NULL CHECK (type IN ('sensor_node', 'lora_gateway')),
      name TEXT NOT NULL,
      serial_number TEXT,
      metadata_json TEXT NOT NULL,
      is_demo_record INTEGER NOT NULL DEFAULT 0 CHECK (is_demo_record IN (0, 1)),
      paired_at TEXT,
      last_seen_at TEXT,
      retired_at TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      UNIQUE(owner_user_id, id),
      FOREIGN KEY (owner_user_id, farm_id) REFERENCES farms(owner_user_id, id) ON DELETE RESTRICT
    );
    CREATE UNIQUE INDEX IF NOT EXISTS devices_serial_unique
      ON devices(lower(serial_number))
      WHERE serial_number IS NOT NULL AND trim(serial_number) <> '';
    CREATE INDEX IF NOT EXISTS devices_owner_farm_idx ON devices(owner_user_id, farm_id, retired_at);
    CREATE INDEX IF NOT EXISTS devices_gateway_idx ON devices(owner_user_id, gateway_id);

    CREATE TABLE IF NOT EXISTS pairing_sessions (
      id TEXT PRIMARY KEY,
      device_id TEXT NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
      owner_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token_hash TEXT NOT NULL UNIQUE,
      expires_at TEXT NOT NULL,
      used_at TEXT,
      created_by TEXT NOT NULL REFERENCES users(id),
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS pairing_device_idx ON pairing_sessions(device_id, created_at DESC);

    CREATE TABLE IF NOT EXISTS device_credentials (
      device_id TEXT PRIMARY KEY REFERENCES devices(id) ON DELETE CASCADE,
      owner_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      secret_hash TEXT NOT NULL UNIQUE,
      created_at TEXT NOT NULL,
      revoked_at TEXT
    );

    CREATE TABLE IF NOT EXISTS telemetry_readings (
      id TEXT PRIMARY KEY,
      device_id TEXT NOT NULL REFERENCES devices(id) ON DELETE RESTRICT,
      owner_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      farm_id TEXT NOT NULL,
      sensor_type TEXT NOT NULL,
      value REAL NOT NULL,
      unit TEXT NOT NULL,
      measured_at TEXT NOT NULL,
      received_at TEXT NOT NULL,
      quality TEXT NOT NULL CHECK (quality IN ('valid', 'suspect', 'invalid')),
      source TEXT NOT NULL DEFAULT 'physical_sensor' CHECK (source = 'physical_sensor')
    );
    CREATE INDEX IF NOT EXISTS telemetry_device_time_idx ON telemetry_readings(device_id, measured_at DESC);
    CREATE INDEX IF NOT EXISTS telemetry_owner_farm_idx ON telemetry_readings(owner_user_id, farm_id, measured_at DESC);

    CREATE TABLE IF NOT EXISTS device_events (
      id TEXT PRIMARY KEY,
      device_id TEXT NOT NULL REFERENCES devices(id) ON DELETE RESTRICT,
      owner_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      actor_user_id TEXT REFERENCES users(id),
      event_type TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      source TEXT NOT NULL CHECK (source IN ('backend', 'device', 'demo')),
      occurred_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS device_events_device_idx ON device_events(device_id, occurred_at DESC);

    CREATE TABLE IF NOT EXISTS audit_events (
      id TEXT PRIMARY KEY,
      actor_user_id TEXT REFERENCES users(id),
      owner_user_id TEXT REFERENCES users(id),
      action TEXT NOT NULL,
      resource_type TEXT NOT NULL,
      resource_id TEXT,
      outcome TEXT NOT NULL CHECK (outcome IN ('success', 'denied', 'failure')),
      metadata_json TEXT NOT NULL DEFAULT '{}',
      occurred_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS audit_owner_time_idx ON audit_events(owner_user_id, occurred_at DESC);
  `);
  db.pragma('user_version = 1');
  return db;
}
