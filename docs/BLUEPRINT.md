# AGRIPULSE — Complete Website Architecture & Functional Blueprint (Version 2)

**Platform Name:** AGRIPULSE — *Intelligent Farm Digital Twin & Early Crop-Stress Detection System*  
**Tagline:** *Measure. Understand. Predict. Protect.*  
**Repository:** `coderguy-0/AgriPulse`

---

## 1. Executive Summary & Dual-Portal Architecture

**AGRIPULSE** is a full-stack-capable, offline-resilient, dual-portal agricultural platform designed for Indian farmers, agricultural extension students/officers, and certified agri-input dealers/cooperatives.

The application operates across **two interconnected portals** backed by a unified reactive state layer. Local storage supports demo/offline drafts; production device state and telemetry live in the backend:

1. **Farmer Portal (`/home` plus specialized modules, including Devices & IoT):**
   - Personalized Farm Digital Twin, Multi-Farm & Plot Registry, Regional Land Unit Converter (*Bigha ↔ Acre ↔ Hectare*), Agro-Meteorological Weather Intelligence, 100 Crop Diseases Infographic Encyclopedia (with 25-heading pathology dossiers), 52-Term Bilingual (English & हिंदी) Agricultural Dictionary, 24-Product E-Commerce Store with integer-paise cart & simulated UPI/COD checkout, Agricultural News, Government Schemes Eligibility Finder, and a Context-Aware Floating AI Advisor.
2. **Seller Central Portal (`/seller`):**
   - Dedicated B2B/B2C vendor workspace for agricultural input cooperatives and dealers (`Karnal Kisan Agro Co-op`) featuring live inventory & catalog management, product creation, stock adjustments, farmer order fulfillment lifecycle (`Placed → Processing → Dispatched → Delivered`), printable GST tax invoices, and weekly mandi NEFT payout tracking.

---

## 2. Technology Stack & Build Pipeline

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | React 18.3 (`TypeScript ~5.6`) | Component architecture, hooks, strict static typing |
| **Routing Engine** | React Router DOM v6.28 | Client-side SPA routing, protected route guards, deep-linking |
| **Styling & Design System** | Tailwind CSS v3.4 + PostCSS | Custom `forest`, `leaf`, `soil`, and `warmbg` agricultural palette |
| **Data Visualization** | Recharts v2.13 | Soil moisture trends, crop health analytics, weather & rainfall charts |
| **Iconography & Vector Art** | Lucide React + Custom SVG Illustrations | High-contrast icons, custom `<AgriPulseLogo />`, `<ProductIllustration />` |
| **State & Persistence** | React Context (`AgriPulseContext`) + a versioned `localStorage` schema | Fast demo CRUD persistence across versioned storage keys (`AgriPulse:v1:*`) |
| **Production API (recommended)** | Node.js + Express or an equivalent typed API service | Authenticated device registration, farm ownership checks, weather proxy, telemetry ingestion, and audit events |
| **Production Database (recommended)** | PostgreSQL (or managed equivalent) | Durable accounts, farms, devices, pairings, observations, weather snapshots, orders, and inventory |
| **IoT Telemetry (recommended)** | MQTT over TLS or HTTPS ingestion | Device-to-cloud telemetry, heartbeat events, online/offline detection, and secure device identity |
| **Build & Bundler** | Vite v5.4 | Fast HMR dev server (`0.0.0.0:3000`) & code-split production bundles (`react`, `charts`, `icons`) |
| **Static Hosting Ready** | `vercel.json` + `public/_redirects` | Zero-404 SPA route rewrites for Vercel, Netlify, and Cloudflare Pages |

**Important deployment distinction:** `localStorage` is suitable for a UI prototype, demo mode, and limited offline drafts. It is not the source of truth for real device credentials or telemetry. In production, the authenticated backend and database must own device records, pairing state, telemetry, user permissions, and audit history. The browser must never receive device secrets.

---

## 3. Complete Route Map & Navigation Hierarchy

```text
/ (RootRedirect)
├── Unauthenticated → Redirects to /login
└── Authenticated
    ├── portalType === 'seller' → Redirects to /seller
    └── portalType === 'farmer' → Redirects to /home

PUBLIC AUTHENTICATION ROUTES
├── /login ( & /seller/login )     → Seller Central Sign In + 1-Click Demo Launchers (Farmer & Seller)
├── /signup ( & /seller/signup )   → Multi-Step Seller / Dealer Onboarding & GSTIN Registration
├── /farmer/login                  → Dedicated Farmer Portal Sign In + 1-Click Farmer Demo
└── /farmer/signup                 → Farmer Profile & Landholding Registration

PROTECTED SELLER CENTRAL PORTAL (ProtectedRouteGuard)
└── /seller ( & /seller/dashboard ) → SellerPortalPage
    ├── Tab 1: Business Overview & Revenue KPIs
    ├── Tab 2: Live Product Catalog & Stock Manager (+ Add New Product Modal)
    ├── Tab 3: Farmer Order Fulfillment & Printable GST Invoice Modal
    ├── Tab 4: Weekly Mandi Settlements & NEFT Payouts
    └── Tab 5: Co-op / Dealer Profile, GSTIN & Bank Settings

PROTECTED FARMER PORTAL (ProtectedRouteGuard → AppShell + FloatingAIChat)
├── /home                          → HomeDashboardPage (KPIs, Digital Twin Status, Calendar, Charts)
├── /farm                          → FarmManagementPage (Farms, Plots, Crops, Observations, Unit Converter, CSV Export)
├── /weather                       → WeatherIntelligencePage (Current Conditions, Hourly/7-Day Forecast, API Precipitation Estimates, Advisories)
├── /devices                       → DeviceManagementPage (Sensor Node / LoRa Gateway Registration, Pairing, Status, Telemetry)
├── /devices/:deviceId             → DeviceDetailsPage (Configuration, Latest Heartbeat, Sensor Readings, Events)
├── /dictionary                    → DictionaryPage (52 Bilingual English/Hindi Terms, A-Z & Category Filters)
├── /disease                       → DiseaseAnalysisPage (100 Crop Diseases Directory Grid)
├── /disease/:diseaseId            → DiseaseAnalysisPage (Full-Page Interactive Disease Infographic Monograph)
├── /store                         → StorePage (24 Agricultural Inputs across 10 Categories)
├── /store/product/:productId      → ProductDetailPage (Specs, Reviews, FAQs, Warranty, Related Items)
├── /cart                          → CartAndCheckoutPage (Integer-Paise Cart, Promo Codes, Delivery Form)
├── /checkout                      → CartAndCheckoutPage (Simulated COD & UPI Payment Workflows)
├── /orders ( & /orders/:orderId ) → OrdersPage (Order History, Live Status, Cancellation)
├── /wishlist                      → WishlistPage (Saved Store Products & 1-Click Move to Cart)
├── /offers                        → OffersPage (Seasonal Coupons: KISAN10, RABISEASON, etc.)
├── /news                          → NewsPage (9 Categories of Agricultural News & Advisories)
├── /schemes                       → SchemesPage (10 National/State Govt Schemes + Eligibility Finder)
└── /account                       → AccountSettingsPage (Farmer Profile, Bigha Factor, Notifications, Data Reset)
```

