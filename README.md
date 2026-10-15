# AGRIPULSE — Intelligent Farm Digital Twin & Early Crop-Stress Detection System

**Tagline:** *Measure. Understand. Predict. Protect.*

AGRIPULSE is a complete, responsive, offline-capable agricultural web platform built for modern Indian farmers. It features a split-screen login experience with a persistent demonstration farmer account, a personalized agricultural dashboard, a multi-farm digital twin workspace, agro-meteorological weather intelligence with demo fallback, a 52-term bilingual (English & हिंदी) agricultural dictionary, transparent crop symptom analysis, a 24-product agricultural e-commerce store with integer-paise cart calculations and simulated checkout, educational agricultural news, a national/state government schemes directory with an interactive eligibility questionnaire, and a context-aware floating AGRIPULSE AI assistant.

---

## 1. Mandatory Demo Farmer Account

The application works out-of-the-box locally and after deployment **without requiring external API keys or database setup**:

- **Email:** `farmer.demo@AgriPulse.in`
- **Password:** `Farm@2026!`

You can also click **"Use Demo Account (Sign In Now)"** on the `/login` page to sign in immediately.
- Your authenticated session is persisted in `localStorage` (`AgriPulse:v1:session`) and remains active across page refreshes and browser restarts until you explicitly click **Sign Out**.
- Logging out clears only the authentication session while preserving your saved farms, crops, observations, cart items, preferences, and placed demo orders.

---

## 2. Official Brand Logo

- The `<AgriPulseLogo />` / `<AgriSenseLogo />` component renders the built-in vector brand emblem with consistent proportions and legibility across the Login screens, Sidebar, Mobile Drawer, and Dashboard.

---

## 3. Local Development & Build Instructions

```bash
# 1. Install dependencies
npm install

# 2. Start the local development server (bound to 0.0.0.0:5173)
npm run dev

# 3. Type-check and build for production
npm run build

# 4. Preview the production build locally
npm run preview
```

---

## 4. Deployment & SPA Route Rewrite Configuration

The built static output in `dist/` is ready for static hosting platforms:
- **Vercel:** Configured via `vercel.json` (`rewrites` all routes to `/index.html`).
- **Netlify / Cloudflare Pages:** Configured via `public/_redirects` (`/* /index.html 200`).

Direct navigation or page refresh on any nested route (`/home`, `/farm`, `/weather`, `/dictionary`, `/disease`, `/store`, `/cart`, `/orders`, `/news`, `/schemes`, `/account`) will resolve cleanly without 404 errors.

---

## 5. Optional Environment Variables (`.env.example`)

All external integrations are optional. Copy `.env.example` to `.env` only when connecting live services. **Never expose private service-role keys or secret LLM keys in client-side `VITE_*` variables.**

- `VITE_WEATHER_API_URL` / `VITE_WEATHER_API_KEY`: Optional live weather proxy endpoint.
- `VITE_AI_BACKEND_ENDPOINT`: Optional backend proxy for LLM chat and crop vision analysis.
- `VITE_NEWS_API_ENDPOINT`: Optional verified agricultural news feed endpoint.
- `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`: Optional Supabase project URL and public anon key (with Row-Level Security enabled).

---

## 6. Acceptance Test Checklist

- [x] **Authentication:** Unauthenticated requests redirect to `/login`; signing in with `farmer.demo@AgriPulse.in` / `Farm@2026!` redirects to `/home`; session persists across refresh; invalid credentials show clear error feedback; signing out redirects to `/login`.
- [x] **Home Dashboard (`/home`):** Time-aware greeting, active farm switcher, 6 real calculated summary cards, farm condition overview (explicitly marking hardware sensors as *Not Connected / Last Recorded*), weather preview, priority alerts, interactive farm activity calendar (create, edit, complete, delete), Recharts visualizations, and 7 quick actions.
- [x] **Farm Management (`/farm`):** Multi-farm & named plot registration, regional Bigha-to-Acre-to-Hectare land unit converter, crop stage tracker (supporting Indian crops + custom names), timestamped field observations, searchable historical log with CSV export, and farm location panel.
- [x] **Weather Intelligence (`/weather`):** State/District/Block location selector, optional browser geolocation with permission prompt, current weather, hourly & 7-day forecast, trigger-explained cautious farming suggestions, manual rainfall log, and simulated API failure + retry workflow.
- [x] **Agricultural Dictionary (`/dictionary`):** 52 farmer-friendly terms across all 13 categories, instant search, A–Z filter, category filter, bookmarks, recently viewed terms, related-term navigation, and English / हिंदी language selector.
- [x] **Crop Disease & Symptom Analysis (`/disease`):** Text and validated image symptom submission, transparent *Demo symptom guidance* labelling, candidate causes, distinguishing checks, immediate inspection steps, expert consultation guidance, and status tracking (*Possible issue*, *Needs inspection*, *Expert confirmed*).
- [x] **Agricultural Store (`/store`, `/cart`, `/orders`):** 24 realistic demo products across 10 categories, search, category/crop/price/availability filters, sorting, grid/list views, product detail view, wishlist, integer-paise shopping cart with demo promo codes (`KISAN10`, `RABISEASON`), validated Indian PIN & mobile checkout, simulated COD & UPI workflows, and persistent order management with cancellation for eligible orders.
- [x] **Agricultural News (`/news`) & Government Schemes (`/schemes`):** 9 news categories with bookmarks, detail view, and share action; 10 national & state government schemes with `.gov.in` / `.nic.in` links and an interactive *Potentially relevant schemes* questionnaire.
- [x] **Floating AGRIPULSE AI Chatbox & Account Settings (`/account`):** Context-aware assistant using actual saved farm records, plus full profile/unit/notification preferences and confirmed demo data reset.
