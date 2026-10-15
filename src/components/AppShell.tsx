import React, { useMemo, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Tractor,
  CloudSun,
  BookOpen,
  Stethoscope,
  ShoppingBag,
  Newspaper,
  Landmark,
  UserCog,
  LogOut,
  ShoppingCart,
  Package,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  AlertTriangle,
  Calendar,
  RadioTower,
} from 'lucide-react';
import { AgriPulseLogo } from './AgriPulseLogo';
import { FloatingAIChat } from './FloatingAIChat';
import { useAgriPulse } from '../context/AgriPulseContext';

import {
  Tag,
  Heart,
  Store,
} from 'lucide-react';

const NAV_GROUPS = [
  {
    label: 'Farm & intelligence',
    items: [
      { to: '/home', label: 'Home', icon: Home },
      { to: '/farm', label: 'Farm & plots', icon: Tractor },
      { to: '/devices', label: 'Devices & IoT', icon: RadioTower },
      { to: '/weather', label: 'Weather', icon: CloudSun },
      { to: '/dictionary', label: 'Dictionary', icon: BookOpen },
      { to: '/disease', label: 'Crop health library', icon: Stethoscope },
    ],
  },
  {
    label: 'Market & resources',
    items: [
      { to: '/store', label: 'Agri store', icon: ShoppingBag },
      { to: '/offers', label: 'Seasonal offers', icon: Tag },
      { to: '/orders', label: 'Orders', icon: Package },
      { to: '/wishlist', label: 'Wishlist', icon: Heart },
      { to: '/news', label: 'Farm news', icon: Newspaper },
      { to: '/schemes', label: 'Govt. schemes', icon: Landmark },
    ],
  },
];

const NAV_ITEMS = NAV_GROUPS.flatMap((group) => group.items);

const ROUTE_TITLES: Record<string, { title: string; section: string }> = {
  '/home': { title: 'Personalized Farmer Dashboard', section: 'Home' },
  '/farm': { title: 'Farm & Plot Digital Twin', section: 'Farm Management' },
  '/weather': { title: 'Agro-Meteorological Intelligence', section: 'Weather' },
  '/devices': { title: 'Devices & IoT', section: 'Farm Intelligence' },
  '/dictionary': { title: 'Agricultural Learning Dictionary', section: 'Dictionary' },
  '/disease': { title: '100 Crop Diseases Encyclopedia', section: 'Crop Health' },
  '/store': { title: 'Agricultural Online Store', section: 'Store' },
  '/cart': { title: 'Shopping Cart & Order Review', section: 'Store / Cart' },
  '/checkout': { title: 'Simulated Order Checkout', section: 'Store / Checkout' },
  '/orders': { title: 'Demonstration Order History', section: 'Store / Orders' },
  '/offers': { title: 'Seasonal Vouchers & Promotions', section: 'Store / Offers' },
  '/wishlist': { title: 'Saved Agricultural Supplies', section: 'Store / Wishlist' },
  '/news': { title: 'Agricultural News & Advisories', section: 'News' },
  '/schemes': { title: 'Government Schemes Discovery', section: 'Schemes' },
  '/account': { title: 'Farmer Profile & Preferences', section: 'Account & Settings' },
};