---

## 4. Module-by-Module Functional Blueprint

### 4.1 Authentication & Portal Switching (`LoginPage`, `FarmerLoginPage`, `SellerSignUpPage`, `FarmerSignUpPage`)
- **Development-only demo access:** Offer clearly labelled one-click demo launchers in non-production environments. Do not hard-code reusable passwords in source control or expose demo credentials on production pages.
- **1-Click Instant Launch:** Farmer and seller demo workspaces may be launched from `/login` or `/farmer/login` when demo mode is explicitly enabled.
- **Seamless Portal Switching:** Users can switch between the **Farmer Portal** and **Seller Central** at any time via the header switcher (`switchPortal('farmer' | 'seller')`), testing end-to-end flows (e.g., placing an order as a farmer and fulfilling it as a seller).
- **Session Persistence:** Stored in `AgriPulse:v1:session`; signing out clears only the session token while preserving all created farms, crops, observations, products, and orders.

---

### 4.2 Farmer AppShell & Global Navigation (`src/components/AppShell.tsx`)
- **Top Header Bar:**
  - Global instant search bar across pages, store products, and dictionary terms.
  - Live Weather badge (`tempC`, condition, location) linking to `/weather`.
  - Real-time Notification Bell computed dynamically from high-priority pending farm tasks, active weather warnings, disease inspection alerts, and recent orders.
  - Shopping Cart badge with live item count.
  - Portal Switcher button (`Switch to Seller Central`) and Farmer Profile dropdown.
  - **Devices & IoT** navigation item linking to `/devices`, with a small pending-pairing/offline badge when applicable.
- **Responsive Navigation:**
  - Desktop left sidebar + sticky mobile top bar + slide-out mobile drawer + bottom quick-navigation bar.

---

