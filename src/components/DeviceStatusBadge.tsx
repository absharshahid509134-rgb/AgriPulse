import React from 'react';
import { AlertTriangle, Archive, CheckCircle2, CircleDashed, CircleDot, Link2, LucideIcon } from 'lucide-react';
import { DeviceStatus } from '../types';
import { DEVICE_STATUS_META } from '../services/deviceService';

const statusIcons: Record<DeviceStatus, LucideIcon> = {
  draft: CircleDashed,
  pending_pairing: CircleDashed,
  pending_gateway_assignment: Link2,
  online: CheckCircle2,
  offline: CircleDot,
  attention_required: AlertTriangle,
  retired: Archive,
};

export const DeviceStatusBadge: React.FC<{ status: DeviceStatus; compact?: boolean }> = ({ status, compact = false }) => {
  const Icon = statusIcons[status];
  const meta = DEVICE_STATUS_META[status];
  return (
    <span className={`device-status-badge tone-${meta.tone} ${compact ? 'is-compact' : ''}`} title={meta.description}>
      <Icon size={compact ? 13 : 14} aria-hidden="true" />
      <span>{meta.label}</span>
    </span>
  );
};
