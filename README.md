# AGRIPULSE — Intelligent Farm Digital Twin & Early Crop-Stress Detection

**Tagline:** *Measure. Understand. Predict. Protect.*

AGRIPULSE is a responsive dual-portal prototype for Indian farmers and agricultural sellers. The React app preserves farmer workflows for farm/plot records, weather guidance, crop-health references, the bilingual dictionary, a sample marketplace, schemes/news, and Devices & IoT, alongside a seller workspace for catalog and order-flow concepts.

> **Honest status:** This repository now includes an authenticated Express API, server-backed account workspaces, and a SQLite-backed device registry/pairing/telemetry prototype. It is still a development product, not a production agricultural, commerce, weather, AI, or hardware service. Real email verification/recovery, seller verification, cross-account marketplace fulfillment, shipping, payments/payouts, a live weather provider, a hosted AI model, physical device firmware, and a production IoT trust/broker service are not configured.

## What is server-backed

- **Accounts:** Farmer and seller registration and password login use the API. Passwords are scrypt-hashed. Session tokens are random, stored hashed server-side, and sent in an `HttpOnly`, `SameSite=Lax` cookie. Email verification and account recovery are not implemented.
- **Workspaces:** Farm/profile/preferences and other account-scoped workspace state are saved as revisioned server snapshots. The development API uses SQLite (`.data/agripulse.sqlite` by default). Workspace writes reject secret-like fields and prevent stale revision overwrites.
- **Devices:** Farmer-owned device metadata, derived status, gateway relationships, one-time pairing sessions, event history, and validated telemetry live in API-managed database tables—not browser `localStorage`. The UI never marks a device online manually. The local pairing/ingestion API is not connected to physical hardware and must not be treated as proof of installation.
- **Development demo:** Clearly labelled launchers call a development-only API route. Demo content is stored in a shared local demo workspace and is not a production account. Demo launch is disabled with `NODE_ENV=production` or `ALLOW_DEMO_SESSIONS=false`.

Read [`docs/DEVICE_API_CONTRACTS.md`](docs/DEVICE_API_CONTRACTS.md) for implemented routes and security/deployment limitations. The original product scope is retained in [`docs/BLUEPRINT.md`](docs/BLUEPRINT.md).

## Data provenance and safety

- Manual farmer observations, sample/demo records, physical sensor telemetry, and weather-provider data are separate sources and should remain visibly labelled.
- The current build has **no physical rain-gauge or rainfall-mm sensor**. Forecast precipitation is not measured farm rainfall; unavailable readings are not replaced with zero.
- With no weather endpoint configured, the app uses clearly labelled sample forecasts. The optional `VITE_WEATHER_API_URL` is a frontend endpoint hook, not a bundled or verified provider integration. Never put private provider credentials in a `VITE_*` variable.
- The floating AGRIPULSE assistant uses local rule-based/reference responses; it is not a hosted generative AI service or individualized agronomic diagnosis.
- The marketplace catalog, checkout/order flows, seller ratings, invoices, and settlement screens are demonstrations. Account edits can be persisted in a workspace, but do not publish listings to a shared storefront, create cross-account fulfillment, arrange shipment, charge money, verify sellers, or transfer funds.
- Never enter network passwords, provisioning tokens, private keys, SIM PINs, bank credentials, or real payment details in the development demo. The demo workspace is shared and its local database is not production-grade storage.

## Portals and routes

- **Farmer:** `/home`, `/farm`, `/weather`, `/devices`, `/devices/:deviceId`, `/dictionary`, `/disease`, `/store`, `/cart`, `/checkout`, `/orders`, `/wishlist`, `/offers`, `/news`, `/schemes`, `/account`
- **Seller:** `/seller` and `/seller/dashboard`
- **Authentication:** `/farmer/login`, `/farmer/signup`, `/login`, `/seller/login`, `/signup`, `/seller/signup`

Seller accounts are restricted to the seller role. Portal switching is available only to the development demo account, which has both roles.

## Local development

**Requirements:** Node.js 22 or newer and npm.

```bash
npm install
npm run dev
```

`npm run dev` starts the API on `0.0.0.0:4000` and Vite on `0.0.0.0:3000`; Vite proxies `/api` to the API. Set `AGRIPULSE_API_PROXY` if the API runs at another address. The API accepts `API_HOST`, `API_PORT`, `AGRIPULSE_DB_PATH`, `DEVICE_ONLINE_WINDOW_SECONDS`, and `ALLOW_DEMO_SESSIONS` environment settings.

For production builds and verification:

```bash
npm run lint
npm test
npm run build
```

`npm run preview` serves the static frontend only; run the API separately when testing authenticated features. SQLite database files, build output, and environment files are excluded from Git.

## Before any production deployment

Use a managed database with backup/restore and migrations, TLS, a production session/cookie policy, account recovery and email verification, robust monitoring and audit review, and a reviewed authorization model. Hardware rollout additionally needs device attestation and credential rotation, a trusted provisioning workflow, authenticated transport (such as MQTT over TLS or HTTPS), signed/validated firmware, telemetry abuse controls, and real-device acceptance tests. Commerce, weather, and AI require their own vetted server-side integrations. Do not describe the current local API or UI prototype as production-ready.
