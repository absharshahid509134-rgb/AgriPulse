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
} from 'lucide-react';
import { AgriPulseLogo } from './AgriPulseLogo';
import { FloatingAIChat } from './FloatingAIChat';
import { useAgriPulse } from '../context/AgriPulseContext';

const NAV_ITEMS = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/farm', label: 'Farm', icon: Tractor },
  { to: '/weather', label: 'Weather', icon: CloudSun },
  { to: '/dictionary', label: 'Dictionary', icon: BookOpen },
  { to: '/disease', label: 'Disease', icon: Stethoscope },
  { to: '/store', label: 'Store', icon: ShoppingBag },
  { to: '/news', label: 'News', icon: Newspaper },
  { to: '/schemes', label: 'Schemes', icon: Landmark },
  { to: '/account', label: 'Account & Settings', icon: UserCog },
];

const ROUTE_TITLES: Record<string, { title: string; section: string }> = {
  '/home': { title: 'Personalized Farmer Dashboard', section: 'Home' },
  '/farm': { title: 'Farm & Plot Digital Twin', section: 'Farm Management' },
  '/weather': { title: 'Agro-Meteorological Intelligence', section: 'Weather' },
  '/dictionary': { title: 'Agricultural Learning Dictionary', section: 'Dictionary' },
  '/disease': { title: 'Crop Disease & Symptom Analysis', section: 'Crop Health' },
  '/store': { title: 'Agricultural Online Store (Demo)', section: 'Store' },
  '/cart': { title: 'Shopping Cart & Demo Checkout', section: 'Store / Cart' },
  '/orders': { title: 'Demonstration Order History', section: 'Store / Orders' },
  '/news': { title: 'Agricultural News & Advisories', section: 'News' },
  '/schemes': { title: 'Government Schemes Discovery', section: 'Schemes' },
  '/account': { title: 'Farmer Profile & Preferences', section: 'Account & Settings' },
};

export const AppShell: React.FC = () => {
  const {
    profile,
    logout,
    weather,
    cart,
    activities,
    diseaseReports,
    orders,
    dictionary,
    products,
  } = useAgriPulse();

  const location = useLocation();
  const navigate = useNavigate();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [quickSearch, setQuickSearch] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const currentMeta = ROUTE_TITLES[location.pathname] || {
    title: 'AgriPulse Workspace',
    section: 'Platform',
  };

  const cartItemCount = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  // Build real attention notifications from saved records
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

    if (orders.length > 0) {
      items.push({
        id: `notif-ord-${orders[0].id}`,
        title: `Demo Order ${orders[0].id}: ${orders[0].orderStatus}`,
        subtitle: `${orders[0].items.length} item(s) — Demonstration workflow`,
        route: '/orders',
      });
    }

    return items;
  }, [activities, diseaseReports, weather, orders]);

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
    <div className="min-h-screen bg-warmbg text-slate-900 flex flex-col lg:flex-row">
      {/* Desktop Left Sidebar */}
      <aside
        aria-label="Primary Sidebar Navigation"
        className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-forest-950 text-white border-r border-forest-900 z-30"
      >
        {/* Brand Header */}
        <div className="px-5 py-4 border-b border-forest-800/80 flex items-center justify-between">
          <NavLink to="/home" className="focus:outline-none">
            <AgriPulseLogo size="md" theme="light" />
          </NavLink>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-forest-400">
            Farm & Intelligence
          </div>
          {NAV_ITEMS.slice(0, 5).map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-forest-800 text-white shadow-sm border border-forest-700'
                      : 'text-forest-200 hover:bg-forest-900 hover:text-white'
                  }`
                }
              >
                <Icon className="w-4 h-4 text-leaf-400 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}

          <div className="px-3 pt-4 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-forest-400">
            Commerce & Advisories
          </div>
          {NAV_ITEMS.slice(5, 8).map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-forest-800 text-white shadow-sm border border-forest-700'
                      : 'text-forest-200 hover:bg-forest-900 hover:text-white'
                  }`
                }
              >
                <span className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-leaf-400 shrink-0" />
                  <span>{item.label}</span>
                </span>
              </NavLink>
            );
          })}

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                isActive
                  ? 'bg-forest-800 text-white shadow-sm border border-forest-700'
                  : 'text-forest-200 hover:bg-forest-900 hover:text-white'
              }`
            }
          >
            <span className="flex items-center gap-3">
              <ShoppingCart className="w-4 h-4 text-harvest-400 shrink-0" />
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
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                isActive
                  ? 'bg-forest-800 text-white shadow-sm border border-forest-700'
                  : 'text-forest-200 hover:bg-forest-900 hover:text-white'
              }`
            }
          >
            <span className="flex items-center gap-3">
              <Package className="w-4 h-4 text-leaf-400 shrink-0" />
              <span>Demo Orders</span>
            </span>
            <span className="text-[10px] text-forest-300">{orders.length}</span>
          </NavLink>

          <div className="px-3 pt-4 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-forest-400">
            Account
          </div>
          <NavLink
            to="/account"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                isActive
                  ? 'bg-forest-800 text-white shadow-sm border border-forest-700'
                  : 'text-forest-200 hover:bg-forest-900 hover:text-white'
              }`
            }
          >
            <UserCog className="w-4 h-4 text-leaf-400 shrink-0" />
            <span>Account & Settings</span>
          </NavLink>
        </nav>

        {/* Sidebar Footer & Logout */}
        <div className="p-3 border-t border-forest-800/80 bg-forest-900/50">
          <div className="px-2.5 py-2 mb-2 rounded-lg bg-forest-900/90 border border-forest-800">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-white truncate">
                {profile.name}
              </span>
              <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-leaf-500/20 text-leaf-300 border border-leaf-500/30">
                Demo
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
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-slate-200 px-4 sm:px-6 py-2.5">
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
                          Demo
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

        {/* Page Content */}
        <main className="flex-1 px-4 sm:px-6 py-5 pb-24 lg:pb-10 max-w-7xl w-full mx-auto">
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
        className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-slate-200 px-2 py-1.5 grid grid-cols-5 gap-1 shadow-lg"
      >
        {[
          { to: '/home', label: 'Home', icon: Home },
          { to: '/farm', label: 'Farm', icon: Tractor },
          { to: '/weather', label: 'Weather', icon: CloudSun },
          { to: '/store', label: 'Store', icon: ShoppingBag },
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
          <span>All (9)</span>
        </button>
      </nav>

      {/* Floating Agricultural AI Chatbox */}
      <FloatingAIChat />
    </div>
  );
};
