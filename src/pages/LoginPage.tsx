import React, { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  Store,
  Building2,
  Lock,
  Mail,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Sprout,
  ShieldCheck,
  TrendingUp,
  Package,
  Truck,
  Copy,
  Check,
} from 'lucide-react';
import { AgriPulseLogo } from '../components/AgriPulseLogo';
import {
  DEMO_SELLER_EMAIL,
  DEMO_SELLER_PASSWORD,
  DEMO_FARMER_EMAIL,
  DEMO_FARMER_PASSWORD,
  useAgriPulse,
} from '../context/AgriPulseContext';

export const LoginPage: React.FC = () => {
  const {
    session,
    loginWithCredentials,
    loginAsSellerDemo,
    loginAsFarmerDemo,
  } = useAgriPulse();

  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [copiedField, setCopiedField] = useState<string | null>(null);

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
      errs.email = 'Please enter your registered seller or vendor email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      errs.email = 'Please enter a valid email address (e.g., seller.demo@kisanmart.in).';
    }
    if (!passVal) {
      errs.password = 'Please enter your account password.';
    } else if (passVal.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSellerLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isSubmitting) return;
    setErrorMsg(null);
    if (!validateFields(email, password)) return;

    setIsSubmitting(true);
    try {
      const res = await loginWithCredentials(email, password, rememberMe, 'seller');
      if (res.ok) {
        navigate(res.portal === 'seller' ? '/seller' : '/home', { replace: true });
      } else {
        setErrorMsg(res.error || 'Invalid credentials.');
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
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillSellerDemo = () => {
    setEmail(DEMO_SELLER_EMAIL);
    setPassword(DEMO_SELLER_PASSWORD);
    setFieldErrors({});
    setErrorMsg(null);
  };

  const handleCopy = (text: string, label: string) => {
    void navigator.clipboard?.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 1600);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-between text-slate-100">
      {/* Top Header */}
      <header className="bg-forest-950 border-b border-forest-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AgriPulseLogo size="md" theme="light" />
          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <Store className="w-3.5 h-3.5" />
            Seller Central
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <Link
            to="/farmer/login"
            className="px-3 py-1.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-emerald-300 hover:text-emerald-200 border border-emerald-500/30 transition flex items-center gap-1.5 font-medium"
          >
            <Sprout className="w-3.5 h-3.5" />
            <span>Farmer Portal Sign In</span>
          </Link>
          <Link
            to="/signup"
            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow-sm"
          >
            Register Seller Account
          </Link>
        </div>
      </header>

      {/* Main Split Section */}
      <main className="max-w-6xl mx-auto w-full px-4 py-8 sm:py-12 flex-1 flex flex-col lg:flex-row items-center gap-8 lg:gap-14">
        {/* Left Hero Card */}
        <div className="lg:w-1/2 w-full space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>AgriPulse Verified Agro-Seller & Mandi Network</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Seller Central Sign In
          </h1>

          <p className="text-base text-slate-300 leading-relaxed">
            Manage your agricultural supply business. List certified seed lots, fertilizers, crop
            protection, and machinery, fulfill farmer orders, track dispatch tracking IDs, and manage
            weekly mandi settlements.
          </p>

          {/* Value Props for Sellers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="rounded-2xl bg-forest-900/60 border border-forest-800 p-4">
              <Package className="w-5 h-5 text-emerald-400 mb-2" />
              <h2 className="text-xs font-bold text-white">Live Catalog Management</h2>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Add, price & manage inventory in seconds
              </p>
            </div>
            <div className="rounded-2xl bg-forest-900/60 border border-forest-800 p-4">
              <Truck className="w-5 h-5 text-emerald-400 mb-2" />
              <h2 className="text-xs font-bold text-white">Farmer Order Dispatch</h2>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Automated shipping slips & GST invoices
              </p>
            </div>
            <div className="rounded-2xl bg-forest-900/60 border border-forest-800 p-4">
              <TrendingUp className="w-5 h-5 text-emerald-400 mb-2" />
              <h2 className="text-xs font-bold text-white">Weekly Payouts</h2>
              <p className="text-[11px] text-slate-300 mt-0.5">
                0% demo commission & direct NEFT settlements
              </p>
            </div>
          </div>

          {/* Bridge to Farmer Portal */}
          <div className="rounded-2xl bg-emerald-950/70 border border-emerald-800/60 p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Sprout className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Are you a Farmer?</p>
                <p className="text-[11px] text-emerald-200">
                  Access crop stress digital twin, 100-disease encyclopedia & weather alerts.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleInstantDemoFarmer}
                className="px-2.5 py-1.5 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-emerald-200 text-xs font-semibold border border-emerald-700 transition"
              >
                1-Click Farmer
              </button>
              <Link
                to="/farmer/login"
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition whitespace-nowrap"
              >
                Farmer Sign In →
              </Link>
            </div>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="lg:w-1/2 w-full">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 text-slate-900 p-6 sm:p-8">
            {/* Top Primary 1-Click Action */}
            <div className="mb-6 pb-6 border-b border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Instant 1-Click Demo Portals
                </span>
                <span className="text-[11px] text-slate-500 font-medium">No password required</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleInstantDemoFarmer}
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition transform active:scale-98"
                >
                  <Sprout className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Launch Farmer Portal</span>
                </button>
                <button
                  type="button"
                  onClick={handleInstantDemoSeller}
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-3.5 rounded-2xl bg-forest-950 hover:bg-forest-900 text-white font-bold text-xs sm:text-sm shadow-md transition transform active:scale-98"
                >
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Launch Seller Portal</span>
                </button>
              </div>
            </div>

            {/* Standard Seller Sign In Form */}
            <form onSubmit={handleSellerLogin} className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Or Sign In with Seller Credentials
              </div>

              {errorMsg && (
                <div className="rounded-xl bg-rose-50 border border-rose-200 p-3.5 flex items-start gap-2.5 text-rose-800 text-xs">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Authentication Notice:</span> {errorMsg}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Business / Seller Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: undefined });
                    }}
                    placeholder="seller.demo@kisanmart.in"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                {fieldErrors.email && (
                  <p className="text-[11px] text-rose-600 mt-1">{fieldErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Portal Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
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
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-700"
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
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                  />
                  <span className="text-slate-600">Keep me logged in</span>
                </label>
                <button
                  type="button"
                  onClick={handleFillSellerDemo}
                  className="text-emerald-700 hover:text-emerald-800 font-semibold hover:underline"
                >
                  Auto-fill Seller Demo
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-forest-950 hover:bg-forest-900 text-white font-bold text-sm transition shadow-sm"
              >
                <span>{isSubmitting ? 'Accessing Portal...' : 'Sign In to Seller Central'}</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </button>
            </form>

            {/* Demo Account Credentials Reference Card */}
            <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-200 p-4 text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Default Demonstration Seller Account
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                  Pre-configured Co-op
                </span>
              </div>

              <div className="space-y-1.5 font-mono text-[11px] text-slate-700">
                <div className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg border border-slate-200">
                  <span>
                    Email:{' '}
                    <strong className="text-slate-900 font-semibold">{DEMO_SELLER_EMAIL}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(DEMO_SELLER_EMAIL, 'seller-email')}
                    className="text-slate-400 hover:text-slate-800 ml-2"
                  >
                    {copiedField === 'seller-email' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg border border-slate-200">
                  <span>
                    Password:{' '}
                    <strong className="text-slate-900 font-semibold">{DEMO_SELLER_PASSWORD}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(DEMO_SELLER_PASSWORD, 'seller-password')}
                    className="text-slate-400 hover:text-slate-800 ml-2"
                  >
                    {copiedField === 'seller-password' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Links */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <Link to="/signup" className="text-emerald-700 font-bold hover:underline">
                New Agro-Seller? Register Account
              </Link>
              <Link to="/farmer/login" className="text-slate-700 font-semibold hover:underline">
                Farmer Sign In Portal →
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-slate-400 border-t border-slate-800 bg-forest-950">
        © 2026 AgriPulse Agro-Business & Seller Central. Certified Marketplace Platform for
        Agricultural Input Dealers & Producers.
      </footer>
    </div>
  );
};
