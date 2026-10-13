import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  Sprout,
  CloudSun,
  Stethoscope,
  Lock,
  Mail,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Upload,
} from 'lucide-react';
import { AgriPulseLogo } from '../components/AgriPulseLogo';
import {
  DEMO_ACCOUNT_EMAIL,
  DEMO_ACCOUNT_PASSWORD,
  useAgriPulse,
} from '../context/AgriPulseContext';

export const LoginPage: React.FC = () => {
  const { session, loginWithCredentials, customLogoUrl, setCustomLogoUrl } = useAgriPulse();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // If already logged in, redirect to /home (or intended protected route)
  if (session) {
    const fromPath = (location.state as { from?: string } | null)?.from || '/home';
    return <Navigate to={fromPath} replace />;
  }

  const validateFields = (emailVal: string, passVal: string) => {
    const errs: { email?: string; password?: string } = {};
    const trimmedEmail = emailVal.trim();
    if (!trimmedEmail) {
      errs.email = 'Please enter your farmer account email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errs.email = 'Please enter a valid email format (e.g., farmer.demo@AgriPulse.in).';
    }
    if (!passVal) {
      errs.password = 'Please enter your account password.';
    } else if (passVal.length < 6) {
      errs.password = 'Password must be at least 6 characters long.';
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const performLogin = async (emailVal: string, passVal: string) => {
    if (isSubmitting) return;
    setErrorMsg(null);
    if (!validateFields(emailVal, passVal)) return;

    setIsSubmitting(true);
    try {
      const result = await loginWithCredentials(emailVal, passVal, rememberMe);
      if (result.ok) {
        const target = (location.state as { from?: string } | null)?.from || '/home';
        navigate(target, { replace: true });
      } else {
        setErrorMsg(result.error || 'Unable to sign in. Please check your credentials.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void performLogin(email, password);
  };

  const handleUseDemoAccount = () => {
    setEmail(DEMO_ACCOUNT_EMAIL);
    setPassword(DEMO_ACCOUNT_PASSWORD);
    setFieldErrors({});
    setErrorMsg(null);
    void performLogin(DEMO_ACCOUNT_EMAIL, DEMO_ACCOUNT_PASSWORD);
  };

  const handleFillOnly = () => {
    setEmail(DEMO_ACCOUNT_EMAIL);
    setPassword(DEMO_ACCOUNT_PASSWORD);
    setFieldErrors({});
    setErrorMsg(null);
  };

  const handleCopy = (text: string, label: string) => {
    void navigator.clipboard?.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 1600);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/') || file.size > 2 * 1024 * 1024) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setCustomLogoUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-warmbg flex flex-col lg:flex-row">
      {/* Left Hero Panel */}
      <section
        aria-label="AgriPulse Platform Introduction"
        className="lg:w-1/2 bg-forest-950 text-white p-6 sm:p-10 lg:p-14 flex flex-col justify-between relative overflow-hidden"
      >
        {/* Subtle agricultural terrace contour SVG background */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, #5dc379 0%, transparent 45%), radial-gradient(circle at 80% 80%, #d69d37 0%, transparent 45%)',
          }}
        />

        {/* Top Logo & Tagline */}
        <div className="relative z-10 flex items-center justify-between gap-4">
          <AgriPulseLogo size="lg" theme="light" showTagline />
          <label
            title="Upload custom AGRIPULSE logo image"
            className="cursor-pointer inline-flex items-center gap-1.5 text-[11px] font-medium text-forest-200 hover:text-white bg-forest-900/90 hover:bg-forest-800 border border-forest-700 px-2.5 py-1.5 rounded-xl transition-colors"
          >
            <Upload className="w-3.5 h-3.5 text-leaf-400" />
            <span>{customLogoUrl ? 'Change Logo' : 'Upload Logo'}</span>
            <input
              type="file"
              accept="image/png,image/jpeg,image/svg+xml,image/webp"
              onChange={handleLogoUpload}
              className="sr-only"
            />
          </label>
        </div>

        {/* Center Hero Content & Restrained Agricultural Illustration */}
        <div className="relative z-10 my-8 lg:my-auto max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900 border border-forest-700 text-leaf-300 text-xs font-semibold mb-4">
            <Sprout className="w-3.5 h-3.5" />
            <span>Intelligent Farm Digital Twin & Early Crop-Stress Detection</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Your Farm. Your Intelligence.
          </h1>
          <p className="mt-3 text-sm sm:text-base text-forest-100 leading-relaxed">
            Understand your crops, anticipate risks, and make smarter farming decisions.
          </p>

          {/* Restrained Agricultural Digital Twin Field Illustration */}
          <div className="mt-6 rounded-2xl bg-forest-900/80 border border-forest-800 p-4 shadow-inner">
            <div className="flex items-center justify-between text-xs text-forest-200 mb-3">
              <span className="font-semibold text-white">
                Field Digital Twin Overview — Sample Farm Snapshot
              </span>
              <span className="px-2 py-0.5 rounded bg-leaf-500/20 text-leaf-300 text-[10px] font-bold">
                Measure • Understand • Predict • Protect
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2.5 text-xs">
              <div className="bg-forest-950/70 border border-forest-800/80 rounded-xl p-3">
                <span className="text-[10px] uppercase tracking-wider text-forest-300 block">
                  Plot A1 • Basmati
                </span>
                <span className="text-sm font-bold text-leaf-300 mt-0.5 block">
                  Maturation
                </span>
                <span className="text-[11px] text-forest-200 mt-0.5 block">
                  Moisture: 51% (Rec.)
                </span>
              </div>
              <div className="bg-forest-950/70 border border-forest-800/80 rounded-xl p-3">
                <span className="text-[10px] uppercase tracking-wider text-forest-300 block">
                  Plot A2 • Wheat
                </span>
                <span className="text-sm font-bold text-harvest-300 mt-0.5 block">
                  Emergence
                </span>
                <span className="text-[11px] text-forest-200 mt-0.5 block">
                  Irrigation Due Tue
                </span>
              </div>
              <div className="bg-forest-950/70 border border-forest-800/80 rounded-xl p-3">
                <span className="text-[10px] uppercase tracking-wider text-forest-300 block">
                  Karnal Forecast
                </span>
                <span className="text-sm font-bold text-white mt-0.5 block">
                  29°C • 58% RH
                </span>
                <span className="text-[11px] text-forest-200 mt-0.5 block">
                  Fri Shower Watch
                </span>
              </div>
            </div>
          </div>

          {/* Three Compact Feature Highlights */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-forest-900/60 border border-forest-800 rounded-xl p-3.5 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-leaf-500/20 text-leaf-300 shrink-0">
                <Sprout className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xs font-bold text-white">Smart Farm Monitoring</h2>
                <p className="text-[11px] text-forest-200 mt-0.5">
                  Multi-farm plots, crop stages, soil logs, and activity calendars.
                </p>
              </div>
            </div>

            <div className="bg-forest-900/60 border border-forest-800 rounded-xl p-3.5 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-harvest-500/20 text-harvest-300 shrink-0">
                <CloudSun className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xs font-bold text-white">Weather Intelligence</h2>
                <p className="text-[11px] text-forest-200 mt-0.5">
                  7-day forecasts, rainfall logs, and cautious field advisories.
                </p>
              </div>
            </div>

            <div className="bg-forest-900/60 border border-forest-800 rounded-xl p-3.5 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-sky-500/20 text-sky-300 shrink-0">
                <Stethoscope className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xs font-bold text-white">Crop Health Insights</h2>
                <p className="text-[11px] text-forest-200 mt-0.5">
                  Symptom analysis, 52-term dictionary, agricultural store & schemes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Left Footer */}
        <div className="relative z-10 text-xs text-forest-300 flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-forest-800/80">
          <span>AGRIPULSE — Measure. Understand. Predict. Protect.</span>
          <span>Offline-Capable Demo Ready</span>
        </div>
      </section>

      {/* Right Login Form Panel */}
      <main className="lg:w-1/2 flex-1 flex flex-col justify-center items-center p-6 sm:p-10 lg:p-14">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200/90 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Farmer Sign In</h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Access your personalized farm dashboard & agricultural store
              </p>
            </div>
            <div className="lg:hidden">
              <AgriPulseLogo size="sm" theme="dark" />
            </div>
          </div>

          {/* Demo Account Quick Access Box */}
          <div className="mb-6 rounded-xl bg-forest-50/90 border border-forest-200 p-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-900">
                <Sparkles className="w-4 h-4 text-forest-700" />
                Instant Demo Farmer Account
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white text-forest-800 border border-forest-200">
                No API Key Required
              </span>
            </div>

            <div className="space-y-1.5 text-xs bg-white rounded-lg p-2.5 border border-forest-100 mb-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-slate-500">Email:</span>
                <div className="flex items-center gap-1.5">
                  <code className="font-mono font-semibold text-slate-900">
                    {DEMO_ACCOUNT_EMAIL}
                  </code>
                  <button
                    type="button"
                    onClick={() => handleCopy(DEMO_ACCOUNT_EMAIL, 'email')}
                    className="text-[10px] font-semibold text-forest-700 hover:underline"
                  >
                    {copiedField === 'email' ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-slate-500">Password:</span>
                <div className="flex items-center gap-1.5">
                  <code className="font-mono font-semibold text-slate-900">
                    {DEMO_ACCOUNT_PASSWORD}
                  </code>
                  <button
                    type="button"
                    onClick={() => handleCopy(DEMO_ACCOUNT_PASSWORD, 'password')}
                    className="text-[10px] font-semibold text-forest-700 hover:underline"
                  >
                    {copiedField === 'password' ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleUseDemoAccount}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-forest-800 hover:bg-forest-900 text-white shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-forest-700"
              >
                <CheckCircle2 className="w-4 h-4 text-leaf-300" />
                <span>Use Demo Account (Sign In Now)</span>
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleFillOnly}
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-forest-100 text-forest-800 border border-forest-300 transition-colors"
              >
                Fill Form
              </button>
            </div>
          </div>

          {errorMsg && (
            <div
              role="alert"
              className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-800"
            >
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label
                htmlFor="login-email"
                className="block text-xs font-semibold text-slate-800 mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: undefined });
                  }}
                  placeholder="farmer.demo@AgriPulse.in"
                  className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border ${
                    fieldErrors.email
                      ? 'border-red-400 bg-red-50/30'
                      : 'border-slate-300 bg-white'
                  } text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-forest-600`}
                />
              </div>
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="block text-xs font-semibold text-slate-800 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password)
                      setFieldErrors({ ...fieldErrors, password: undefined });
                  }}
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border ${
                    fieldErrors.password
                      ? 'border-red-400 bg-red-50/30'
                      : 'border-slate-300 bg-white'
                  } text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-forest-600`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-slate-800"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.password}</p>
              )}
            </div>

            {/* Remember My Login */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-forest-700 focus:ring-forest-600"
                />
                <div className="text-xs">
                  <span className="font-semibold text-slate-800 block">
                    Remember my login on this browser
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    Keeps your demo farmer session active across page refreshes and browser restarts until you click Sign Out.
                  </span>
                </div>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl text-sm font-bold bg-forest-900 hover:bg-forest-950 disabled:bg-slate-400 text-white shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forest-800"
            >
              {isSubmitting ? 'Signing in to AgriPulse...' : 'Sign In'}
            </button>
          </form>

          {/* Help & Security Distinction Note */}
          <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => setShowHelpModal((prev) => !prev)}
              className="inline-flex items-center gap-1.5 font-semibold text-forest-800 hover:underline"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Account access & demo storage help</span>
            </button>
            <span className="text-[11px] text-slate-500">v1.0 Demo Ready</span>
          </div>

          {showHelpModal && (
            <div className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
              <p className="font-bold text-slate-900">
                About the AGRIPULSE Demonstration Account:
              </p>
              <p>
                • <strong>Demo Credentials:</strong> Sign in with{' '}
                <code>{DEMO_ACCOUNT_EMAIL}</code> and <code>{DEMO_ACCOUNT_PASSWORD}</code>.
              </p>
              <p>
                • <strong>Local Persistence:</strong> Your farms, crop records, cart items, and demo orders are saved in this browser&apos;s <code>localStorage</code> and persist across refreshes and logouts.
              </p>
              <p>
                • <strong>Security Note:</strong> The hardcoded demo account is for standalone demonstrations only. Production farmer accounts require a backend authentication provider (such as Supabase Auth) with row-level security.
              </p>
            </div>
          )}
        </div>

        {/* Right Footer Branding */}
        <footer className="mt-6 text-center text-xs text-slate-500">
          <p className="font-semibold text-slate-700">
            AGRIPULSE — Intelligent Farm Digital Twin & Early Crop-Stress Detection System
          </p>
          <p className="text-[11px] mt-0.5">
            Measure. Understand. Predict. Protect. • Built for Indian Farmers
          </p>
        </footer>
      </main>
    </div>
  );
};
