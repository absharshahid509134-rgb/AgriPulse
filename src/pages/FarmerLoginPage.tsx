import React, { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  Sprout,
  Lock,
  Mail,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Store,
  Tractor,
  CloudSun,
  BookOpen,
} from 'lucide-react';
import { AgriPulseLogo } from '../components/AgriPulseLogo';
import {
  useAgriPulse,
  DEMO_MODE_ENABLED,
} from '../context/AgriPulseContext';

export const FarmerLoginPage: React.FC = () => {
  const { session, loginWithCredentials, loginAsFarmerDemo, loginAsSellerDemo } = useAgriPulse();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  // If already logged in, redirect to respective portal
  if (session) {
    const fromPath = (location.state as { from?: string } | null)?.from;
    if (fromPath) {
      return <Navigate to={fromPath} replace />;
    }
    return <Navigate to={session.portalType === 'seller' ? '/seller' : '/home'} replace />;
  }

  const validateFields = (emailVal: string, passVal: string) => {
    const errs: { email?: string; password?: string } = {};
    const trimmed = emailVal.trim();
    if (!trimmed) {
      errs.email = 'Please enter your farmer account email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      errs.email = 'Please enter a valid email format (e.g., farmer@example.com).';
    }
    if (!passVal) {
      errs.password = 'Please enter your account password.';
    } else if (passVal.length < 10) {
      errs.password = 'Password must be at least 10 characters.';
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFarmerLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isSubmitting) return;
    setErrorMsg(null);
    if (!validateFields(email, password)) return;

    setIsSubmitting(true);
    try {
      const res = await loginWithCredentials(email, password, rememberMe, 'farmer');
      if (res.ok) {
        navigate('/home', { replace: true });
      } else {
        setErrorMsg(res.error || 'Invalid farmer credentials.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInstantDemoFarmer = async () => {
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await loginAsFarmerDemo();
      if (res.ok) {
        navigate('/home', { replace: true });
      } else {
        setErrorMsg(res.error || 'Could not open the development farmer workspace.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInstantDemoSeller = async () => {
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await loginAsSellerDemo();
      if (res.ok) {
        navigate('/seller', { replace: true });
      } else {
        setErrorMsg(res.error || 'Could not open the development seller workspace.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className="farmer-login-page min-h-screen bg-warmbg flex flex-col justify-between">
      {/* Top Header */}
      <header className="login-header bg-white text-forest-950 border-b border-forest-100 px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AgriPulseLogo size="md" theme="dark" />
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-leaf-500/20 text-leaf-300 border border-leaf-500/30">
            Farmer Portal
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          {DEMO_MODE_ENABLED && <button
            type="button"
            onClick={handleInstantDemoSeller}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-forest-900 hover:bg-forest-800 text-forest-200 hover:text-white border border-forest-700 transition"
          >
            <Store className="w-3.5 h-3.5 text-amber-400" />
            <span>Open Seller Demo</span>
          </button>}
          <Link
            to="/login"
            className="px-3.5 py-1.5 rounded-lg bg-forest-800 hover:bg-forest-700 text-forest-100 hover:text-white font-medium border border-forest-700 transition"
          >
            Are you a Seller? Sign In Here
          </Link>
        </div>
      </header>

      {/* Main Split Layout */}
      <main className="farmer-login-main login-main max-w-6xl mx-auto w-full px-4 py-8 sm:py-10 flex-1 grid grid-cols-1 lg:grid-cols-2 items-stretch gap-6 lg:gap-8">
        {/* Left Hero Card */}
        <div className="farmer-login-story space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-leaf-500/10 border border-leaf-600/30 text-leaf-800 text-xs font-semibold">
            <Sprout className="w-4 h-4 text-leaf-600" />
            <span>Intelligent Farm Digital Twin & Agronomic Intelligence</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-950 tracking-tight leading-tight">
            Farmer Portal Sign In
          </h1>

          <p className="text-base text-forest-800 leading-relaxed">
            Monitor crop stress across your plots, study 100 crop diseases with 25-heading pathology
            dossiers, get hyper-local weather alerts, and purchase certified agricultural inputs.
          </p>

          {/* Quick Feature Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="rounded-xl bg-white border border-forest-100 p-3.5 shadow-xs">
              <Tractor className="w-5 h-5 text-leaf-600 mb-1.5" />
              <h2 className="text-xs font-bold text-forest-950">Field Digital Twin</h2>
              <p className="text-[11px] text-forest-700 mt-0.5">Plot NDVI & growth tracking</p>
            </div>
            <div className="rounded-xl bg-white border border-forest-100 p-3.5 shadow-xs">
              <BookOpen className="w-5 h-5 text-leaf-600 mb-1.5" />
              <h2 className="text-xs font-bold text-forest-950">100 Crop Diseases</h2>
              <p className="text-[11px] text-forest-700 mt-0.5">25-Heading exam & field guide</p>
            </div>
            <div className="rounded-xl bg-white border border-forest-100 p-3.5 shadow-xs">
              <CloudSun className="w-5 h-5 text-leaf-600 mb-1.5" />
              <h2 className="text-xs font-bold text-forest-950">Agro-Weather</h2>
              <p className="text-[11px] text-forest-700 mt-0.5">Spray windows & rainfall logs</p>
            </div>
          </div>

          {/* Bridge to Seller Portal */}
          <div className="rounded-2xl bg-amber-50/80 border border-amber-200/80 p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Store className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-amber-950">Agri-Input Seller or Dealer?</p>
                <p className="text-[11px] text-amber-800">
                  Manage product catalog, farmer dispatches, and mandi payouts.
                </p>
              </div>
            </div>
            <Link
              to="/login"
              className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-950 hover:bg-amber-100 text-xs font-bold transition whitespace-nowrap"
            >
              Seller Sign In →
            </Link>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="login-form-wrap">
          <div className="login-form-card bg-white rounded-3xl shadow-lg border border-forest-100 p-6 sm:p-8">
            {/* Fast 1-Click Action */}
            {DEMO_MODE_ENABLED && <div className="mb-6 pb-6 border-b border-forest-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-leaf-800">
                  Development Demo Access
                </span>
                <span className="text-[11px] text-forest-600 font-medium">No typing required</span>
              </div>
              <button
                type="button"
                onClick={handleInstantDemoFarmer}
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-leaf-600 hover:bg-leaf-700 text-white font-bold text-sm shadow-md transition transform active:scale-98"
              >
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>Open Farmer Demo Workspace</span>
              </button>
            </div>}

            {/* Standard Sign In Form */}
            <form onSubmit={handleFarmerLogin} className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-forest-700 mb-1">
                Farmer account sign-in
              </div>

              {errorMsg && (
                <div className="rounded-xl bg-rose-50 border border-rose-200 p-3.5 flex items-start gap-2.5 text-rose-800 text-xs">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Sign In Error:</span> {errorMsg}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-forest-900 mb-1">
                  Farmer Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-forest-400 absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: undefined });
                    }}
                    placeholder="farmer@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-forest-200 text-forest-950 text-sm focus:outline-none focus:ring-2 focus:ring-leaf-500"
                  />
                </div>
                {fieldErrors.email && (
                  <p className="text-[11px] text-rose-600 mt-1">{fieldErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-forest-900 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-forest-400 absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (fieldErrors.password) {
                        setFieldErrors({ ...fieldErrors, password: undefined });
                      }
                    }}
                    placeholder="Enter password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-forest-200 text-forest-950 text-sm focus:outline-none focus:ring-2 focus:ring-leaf-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-2.5 text-forest-400 hover:text-forest-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p className="text-[11px] text-rose-600 mt-1">{fieldErrors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-leaf-600 focus:ring-leaf-500 border-forest-300"
                  />
                  <span className="text-forest-700">Remember this session</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-forest-950 hover:bg-forest-900 text-white font-bold text-sm transition shadow-sm"
              >
                <span>{isSubmitting ? 'Signing In...' : 'Sign In to Farmer Portal'}</span>
                <ArrowRight className="w-4 h-4 text-leaf-400" />
              </button>
            </form>

            <div className="auth-security-note mt-5">
              <ShieldCheck className="w-4 h-4" />
              <p>{DEMO_MODE_ENABLED
                ? 'Account sign-in uses the AGRIPULSE API. Development demo access is available through the labelled one-click launcher above; no reusable password is embedded in the site.'
                : 'Sign-in is handled by the AGRIPULSE API. Email verification and password recovery are not configured here; use a unique password.'}</p>
            </div>

            {/* Bottom Links */}
            <div className="mt-6 pt-4 border-t border-forest-100 flex items-center justify-between text-xs text-forest-600">
              <Link to="/farmer/signup" className="text-leaf-700 font-bold hover:underline">
                New Farmer? Register Profile
              </Link>
              <Link to="/login" className="text-forest-700 font-semibold hover:underline">
                Seller Sign In Portal →
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-forest-600 border-t border-forest-100">
        © 2026 AGRIPULSE Farmer Portal.
      </footer>
    </div>
  );
};