### 4.3 Personalized Farmer Dashboard (`src/pages/HomeDashboardPage.tsx`)
- **Active Farm Switcher & Time-Aware Greeting:** Dynamically scopes all dashboard metrics to the currently selected farm.
- **6 Real-Time Calculated KPI Cards:**
  1. Total Cultivated Land (automatically converted to the farmer's preferred unit: *Acre*, *Hectare*, or regional *Bigha*).
  2. Active Crops & Growth Stages count.
  3. Last Recorded Soil Moisture % (transparently labeled as *Farmer Recorded* vs. *Hardware Sensor Not Connected*).
  4. Pending Field Activities count (highlighting high-priority tasks).
  5. Local Weather Snapshot & Forecast Precipitation / Rain Probability (clearly labelled as weather-provider data).
  6. Store Cart & Active Demo Orders summary.
- **Interactive Farm Activity Calendar:** Create, filter, complete/toggle, and delete scheduled fieldwork (`Irrigation`, `Sowing`, `Fertilizer Application`, `Pest / Disease Inspection`, `Harvest Planning`).
- **Visual Analytics (Recharts):** Soil moisture & temperature trends across plots and crop health distribution charts.

---

### 4.4 Farm & Plot Digital Twin (`src/pages/FarmManagementPage.tsx`)
- **Multi-Farm Registry:** Add, edit, archive, or delete multiple farms with GPS coordinates, soil type, water source, and ownership type (`Owned`, `Leased`, `Shared / Co-operative`, `Family Holding`).
- **Named Plot Subdivision:** Divide farms into individual plots (`Plot A — North Canal Block`, etc.) with soil type and irrigation method.
- **Crop Growth Stage Tracker:** Track crops across 9 agronomic growth stages (`Land Preparation` → `Ready for Harvest`) with sowing/harvest dates, variety, and health status (`Healthy`, `Watch / Mild Stress`, `Needs Inspection`).
- **Timestamped Field Observations Log:** Record soil moisture %, soil temp °C, visible plant symptoms, pest sightings, standing water status, and irrigation status with instant **CSV export** and search/filtering.
- **Regional Land Unit Converter:** Converts seamlessly between *Hectares*, *Acres*, and regional *Bigha* standards (Punjab/Haryana Kachha & Pucca Bigha, UP, Rajasthan, Bihar, West Bengal, Assam, Madhya Pradesh, Gujarat).

---

### 4.5 Agro-Meteorological Weather Intelligence (`src/pages/WeatherIntelligencePage.tsx`)
- **Location Selector & Geolocation:** Choose State, District, and Locality/Block or use browser GPS geolocation with graceful fallback and clear location permissions.
- **Current Weather & Soil Temperature Estimate:** Display available temperature, feels-like temperature, humidity, wind, cloud cover, and provider-derived estimates. Do not label modelled topsoil temperature as a physical sensor reading.
- **24-Hour Hourly & 7-Day Daily Forecast:** Visualize temperature and precipitation probability/forecast data with Recharts.
- **Weather-API Precipitation:** Display precipitation in millimetres only when returned by the selected API. Label it `Forecast precipitation (mm)` for forecasts and `Historical weather estimate (mm)` for modelled/reanalysis history; show provider, period, last update, and stale/unavailable states.
- **No physical rainfall measurement:** AGRIPULSE has no rain gauge or rainfall-mm sensor in this version. Remove the manual rain-gauge entry form and do not store forecast precipitation as measured field data.
- **Trigger-Explained Agronomic Advisories:** Cautious, rule-based farming suggestions explain the trigger and data source (for example, a high forecast rain probability may suggest reviewing spray timing). Advisories are decision support, not guarantees.

---

### 4.6 100 Crop Diseases Infographic Encyclopedia (`src/pages/DiseaseAnalysisPage.tsx`)
- **100 Diseases Directory (`/disease`):**
  - Covers **100 major economic crop diseases** across 7 crop groups (*Rice*, *Wheat & Barley*, *Maize & Millets*, *Pulses*, *Oilseeds & Commercial*, *Vegetables*, *Fruits*) and 6 pathogen classes (*Fungi*, *Bacteria*, *Viruses*, *Oomycetes*, *Phytoplasmas*, *Protists*).
  - Instant search by crop, disease name, scientific name, or symptom, plus category & pathogen filter pills.
- **Interactive Disease Infographic Monograph (`/disease/:diseaseId`):**
  - Clicking any disease opens a full-page **two-column clinical/agronomic infographic**:
    - **Left Main Column:**
      - **Ask AGRIPULSE AI Banner:** Mint-green card with `Open AI Assistant` button and 5 clickable rounded-full question pills tailored to that exact disease.
      - **1. Overview & What is `{Disease}`?:** Prose overview + highlighted green `PATHOLOGICAL CLASS & CATEGORY` callout box.
      - **2. Quick Pathological Facts:** 6-card infographic grid (`CAUSAL ORGANISM`, `SURVEILLANCE STATUS`, `PRIMARY HOST CROP`, `PRIMARY SPREAD ROUTE`, `ACTIVE SEASON`, `GEOGRAPHICAL BELT`).
      - **3. Verified Field Symptoms & Diagnostic Indications:** 2-column grid of checkmark cards (`CheckCircle2`).
      - **4. Spray Dosage & Treatment Regimen:** Chemical foliar regimen, biological seed/soil regimen, and Economic Threshold Trigger (ETL).
      - **5. Field Management & Administration Guide:** 2-column checkmark grid of cultural and IDM practices.
      - **6. Economic Crop Losses & Physiological Effects**
      - **7. Warnings, Cautions & Nutrient Interactions**
      - **8. Mechanism of Action & Disease Cycle** (with high-yield exam facts for ICAR JRF / ARS / IBPS AFO)
      - **9. Storage, Handling & When to Seek Care** (with documented regional case studies)
      - **10. Clinical & Agronomic FAQs**
      - **11. Resistant Varieties & Bio-Control Alternatives**
      - **12. Compendia Sources & Complete 25-Heading Dossier:** Includes 1-click **Copy Markdown** and an expandable 1–25 numbered table with **Exam Highlight Mode**.
    - **Right Sticky Sidebar:**
      - **`ON THIS PAGE` Navigator:** 12 icon-prefixed smooth-scroll jump links.
      - **`Need a plain explanation?` Card:** Launches the AI Assistant for plain-language dosage & safety breakdowns.

---

### 4.7 Bilingual Agricultural Dictionary (`src/pages/DictionaryPage.tsx`)
- **52 Curated Agronomic Terms:** Spanning 13 categories (*Soil Science*, *Irrigation*, *Seeds & Germination*, *Crop Growth Stages*, *Fertilizers*, *Plant Nutrients*, *Pest Management*, *Plant Diseases*, *Weather & Rainfall*, *Farm Machinery*, *Sustainable Farming*, *Soil Moisture & pH*, *Digital Farming & Sensors*).
- **English & हिंदी Support:** Every entry includes English and Hindi terms, pronunciation guide, simple definition, farmer-friendly explanation, practical field example, why it matters, related terms (clickable cross-links), and relevant crops.
- **Bookmarks & Recently Viewed:** Persisted in `localStorage`.

---

### 4.8 Agricultural E-Commerce Store, Cart, Checkout & Orders (`StorePage`, `ProductDetailPage`, `CartAndCheckoutPage`, `OrdersPage`, `WishlistPage`, `OffersPage`)
- **24+ Enriched Store Products across 10 Categories:**
  - *Seeds and planting material*, *Fertilizers and soil nutrients*, *Crop protection products*, *Organic farming inputs*, *Soil testing and farm-monitoring kits*, *Irrigation equipment*, *Sprayers and farm tools*, *Hand tools and accessories*, *Farm safety equipment*, *Harvesting and storage supplies*.
- **Custom Vector Product Illustrations (`src/components/ProductIllustration.tsx`):** Every product category renders a crisp, zero-broken-link custom SVG illustration.
- **Product Detail Page (`/store/product/:productId`):** Full technical specifications, usage & storage instructions, safety notes, warranty details, customer reviews (with ability to submit new verified reviews), FAQs, and compatible crops.
- **Integer-Paise Financial Precision:** All prices, MRPs, subtotals, shipping fees (free ≥ ₹999, else ₹65), and promo discounts are calculated in integer **paise** (`100 paise = ₹1`) to prevent floating-point rounding errors.
- **Valid Promo Codes (`/offers` & `/cart`):**
  - `KISAN10` (10% off up to ₹250 on orders ≥ ₹500)
  - `RABISEASON` (15% off up to ₹400 on orders ≥ ₹1,200)
  - `SOILCARE` (12% off up to ₹300 on orders ≥ ₹800)
- **Validated Checkout & Order Lifecycle:** Validates 6-digit Indian PIN code and 10-digit mobile number, supports simulated **Cash on Delivery (Demo)** and **UPI (Demo Workflow)**, and creates persistent orders that appear in both the Farmer's `/orders` page and the Seller's `/seller` fulfillment queue.

---

### 4.9 Agricultural News & Government Schemes (`NewsPage`, `SchemesPage`)
- **Agricultural News (`/news`):** 9 categories of educational advisories, market updates, and research stories with category filtering, full-article reader, and saved bookmarks.
- **Government Schemes Directory (`/schemes`):** 10 major national and state schemes (`PM-KISAN`, `PMFBY`, `KCC`, `PMKSY`, `Soil Health Card`, `SMAM`, `PKVY`, `e-NAM`, `PM-KUSUM`, `FPO 10,000 Scheme`) with direct official `.gov.in` / `.nic.in` links and an **Interactive Eligibility Questionnaire** (filtering by State, Landholding Size, Farmer Category, and Need).

---

### 4.10 Context-Aware Floating AI Assistant (`FloatingAIChat.tsx` & `aiAssistantService.ts`)
- **Deep Context Integration:** Reads the farmer's live `activeFarm`, `crops`, `observations`, `activities`, `weather`, `devices`, `dictionary`, `products`, `schemes`, and all **100 Crop Disease Monographs** (`SEED_100_CROP_DISEASES` + `getDiseaseDocumentary`).
- **One-Click Prompt Triggers:** Any page (such as the Disease Infographic page) can invoke `openChatWithPrompt(query)` to open the assistant and immediately synthesize a response with source citations and internal navigation links.

---

### 4.11 Devices & IoT Management — NEW (`/devices`)

**Purpose:** Allow a signed-in farmer to register, organize, pair, and monitor AGRIPULSE sensor nodes and LoRa gateways from the Farmer Portal. This module is a management interface; saving a form registers device metadata but does not, by itself, configure physical firmware or prove that hardware is connected.

#### Navigation and page layout

- Add **Devices & IoT** to the Farmer Portal sidebar and mobile navigation, with a radio-tower/microchip icon.
- Route `/devices` opens the device overview and registration workflow.
- Route `/devices/:deviceId` opens a detailed device page with identity, configuration, heartbeat, telemetry, events, and troubleshooting.
- The landing view contains summary cards: **Total devices**, **Gateways**, **Online**, **Pending pairing**, **Offline / attention needed**.
- Add a primary **Register device** button. A segmented selector or first wizard step asks which kind of equipment is being registered: **Sensor Node** or **LoRa Gateway**.
- Device lists are scoped to the currently selected farm by default, with filters for farm, plot/zone, type, gateway, status, and last-seen time.
- Provide empty, loading, error, no-permission, stale-data, and offline states; do not silently show demo readings as live readings.

#### Registration wizard: shared fields

Required fields should be short and farmer-friendly:

| Field | Requirement / behavior |
|---|---|
| Device type | Required: `Sensor Node` or `LoRa Gateway`; controls which fields appear next. |
| Device name | Required; user-friendly label, e.g. `North Field Node 01` or `Main Farm Gateway`. |
| Farm | Required; select from the farmer's registered farms. Offer a link to add a farm if none exists. |
| Plot / zone | Optional for a gateway; recommended for a sensor node. Options come from plots belonging to the selected farm. |
| Installation location | Required text label, e.g. `North boundary near the borewell`. |
| State / district / village or locality | Optional structured location fields to help identify the installation. |
| GPS coordinates | Optional; user may enter coordinates or consent to browser geolocation. Never request location silently. |
| Installation date | Optional date picker; can default to today but must be editable. |
| Serial number / device identifier | Optional before hardware is on hand; required at physical pairing/provisioning when the device has a unique ID. Enforce uniqueness within the platform. |
| Notes | Optional installation notes, mounting details, or access instructions. Do not store network passwords here. |

The form should use explicit field labels, inline validation, keyboard accessibility, responsive layout, and a review screen before saving. Preserve non-secret draft values if the form is interrupted.

#### Sensor Node-specific fields

Show these after the farmer chooses **Sensor Node**:

- **Node ID / serial / device EUI:** optional for pre-registration; required before pairing to real hardware.
- **Assigned LoRa Gateway:** select a registered gateway on the same farm. If no gateway exists, offer `Register a gateway first` or allow the node record to remain unassigned with status `Pending gateway assignment`.
- **Installed sensors:** multi-select only from supported hardware, such as soil moisture, soil temperature, air temperature/humidity, light, pH, NPK via the appropriate interface, battery voltage, and optional standing-water detection. This version excludes a physical rain gauge and rainfall-mm sensor.
- **Power source:** solar + battery, battery, or other supported option.
- **Sampling interval:** display a configurable value only if the device firmware supports remote configuration. Otherwise label it as a planned setting and configure it during commissioning.
- **Communication profile:** show the provisioned LoRa plan/profile as read-only after pairing where possible. Do not let ordinary users arbitrarily select unsupported radio frequencies.
- **Sensor calibration status:** `Not calibrated`, `Calibration recorded`, or `Needs review`, with optional calibration date and notes.

#### LoRa Gateway-specific fields

Show these after the farmer chooses **LoRa Gateway**:

- **Gateway ID / serial:** optional for pre-registration; required for pairing.
- **Backhaul connection:** Wi-Fi, Ethernet, 4G/LTE, or other supported method.
- **Power source:** solar + battery, mains, or other supported source.
- **Gateway location:** must be clear enough to find the physical gateway; coordinates are optional but recommended for outdoor deployments.
- **Radio region / configuration profile:** selected from firmware-supported, locally compliant profiles and normally read from the commissioned gateway. Frequency configuration is not a casual free-text field.
- **Coverage / installation notes:** optional antenna position, mounting height, and coverage notes.
- **Linked sensor nodes:** shown after registration, with counts and a list of nodes assigned to that gateway.

Never ask farmers to paste Wi-Fi passwords, SIM PINs, private keys, or device secrets into a general website form. Network credentials and device secrets must be provisioned through a separate secure commissioning flow or local gateway setup, not stored in browser state.

#### Registration workflow and statuses

1. Farmer opens **Devices & IoT** and chooses **Register device**.
2. Selects Sensor Node or LoRa Gateway.
3. Completes the common fields and type-specific fields.
4. Reviews the farm, location, device identity, gateway relationship, and sensors.
5. Submits. The backend validates ownership and uniqueness, creates the record, and returns a generated AGRIPULSE device record ID.
6. UI shows the next steps to pair or commission the physical device; if the hardware is not yet connected, the state remains pending.
7. Once the real device completes authenticated provisioning and sends a heartbeat/telemetry message, the backend updates its status.

Use these states, with clear descriptions:

- **Draft:** form not yet registered.
- **Pending pairing:** registered in AGRIPULSE, but physical hardware has not completed pairing.
- **Pending gateway assignment:** node has no gateway relationship yet.
- **Online:** recent authenticated heartbeat received inside the configured timeout window.
- **Offline:** previously paired device has not checked in within the configured timeout window.
- **Attention required:** repeated errors, low battery threshold, sensor fault, or failed provisioning has been reported.
- **Retired:** device intentionally removed from use; preserve history for audit purposes.

Status must be derived from backend events/heartbeats, not selected manually by the farmer. Demo mode may simulate status only if a persistent **Demo data** label is visible.

#### Device list, details, and actions

Each device card/row should show name, type, farm, plot/zone, status, identifier (masked where appropriate), gateway association, last-seen timestamp, and latest available sensor summary. Actions:

- View details and telemetry history.
- Edit descriptive metadata and installation location.
- Assign or reassign a node to an eligible gateway on the same farm.
- Start or resume pairing / view commissioning instructions.
- Run a server-side connection check or request a supported diagnostic command.
- Review sensor faults, battery warnings, and device events.
- Archive/retire a device with a confirmation step. Hard deletion should be restricted where readings or audit records must be retained.

The interface should display `No telemetry received yet` instead of zero-valued measurements for a newly registered or unconnected device. Use `Last seen` timestamps in the farm's local timezone and clearly identify stale readings.

#### Device data model (TypeScript-oriented)

```ts
type DeviceType = 'sensor_node' | 'lora_gateway';
type DeviceStatus =
  | 'draft'
  | 'pending_pairing'
  | 'pending_gateway_assignment'
  | 'online'
  | 'offline'
  | 'attention_required'
  | 'retired';

type TelemetrySource = 'physical_sensor' | 'weather_api' | 'manual_observation' | 'demo';

interface IoTDevice {
  id: string;                 // AGRIPULSE-generated record ID
  ownerUserId: string;
  farmId: string;
  plotId?: string;
  type: DeviceType;
  name: string;
  serialNumber?: string;
  locationLabel: string;
  latitude?: number;
  longitude?: number;
  installedAt?: string;
  status: DeviceStatus;       // server-derived for real hardware
  gatewayId?: string;        // used by sensor nodes
  installedSensors?: string[];
  backhaulType?: 'wifi' | 'ethernet' | 'cellular' | 'other';
  powerSource?: 'solar_battery' | 'battery' | 'mains' | 'other';
  lastSeenAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface TelemetryReading {
  id: string;
  deviceId: string;
  farmId: string;
  sensorType: string;
  value: number;
  unit: string;
  measuredAt: string;
  receivedAt: string;
  source: 'physical_sensor' | 'demo';
  quality?: 'valid' | 'suspect' | 'invalid';
}

interface WeatherPrecipitationRecord {
  farmId: string;
  provider: string;
  kind: 'forecast' | 'historical_estimate';
  amountMm?: number;
  probabilityPercent?: number;
  periodStart: string;
  periodEnd: string;
  fetchedAt: string;
}
```

Do not use `TelemetryReading` for forecast precipitation. Weather API records must remain separate and carry a `provider` and `kind` so the UI and AI cannot accidentally portray them as locally measured rainfall.

#### Suggested API contracts for production

- `GET /api/devices?farmId=...` — list devices visible to the signed-in farmer.
- `POST /api/devices` — register a node or gateway after server-side validation.
- `GET /api/devices/:deviceId` — details, permissions, latest status, and config summary.
- `PATCH /api/devices/:deviceId` — update editable metadata only.
- `POST /api/devices/:deviceId/pairing-sessions` — issue a time-limited pairing session or commissioning instructions.
- `POST /api/devices/:deviceId/retire` — retire a device and retain history.
- `GET /api/devices/:deviceId/telemetry?from=...&to=...` — retrieve authorized telemetry history.
- `GET /api/devices/:deviceId/events` — show pairing, heartbeat, fault, and maintenance events.
- MQTT over TLS or authenticated HTTPS ingestion is used for physical device telemetry, based on the final hardware/network design. Do not allow browsers to publish trusted telemetry directly.

#### Security and reliability requirements

- Require authentication and verify every device belongs to a farm the current user can access.
- Keep API keys, weather-provider secrets, provisioning tokens, and device private keys on the server or device—not in source code or `localStorage`.
- Pairing tokens should be short-lived, single-use where practical, and auditable.
- Enforce unique serial numbers/device IDs and validate all values server-side.
- Use HTTPS and secure device-to-cloud transport; plan certificate/key rotation for production.
- Keep an audit event for register, edit, assign, pair, failed pairing, retire, and permission-denied operations.
- Provide rate limiting and payload validation for telemetry endpoints.
- Separate demo telemetry from physical sensor telemetry throughout the UI, exports, AI prompts, and database.

#### Acceptance criteria

- A farmer can register a Sensor Node and a LoRa Gateway with name and installation location.
- Required fields and invalid coordinates/duplicate IDs produce understandable inline errors.
- Sensor node can be assigned only to a compatible gateway that belongs to the selected farm (or remain explicitly unassigned).
- Newly registered hardware is not falsely marked Online.
- Online/offline status changes only from trusted backend heartbeat rules.
- No physical rain gauge or rainfall-mm sensor appears among supported sensor types in this version.
- The weather page can show API precipitation while marking it clearly as forecast/historical estimate, not a physical measurement.
- Data is scoped to the authenticated farmer, persists after reload, and the registration workflow works on mobile and desktop.

---

## 5. Data & Storage Blueprint (`src/services/storageService.ts`)

All client-side state is persisted under versioned `localStorage` keys with automatic schema validation and corruption recovery:

| Storage Key | Type | Description |
| :--- | :--- | :--- |
| `AgriPulse:v1:session` | `AuthSession \| null` | Active farmer or seller authentication session |
| `AgriPulse:v1:profile` | `FarmerProfile` | Farmer personal details, language, preferred area unit, Bigha factor, notifications |
| `AgriPulse:v1:sellerProfile` | `SellerProfile` | Seller business details, GSTIN, license, bank/IFSC, revenue metrics |
| `AgriPulse:v1:farms` | `Farm[]` | Registered farms with coordinates, soil type, water source, area |
| `AgriPulse:v1:plots` | `FarmPlot[]` | Subdivided named plots linked to `farmId` |
| `AgriPulse:v1:crops` | `CropRecord[]` | Active crop plantings, growth stages, varieties, health status |
| `AgriPulse:v1:observations` | `FieldObservation[]` | Timestamped moisture, temperature, pest, and symptom logs |
| `AgriPulse:v1:activities` | `FarmActivity[]` | Scheduled and completed farm calendar tasks |
| `AgriPulse:v1:weather` | `WeatherSnapshot` | Current, hourly, and 7-day forecast; provider-sourced precipitation estimates and provenance |
| `AgriPulse:v1:devices` | `IoTDevice[]` | Demo/local device registrations; production records live in the backend database |
| `AgriPulse:v1:telemetryCache` | `TelemetrySummary[]` | Optional read-only cached readings for UI resilience; not authoritative telemetry storage |
| `AgriPulse:v1:deviceEvents` | `DeviceEvent[]` | Demo/local registration and pairing events; production events are audit-logged server-side |
| `AgriPulse:v1:diseaseReports` | `DiseaseReport[]` | Saved symptom diagnostic reports |
| `AgriPulse:v1:dictionaryBookmarks` | `string[]` | Bookmarked dictionary term IDs |
| `AgriPulse:v1:dictionaryRecent` | `string[]` | Recently viewed dictionary term IDs |
| `AgriPulse:v1:products` | `StoreProduct[]` | Full catalog of 24+ store products (including seller-added items & reviews) |
| `AgriPulse:v1:cart` | `CartItem[]` | Active shopping cart items and quantities |
| `AgriPulse:v1:wishlist` | `string[]` | Saved product IDs in wishlist |
| `AgriPulse:v1:recentProducts` | `string[]` | Recently viewed product IDs |
| `AgriPulse:v1:checkoutDraft` | `CheckoutAddressDraft` | Saved delivery address & promo code draft |
| `AgriPulse:v1:orders` | `DemoOrder[]` | Placed orders shared between Farmer Orders & Seller Fulfillment |
| `AgriPulse:v1:newsBookmarks` | `string[]` | Bookmarked news article IDs |
| `AgriPulse:v1:chatHistory` | `ChatMessage[]` | Persistent conversation history with AGRIPULSE AI |

---

## 6. Project Directory Blueprint

```text
AgriPulse/
├── index.html                         # Root HTML with title, meta, and favicon
├── package.json                       # Scripts (dev, build, preview, typecheck) & dependencies
├── tailwind.config.js                 # Custom agricultural color tokens (forest, leaf, soil, warmbg)
├── tsconfig.json                      # Strict TypeScript compiler configuration
├── vite.config.ts                     # Vite server/preview config (0.0.0.0:3000, allowedHosts, chunking)
├── vercel.json                        # Vercel SPA route rewrite rules
├── public/
│   ├── _redirects                     # Netlify / Cloudflare Pages SPA rewrite rules
│   ├── agripulse-logo.svg             # Vector brand icon
│   └── ai-advisor-avatar.png          # Floating AI Advisor avatar
└── src/
    ├── main.tsx                       # React DOM entry point
    ├── App.tsx                        # Router, ProtectedRouteGuard, RootRedirect, Route definitions
    ├── index.css                      # Tailwind directives & custom scrollbars
    ├── components/
    │   ├── AgriPulseLogo.tsx          # Brand logo wrapper
    │   ├── AppShell.tsx               # Farmer Portal layout shell, sidebar, header, search, notifications
    │   ├── DeviceStatusBadge.tsx       # Pending/online/offline/attention status labels
    │   ├── DeviceRegistrationWizard.tsx# Sensor Node / LoRa Gateway registration steps
    │   ├── FloatingAIChat.tsx         # Context-aware floating AI chat drawer
    │   └── ProductIllustration.tsx    # Custom SVG illustrations for all 10 store product categories
    ├── context/
    │   └── AgriPulseContext.tsx       # Central React Context provider for Auth, Farms, Store, Seller, AI
    ├── data/
    │   ├── seedFarmData.ts            # Initial farms, plots, crops, observations, activities, weather
    │   ├── seed100CropDiseases.ts     # 100 crop diseases dataset across 7 crop groups
    │   ├── diseaseDocumentaryService.ts # 25-heading pathology generator & curated disease dossiers
    │   ├── seedDictionary.ts          # 52 bilingual (English & Hindi) agricultural dictionary entries
    │   ├── seedProducts.ts            # 24 agricultural store products, reviews, FAQs, promo codes
    │   └── seedNewsAndSchemes.ts      # Agricultural news articles & 10 national/state govt schemes
    ├── pages/
    │   ├── LoginPage.tsx              # Seller Central sign-in & 1-click dual portal launchers
    │   ├── FarmerLoginPage.tsx        # Farmer Portal sign-in
    │   ├── SellerSignUpPage.tsx       # Seller onboarding registration
    │   ├── FarmerSignUpPage.tsx       # Farmer onboarding registration
    │   ├── SellerPortalPage.tsx       # Seller Central dashboard, catalog manager, order fulfillment, invoices
    │   ├── HomeDashboardPage.tsx      # Farmer dashboard KPIs, calendar, charts, alerts
    │   ├── FarmManagementPage.tsx     # Multi-farm & plot digital twin, crops, observations, unit converter
    │   ├── WeatherIntelligencePage.tsx# Forecast, API precipitation estimates, advisories, geolocation
    │   ├── DeviceManagementPage.tsx    # Device list, registration, gateway assignment, pairing
    │   ├── DeviceDetailsPage.tsx       # Configuration, heartbeat, telemetry, and device events
    │   ├── DiseaseAnalysisPage.tsx    # 100 Diseases directory + GlobalHealth-style Infographic Monograph
    │   ├── DictionaryPage.tsx         # Bilingual A-Z agricultural dictionary
    │   ├── StorePage.tsx              # E-commerce catalog with filters, sorting, search
    │   ├── ProductDetailPage.tsx      # Detailed product specs, reviews, warranty, related products
    │   ├── CartAndCheckoutPage.tsx    # Integer-paise cart, promo codes, COD/UPI simulated checkout
    │   ├── OrdersPage.tsx             # Farmer order tracking & cancellation
    │   ├── WishlistPage.tsx           # Saved products wishlist
    │   ├── OffersPage.tsx             # Active coupon codes & seasonal promotions
    │   ├── NewsPage.tsx               # Agricultural news & advisories reader
    │   ├── SchemesPage.tsx            # Govt schemes directory & interactive eligibility finder
    │   └── AccountSettingsPage.tsx    # Profile, regional Bigha settings, notifications, demo data reset
    ├── services/
    │   ├── aiAssistantService.ts      # Context-aware & 100-disease monograph AI response engine
    │   ├── diseaseService.ts          # Symptom analysis helper service
    │   ├── storageService.ts          # Safe localStorage read/write and demo seed reset
    │   ├── deviceService.ts            # Registration validation, pairing and device API calls
    │   ├── telemetryService.ts         # Latest readings, heartbeat, telemetry history
    │   ├── weatherService.ts          # Weather API integration, provenance labels, caching and fallbacks
    ├── types/
    │   └── index.ts                   # Complete TypeScript interfaces for all domain entities
    └── utils/
        └── formatters.ts              # INR paise formatter, date formatters, regional Bigha conversion table
```

> **Recommended production extension (not in the original front-end-only tree):** add `server/src/routes/devices.ts`, `server/src/routes/telemetry.ts`, `server/src/routes/weather.ts`, `server/src/services/pairingService.ts`, `server/src/services/telemetryIngestionService.ts`, database migrations for devices/gateways/readings/events, and environment-based secrets. This server layer is needed for real hardware and must not be replaced by browser-only localStorage.

---

## 7. Production Data Architecture and Source-of-Truth Rules

### Demo / prototype mode

- Keep versioned `localStorage` for UI demos, non-sensitive drafts, preferences, and cached summaries only.
- Device registrations created in demo mode must be visibly marked as demo records and must never impersonate actual hardware.
- Do not save passwords, API secrets, provisioning tokens, Wi-Fi credentials, or LoRa gateway secrets in localStorage.
- Keep a migration path if the local schema changes; do not silently reinterpret older rain-gauge records as API weather readings.

### Production mode (recommended)

Use an authenticated API and durable database. A minimal set of tables/collections is:

| Entity | Purpose | Key relationships |
|---|---|---|
| `users` / `sessions` | Farmer and seller identities, access roles, login sessions | One user owns multiple farms |
| `farms` / `plots` | Registered farm and zones | One farm has multiple plots and devices |
| `devices` | Common identity/name/location/status for nodes and gateways | Belongs to a farm; may refer to a gateway |
| `gateway_configs` | Gateway backhaul and radio profile metadata | One gateway has many sensor nodes |
| `sensor_node_configs` | Installed sensors, sample profile, calibration metadata | One sensor node has a gateway optionally |
| `telemetry_readings` | Timestamped physical sensor values | Device, farm, sensor type, measured timestamp |
| `device_events` | Pairing, heartbeat, fault, maintenance, audit events | Device and actor where available |
| `weather_snapshots` | API-sourced current/forecast/historical weather | Farm/location, provider, forecast period, fetched time |
| `crops`, `observations`, `activities` | Agronomic and farm records | Farm / plot |
| `products`, `cart`, `orders`, `payments` | Marketplace data | Farmer, seller, order lifecycle |

**Source-of-truth rule:** physical sensors create `physical_sensor` telemetry; online weather services create `weather_api` forecasts or historical estimates; farmers create `manual_observation` records; and seeded examples are `demo`. Do not merge these sources into an unlabeled series.

### Weather API behavior (rainfall sensor removed)

- No rainfall gauge is part of the hardware bill of materials or device-registration sensor list.
- The server calls the chosen weather provider, normalizes its responses, caches them within provider terms, and returns a stable AGRIPULSE schema to the website.
- UI labels include the provider/source, forecast or historical-estimate type, units, time window, and last update time.
- If weather data is missing or stale, show unavailable/stale status rather than `0 mm`.
- Keep API credentials server-side if the selected provider requires a secret. Budget any paid licence separately from hardware.

---

## 8. Updated Tentative Hardware Budget

The source presentation's itemized categories total ₹20,000. Removing the listed ₹50 rain-detection module yields this tentative total; the original presentation does not itemize a separate calibrated rainfall-mm gauge, so this calculation assumes only that ₹50 module is being removed.

| Category | Updated estimate |
|---|---:|
| Display, status and alerts | ₹500 |
| Irrigation demonstration | ₹800 |
| Wiring, mounting and assembly | ₹800 |
| Shipping, calibration and reserve | ₹700 |
| Enclosures and weather protection | ₹1,300 |
| Solar power and voltage regulation | ₹2,600 |
| Controllers and LoRa communication | ₹5,200 |
| Sensors and sensing accessories, less listed ₹50 rain-detection module | ₹8,050 |
| **Tentative hardware total** | **₹19,950** |

**Budget notes:**

- Treat all prices as indicative until quantities, supplier quotes, and final hardware architecture are fixed.
- Weather API access is a software/internet operating cost, not a replacement physical sensor. Provider charges, hosting, backend/database, domain, SIM/data plan, and any unlisted gateway hardware are not included unless explicitly added to a quote.
- Verify that the gateway, compatible LoRa radio modules/antennas, mounting, and backhaul equipment are fully accounted for before claiming the prototype can be built within this estimate.
- The budget spreadsheet/slide should keep category names paired with the correct subtotals and show the correct total.

---

## 9. UX, Accessibility, and Design System

- **Brand:** Use AGRIPULSE consistently in user-facing copy, website metadata, logo assets, hardware labels, and presentation slides. Retire AGRISENSE labels from public-facing screens unless the brand choice is intentionally changed.
- **Visual style:** forest green, leaf green, warm cream, neutral text, restrained status colours, legible typography, and farm photography used sparingly.
- **Responsive layout:** full sidebar on desktop; collapsible drawer on tablet/mobile; the Devices & IoT registration flow must fit small screens without horizontal scrolling.
- **Forms:** visible labels, required-field markers, helpful examples, inline error text, keyboard support, clear focus indicators, and confirmation before destructive actions.
- **Status language:** use text plus icon, not colour alone. Include `Pending pairing`, `Online`, `Offline`, `Attention required`, and `Retired` descriptions.
- **Data honesty:** label demo data, physical readings, API estimates, farmer records, and AI-generated recommendations separately.
- **Accessibility:** aim for WCAG 2.2 AA-level contrast and keyboard navigation; charts need concise summaries or tabular alternatives.
- **Hindi support:** allow a future bilingual interface without duplicating business logic; prioritize the farmer's most-used navigation and device form labels for localization.

---

## 10. Testing and Definition of Done

### Functional tests

- Authentication and route guards prevent farmer/seller portal crossover without permission.
- Farm and plot selection scopes devices and telemetry correctly.
- Device forms validate required values, supported device type, unique hardware ID, farm ownership, and gateway/farm matching.
- Device metadata survives reload; production records survive across devices/sessions through the backend.
- A registered device remains pending until actual authenticated pairing/heartbeat occurs.
- Telemetry timestamps, units, data source, invalid/suspect values, and last-seen times render correctly.
- Weather precipitation is never shown as locally measured rainfall; provider errors do not become zero measurements.
- Retired device history remains available according to retention rules.
- Demo device readings have a visible demo label and cannot be confused with real connected hardware.
- Store/checkout/demo workflows are labelled as simulated until integrated with production payment and order services.

### Hardware-in-the-loop tests

- Verify each selected sensor against a reference instrument or documented calibration procedure.
- Verify node-to-gateway radio delivery and data completeness at intended farm distances.
- Test power budget through overnight/low-sun conditions before selecting a final solar/battery size.
- Verify gateway uplink interruption, queued/retried data behavior, device restart, and recovery after connectivity returns.
- Verify device identity and secure pairing, including expired or reused pairing tokens.

### Release gates

1. UI prototype with clearly marked sample data.
2. One real sensor node and one real gateway tested end-to-end.
3. Authenticated backend and database for farms/devices/telemetry.
4. Weather API integration and source labels.
5. Security review, mobile usability check, backups, monitoring, and deployment configuration.
6. Only then expand to multi-node farms, crop-stress prediction, and automated irrigation.

---

## 11. Recommended Build Order

1. Confirm canonical branding as **AGRIPULSE**, device types, supported sensor list, and the first farm/crop use case.
2. Implement Farmer Portal navigation and `/devices` using mock records and the registration wizard.
3. Add farm/plot selection, validation, device list filters, edit/retire actions, and status explanations.
4. Add backend endpoints and durable device/config tables; keep secrets server-side.
5. Register one LoRa gateway and one sensor node, then validate secure pairing and telemetry ingestion.
6. Integrate weather API precipitation estimates and keep them separate from physical sensor data.
7. Add charts and device-aware AI context only after timestamps, units, and data provenance are reliable.
8. Expand to multiple nodes, additional crops, advanced predictions, and seller marketplace features according to priority.

**Scope reminder:** This is a complete blueprint/specification, not a claim that the website, backend, AI model, or physical devices have already been implemented. Mark planned features as planned until they pass the acceptance and hardware tests above.