export const AppShell: React.FC = () => {
  const {
    session,
    switchPortal,
    workspaceSyncStatus,
    workspaceSyncError,
    profile,
    logout,
    weather,
    cart,
    activities,
    diseaseReports,
    orders,
    dictionary,
    products,
    devices,
  } = useAgriPulse();

  const location = useLocation();
  const navigate = useNavigate();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [quickSearch, setQuickSearch] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const currentMeta = ROUTE_TITLES[location.pathname] || (location.pathname.startsWith('/devices/')
    ? { title: 'Device details & telemetry', section: 'Devices & IoT' }
    : { title: 'AGRIPULSE Workspace', section: 'Platform' });

  const cartItemCount = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );
  const deviceBadgeCount = devices.filter((device) => device.status === 'pending_pairing' || device.status === 'pending_gateway_assignment' || device.status === 'offline' || device.status === 'attention_required').length;

  // Build attention notifications from saved records
  const attentionItems = useMemo(() => {
    const items: { id: string; title: string; subtitle: string; route: string }[] = [];

    const highPriorityTasks = activities.filter(
      (a) => a.status === 'Pending' && a.priority === 'High'
    );
    for (const task of highPriorityTasks.slice(0, 2)) {
      items.push({
        id: `notif-act-${task.id}`,
        title: `Upcoming Activity: ${task.title}`,
        subtitle: `Scheduled ${task.scheduledDate} (${task.category})`,
        route: '/home',
      });
    }

    const inspectionReports = diseaseReports.filter((r) => r.status === 'Needs inspection');
    if (inspectionReports.length > 0) {
      items.push({
        id: `notif-dis-${inspectionReports[0].id}`,
        title: `Crop Inspection Due: ${inspectionReports[0].cropName}`,
        subtitle: `${inspectionReports[0].plotName} — Status: Needs inspection`,
        route: '/disease',
      });
    }

    if (weather.warnings.length > 0) {
      items.push({
        id: `notif-wx-${weather.warnings[0].id}`,
        title: weather.warnings[0].title,
        subtitle: `${weather.sourceType} advisory`,
        route: '/weather',
      });
    }

    const deviceUpdates = devices.filter((device) => device.status === 'attention_required' || device.status === 'offline' || device.status === 'pending_gateway_assignment' || device.status === 'pending_pairing').slice(0, 2);
    for (const device of deviceUpdates) {
      const statusLabel = device.status.replace(/_/g, ' ');
      items.push({
        id: `notif-device-${device.id}`,
        title: `Device ${device.name}: ${statusLabel}`,
        subtitle: `${device.isDemoRecord ? 'Demo record' : 'Device record'} · no status is changed manually`,
        route: `/devices/${device.id}`,
      });
    }

    if (orders.length > 0) {
      items.push({
        id: `notif-ord-${orders[0].id}`,
        title: `Demo Order ${orders[0].id}: ${orders[0].orderStatus}`,
        subtitle: `${orders[0].items.length} item(s) — Demonstration workflow`,
        route: '/orders',
      });
    }

    return items;
  }, [activities, diseaseReports, weather, orders, devices]);

  // Quick search suggestions across pages, products, and dictionary
  const quickSearchResults = useMemo(() => {
    const q = quickSearch.trim().toLowerCase();
    if (!q) return [];

    const results: { label: string; category: string; route: string }[] = [];

    for (const nav of NAV_ITEMS) {
      if (nav.label.toLowerCase().includes(q)) {
        results.push({ label: `Go to ${nav.label}`, category: 'Page', route: nav.to });
      }
    }

    for (const prod of products) {
      if (
        prod.name.toLowerCase().includes(q) ||
        prod.category.toLowerCase().includes(q)
      ) {
        results.push({
          label: prod.name,
          category: 'Store Product',
          route: `/store?q=${encodeURIComponent(prod.name)}`,
        });
        if (results.length >= 6) break;
      }
    }

    for (const term of dictionary) {
      if (term.term.toLowerCase().includes(q)) {
        results.push({
          label: term.term,
          category: 'Dictionary Term',
          route: `/dictionary?q=${encodeURIComponent(term.term)}`,
        });
        if (results.length >= 8) break;
      }
    }

    return results.slice(0, 6);
  }, [quickSearch, products, dictionary]);

  const handleLogout = () => {
    setProfileMenuOpen(false);
    setMobileDrawerOpen(false);
    logout();
    navigate('/login', { replace: true });
  };

  const todayFormatted = new Date().toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const farmerInitials = profile.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() || '')
    .join('');

  return (
    <div className="app-shell min-h-screen bg-warmbg text-slate-900 flex flex-col lg:flex-row">
      {/* Desktop Left Sidebar */}
      <aside
        aria-label="Primary Sidebar Navigation"
        className="app-sidebar hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-forest-950 text-white border-r border-forest-900 z-30"
      >
        {/* Brand Header */}
        <div className="app-sidebar-brand px-5 py-5 border-b border-forest-800/80 flex items-center justify-between">
          <NavLink to="/home" className="focus:outline-none">
            <AgriPulseLogo size="md" theme="light" />
          </NavLink>
        </div>

        {/* Navigation Links */}
        <nav className="app-sidebar-nav flex-1 px-3 py-4 space-y-1 overflow-y-auto" aria-label="Farmer portal navigation">
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="app-nav-group">
              <div className="px-3 pb-2 pt-3 text-[10px] font-bold uppercase tracking-[0.16em] text-forest-300/80">{group.label}</div>
              {group.items.map((item) => {
                const Icon = item.icon;
                const badgeCount = item.to === '/devices' ? deviceBadgeCount : item.to === '/orders' ? orders.length : 0;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) => `app-nav-link flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${isActive ? 'is-active' : ''}`}
                  >
                    <span className="flex items-center gap-3 min-w-0">
                      <Icon className="w-[17px] h-[17px] shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </span>
                    {badgeCount > 0 && <span className={`app-nav-count ${item.to === '/devices' ? 'is-device' : ''}`}>{badgeCount}</span>}
                  </NavLink>
                );
              })}
            </div>
          ))}

          <NavLink
            to="/cart"
            className={({ isActive }) => `app-nav-link flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${isActive ? 'is-active' : ''}`}
          >
            <span className="flex items-center gap-3 min-w-0"><ShoppingCart className="w-[17px] h-[17px] shrink-0 text-harvest-300" /><span>Shopping cart</span></span>
            {cartItemCount > 0 && <span className="app-nav-count is-cart">{cartItemCount}</span>}
          </NavLink>

          {/* Demo accounts can switch portals; production accounts need an assigned role. */}
          {session?.isDemo && <button
            type="button"
            onClick={async () => { if (await switchPortal('seller')) navigate('/seller'); }}
            className="app-seller-switch w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition my-2"
          >
            <span className="flex items-center gap-3"><Store className="w-[17px] h-[17px] shrink-0" /><span>Seller Central</span></span>
            <span className="app-seller-switch-tag">Switch</span>
          </button>}

          <div className="px-3 pt-3 pb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-forest-300/80">Your account</div>
          <NavLink
            to="/account"
            className={({ isActive }) => `app-nav-link flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${isActive ? 'is-active' : ''}`}
          >
            <UserCog className="w-[17px] h-[17px] shrink-0" /><span>Account & settings</span>
          </NavLink>
        </nav>

        {/* Sidebar Footer & Logout */}
        <div className="app-sidebar-footer p-3 border-t border-forest-800/80 bg-forest-900/50">
          <div className="px-2.5 py-2 mb-2 rounded-lg bg-forest-900/90 border border-forest-800">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-white truncate">
                {profile.name}
              </span>
              <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-leaf-500/20 text-leaf-300 border border-leaf-500/30">
                {session?.isDemo ? 'Demo' : 'Account'}
              </span>
            </div>
            <p className="text-[10px] text-forest-300 truncate mt-0.5">
              {profile.district}, {profile.state}
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-200 hover:text-white hover:bg-red-900/50 border border-transparent hover:border-red-700/50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Column */}
      <div className="app-main-column flex-1 lg:pl-64 flex flex-col min-h-screen min-w-0">
        {/* Top Bar */}
        <header className="app-header sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-slate-200 px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-3">
            {/* Left: Mobile Menu + Page Breadcrumb */}
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(true)}
                aria-label="Open navigation menu"
                className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-forest-700">
                  <span>AGRIPULSE</span>
                  <span>/</span>
                  <span className="truncate">{currentMeta.section}</span>
                </div>
                <h1 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                  {currentMeta.title}
                </h1>
              </div>
            </div>

            {/* Center: Quick Navigation & Search */}
            <div className="hidden md:block relative w-64 lg:w-80">
              <label htmlFor="global-quick-search" className="sr-only">
                Quick search pages, products, or dictionary terms
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="global-quick-search"
                  type="search"
                  value={quickSearch}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 180)}
                  onChange={(e) => setQuickSearch(e.target.value)}
                  placeholder="Quick jump: products, terms, pages..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-forest-600 focus:bg-white"
                />
              </div>

              {searchFocused && quickSearchResults.length > 0 && (
                <div className="absolute left-0 right-0 mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50">
                  {quickSearchResults.map((res) => (
                    <button
                      key={res.route + res.label}
                      type="button"
                      onMouseDown={() => {
                        navigate(res.route);
                        setQuickSearch('');
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-forest-50 flex items-center justify-between gap-2 text-xs"
                    >
                      <span className="font-medium text-slate-800 truncate">{res.label}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0">
                        {res.category}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Date, Weather Pill, Cart, Notifications, Profile */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Current Date */}
              <div className="hidden xl:flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-xl">
                <Calendar className="w-3.5 h-3.5 text-forest-700" />
                <span>{todayFormatted}</span>
              </div>

              {/* Weather Summary Pill */}
              <button
                type="button"
                onClick={() => navigate('/weather')}
                title={`Weather (${weather.sourceType}): ${weather.locationLabel}`}
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-forest-900 bg-forest-50 hover:bg-forest-100 border border-forest-200 px-2.5 py-1.5 rounded-xl transition-colors"
              >
                <CloudSun className="w-4 h-4 text-harvest-600" />
                <span>{weather.tempC}°C</span>
                <span className="text-[10px] font-normal text-slate-600 hidden lg:inline">
                  {weather.district} (Demo)
                </span>
              </button>

              {/* Demo-only portal switch; the API enforces production account roles. */}
              {session?.isDemo && <button
                type="button"
                onClick={async () => { if (await switchPortal('seller')) navigate('/seller'); }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-forest-950 hover:bg-forest-900 text-emerald-300 hover:text-white border border-forest-800 text-xs font-bold transition shadow-xs"
                title="Switch to Seller Central Portal"
              >
                <Store className="w-3.5 h-3.5 text-emerald-400" />
                <span>Seller Portal</span>
              </button>}

              {/* Quick Cart Button */}
              <button
                type="button"
                onClick={() => navigate('/cart')}
                aria-label={`Shopping cart with ${cartItemCount} items`}
                className="relative p-2 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-harvest-500 text-forest-950 text-[10px] font-bold flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setNotifOpen((prev) => !prev);
                    setProfileMenuOpen(false);
                  }}
                  aria-label="Farm notifications and attention items"
                  className="relative p-2 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
                >
                  <Bell className="w-4 h-4" />
                  {attentionItems.length > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500" />
                  )}
                </button>

                {notifOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50">
                    <div className="px-3.5 py-2 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">
                        Farm Attention Items ({attentionItems.length})
                      </span>
                      <button
                        type="button"
                        onClick={() => setNotifOpen(false)}
                        className="text-[11px] text-slate-500 hover:text-slate-800"
                      >
                        Close
                      </button>
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                      {attentionItems.length === 0 ? (
                        <div className="p-4 text-xs text-slate-500 text-center">
                          No urgent farm alerts right now.
                        </div>
                      ) : (
                        attentionItems.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setNotifOpen(false);
                              navigate(item.route);
                            }}
                            className="w-full px-3.5 py-2.5 text-left hover:bg-slate-50 flex items-start gap-2.5"
                          >
                            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-slate-800 truncate">
                                {item.title}
                              </p>
                              <p className="text-[11px] text-slate-500 truncate mt-0.5">
                                {item.subtitle}
                              </p>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Farmer Profile Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setProfileMenuOpen((prev) => !prev);
                    setNotifOpen(false);
                  }}
                  aria-label="Farmer profile menu"
                  className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-forest-800 text-white text-xs font-bold flex items-center justify-center">
                    {farmerInitials || 'F'}
                  </div>
                  <span className="hidden sm:inline text-xs font-semibold text-slate-800 max-w-[110px] truncate">
                    {profile.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {profile.name}
                        </p>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-forest-50 text-forest-800 border border-forest-200">
                          {session?.isDemo ? 'Demo' : 'Account'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {profile.email}
                      </p>
                    </div>
                    <div className="py-1">
                      <button
                        type="button"
                        onClick={() => {
                          setProfileMenuOpen(false);
                          navigate('/account');
                        }}
                        className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      >
                        <UserCog className="w-4 h-4 text-slate-500" />
                        <span>Account & Settings</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setProfileMenuOpen(false);
                          navigate('/orders');
                        }}
                        className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      >
                        <Package className="w-4 h-4 text-slate-500" />
                        <span>Demo Orders ({orders.length})</span>
                      </button>
                    </div>
                    <div className="border-t border-slate-100 pt-1">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-xs font-semibold text-red-700 hover:bg-red-50 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Seller Browsing Notice */}
        {session?.portalType === 'seller' && (
          <div className="bg-emerald-950 text-emerald-100 px-4 py-2.5 border-b border-emerald-800 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                You are currently browsing the Farmer Portal as{' '}
                <strong className="text-white">{session.sellerName || 'Agro Seller'}</strong>.
              </span>
            </div>
            <button
              type="button"
              onClick={() => navigate('/seller')}
              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 font-bold text-[11px] text-white transition shadow-xs whitespace-nowrap"
            >
              Return to Seller Central →
            </button>
          </div>
        )}

        {session?.isDemo && (
          <div className="demo-workspace-banner" role="status">
            <AlertTriangle className="demo-workspace-icon" aria-hidden="true" />
            <p><strong>Development demo · sample workspace.</strong> Demo data is saved by this local development API and is not a production account. Device records do not prove physical pairing or telemetry. Do not enter sensitive personal, financial, network, or device credentials.</p>
          </div>
        )}

        {workspaceSyncError ? (
          <div role="alert" className="mx-4 mt-3 rounded-xl border border-rose-300 bg-rose-50 px-4 py-2.5 text-xs font-semibold text-rose-900 sm:mx-6 lg:mx-8">
            Workspace changes could not be saved: {workspaceSyncError}
          </div>
        ) : workspaceSyncStatus === 'saving' ? (
          <div role="status" className="mx-4 mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs text-emerald-900 sm:mx-6 lg:mx-8">
            Saving workspace changes to the AGRIPULSE API…
          </div>
        ) : null}

        {/* Page Content */}
        <main className="app-content flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-7 pb-24 lg:pb-10 max-w-[1440px] w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Navigation Drawer (All 9+ Destinations) */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="relative w-72 max-w-[82vw] bg-forest-950 text-white h-full flex flex-col z-10 shadow-2xl">
            <div className="p-4 border-b border-forest-800 flex items-center justify-between">
              <AgriPulseLogo size="sm" theme="light" />
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                aria-label="Close navigation drawer"
                className="p-1.5 rounded-lg text-forest-200 hover:text-white hover:bg-forest-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileDrawerOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                        isActive
                          ? 'bg-forest-800 text-white'
                          : 'text-forest-200 hover:bg-forest-900 hover:text-white'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 text-leaf-400" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}

              <div className="pt-2 mt-2 border-t border-forest-800 space-y-1">
                <NavLink
                  to="/cart"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-forest-200 hover:bg-forest-900"
                >
                  <span className="flex items-center gap-3">
                    <ShoppingCart className="w-4 h-4 text-harvest-400" />
                    <span>Shopping Cart</span>
                  </span>
                  {cartItemCount > 0 && (
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-harvest-500 text-forest-950">
                      {cartItemCount}
                    </span>
                  )}
                </NavLink>
                <NavLink
                  to="/orders"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-forest-200 hover:bg-forest-900"
                >
                  <span className="flex items-center gap-3">
                    <Package className="w-4 h-4 text-leaf-400" />
                    <span>Demo Orders</span>
                  </span>
                  <span className="text-[10px] text-forest-300">{orders.length}</span>
                </NavLink>
              </div>
            </div>

            <div className="p-3 border-t border-forest-800">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold bg-red-900/40 text-red-200 hover:bg-red-900/70"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Compact Bottom Navigation Bar */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="app-mobile-bottom-nav lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-slate-200 px-2 py-1.5 grid grid-cols-5 gap-1 shadow-lg"
      >
        {[
          { to: '/home', label: 'Home', icon: Home },
          { to: '/farm', label: 'Farm', icon: Tractor },
          { to: '/devices', label: 'Devices', icon: RadioTower },
          { to: '/weather', label: 'Weather', icon: CloudSun },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 rounded-lg text-[10px] font-semibold ${
                  isActive ? 'text-forest-800 bg-forest-50' : 'text-slate-600'
                }`
              }
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
        <button
          type="button"
          onClick={() => setMobileDrawerOpen(true)}
          className="flex flex-col items-center justify-center py-1 rounded-lg text-[10px] font-semibold text-slate-600"
        >
          <Menu className="w-4 h-4 mb-0.5" />
          <span>All</span>
        </button>
      </nav>

      {/* Floating Agricultural AI Chatbox */}
      <FloatingAIChat />
    </div>
  );
};
