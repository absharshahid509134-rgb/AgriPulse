import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sprout,
  Mail,
  Lock,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Tractor,
  Layers,
  Store,
} from 'lucide-react';
import { AgriPulseLogo } from '../components/AgriPulseLogo';
import { useAgriPulse } from '../context/AgriPulseContext';

export const FarmerSignUpPage: React.FC = () => {
  const { registerFarmer, loginAsFarmerDemo, loginAsSellerDemo } = useAgriPulse();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('Haryana');
  const [district, setDistrict] = useState('Karnal');
  const [village, setVillage] = useState('Taraori');
  const [primaryCrop, setPrimaryCrop] = useState('Wheat');
  const [landArea, setLandArea] = useState('6.5');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleDemoFill = () => {
    setName('Baldev Singh Gill');
    setMobile('+91 98765 43210');
    setEmail('baldev.farmer@agrisense.in');
    setState('Punjab');
    setDistrict('Ludhiana');
    setVillage('Samrala');
    setPrimaryCrop('Wheat');
    setLandArea('10.0');
    setPassword('Farm@2026!');
    setConfirmPassword('Farm@2026!');
    setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await registerFarmer({
        name: name.trim(),
        mobile: mobile.trim() || '+91 98124 56780',
        email: email.trim(),
        state,
        district,
        village,
        preferences: {
          language: 'en',
          preferredAreaUnit: 'acre',
          bighaToAcreFactor: 0.25,
          bighaRegionLabel: `${state} Local Bigha`,
          defaultFarmId: 'farm-001',
          defaultCrop: primaryCrop,
          weatherLocation: {
            state,
            district,
            locality: `${village} Gram Panchayat`,
          },
          notifications: {
            weatherAlerts: true,
            irrigationReminders: true,
            cropInspectionAlerts: true,
            orderUpdates: true,
            schemeUpdates: true,
          },
        },
      });

      if (res.ok) {
        navigate('/home', { replace: true });
      } else {
        setErrorMsg(res.error || 'Unable to register farmer profile.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInstantDemoFarmer = async () => {
    setIsSubmitting(true);
    try {
      await loginAsFarmerDemo();
      navigate('/home', { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInstantDemoSeller = async () => {
    setIsSubmitting(true);
    try {
      await loginAsSellerDemo();
      navigate('/seller', { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-warmbg flex flex-col justify-between">
      {/* Top Header */}
      <header className="bg-forest-950 text-white border-b border-forest-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AgriPulseLogo size="md" theme="light" />
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-leaf-500/20 text-leaf-300 border border-leaf-500/30">
            Farmer Portal
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <button
            type="button"
            onClick={handleInstantDemoSeller}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-forest-900 hover:bg-forest-800 text-forest-200 hover:text-white border border-forest-700 transition"
          >
            <Store className="w-3.5 h-3.5 text-amber-400" />
            <span>Seller Central Demo</span>
          </button>
          <Link
            to="/farmer/login"
            className="px-3.5 py-1.5 rounded-lg bg-leaf-600 hover:bg-leaf-500 text-white font-medium transition shadow-sm"
          >
            Already Registered? Sign In
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto w-full px-4 py-8 sm:py-10">
        <div className="bg-white rounded-3xl shadow-sm border border-forest-100 overflow-hidden">
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-forest-950 via-forest-900 to-forest-950 text-white p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-leaf-500/20 text-leaf-300 text-xs font-semibold mb-2 border border-leaf-500/30">
                  <Sprout className="w-3.5 h-3.5" />
                  Farmer Digital Twin Profile
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Register as a Farmer
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-forest-200">
                  Setup your farm plots, track soil and weather conditions, and get localized disease advisories.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={handleInstantDemoFarmer}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-leaf-500 hover:bg-leaf-400 text-forest-950 font-bold text-xs transition shadow-md whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>1-Click Demo Farmer Login</span>
                </button>
                <button
                  type="button"
                  onClick={handleDemoFill}
                  className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-forest-800 hover:bg-forest-700 text-leaf-300 text-xs font-medium border border-forest-700 transition whitespace-nowrap"
                >
                  <span>Auto-Fill Sample Data</span>
                </button>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            {errorMsg && (
              <div className="rounded-xl bg-rose-50 border border-rose-200 p-4 flex items-start gap-3 text-rose-800 text-sm">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Unable to register</p>
                  <p className="text-rose-700 mt-0.5">{errorMsg}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-forest-900 mb-1.5">
                  Farmer Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Harish Patel"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-forest-200 text-forest-950 text-sm focus:outline-none focus:ring-2 focus:ring-leaf-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-forest-900 mb-1.5">
                  Mobile Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="+91 98124 56780"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-forest-200 text-forest-950 text-sm focus:outline-none focus:ring-2 focus:ring-leaf-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-forest-900 mb-1.5">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="farmer@agrisense.in"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-forest-200 text-forest-950 text-sm focus:outline-none focus:ring-2 focus:ring-leaf-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-forest-900 mb-1.5">
                  Primary Crop
                </label>
                <select
                  value={primaryCrop}
                  onChange={(e) => setPrimaryCrop(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-forest-200 text-forest-950 text-sm focus:outline-none focus:ring-2 focus:ring-leaf-500 bg-white"
                >
                  <option value="Wheat">Wheat (Rabi)</option>
                  <option value="Rice (Paddy)">Rice / Paddy (Kharif)</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Sugarcane">Sugarcane</option>
                  <option value="Mustard">Mustard</option>
                  <option value="Vegetables">Horticulture & Vegetables</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-forest-900 mb-1.5">State</label>
                <input
                  type="text"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="Haryana"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-forest-200 text-forest-950 text-sm focus:outline-none focus:ring-2 focus:ring-leaf-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-forest-900 mb-1.5">
                  District
                </label>
                <input
                  type="text"
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="Karnal"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-forest-200 text-forest-950 text-sm focus:outline-none focus:ring-2 focus:ring-leaf-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-forest-900 mb-1.5">
                  Village / Tehsil
                </label>
                <input
                  type="text"
                  required
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder="Taraori"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-forest-200 text-forest-950 text-sm focus:outline-none focus:ring-2 focus:ring-leaf-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-forest-900 mb-1.5">
                  Total Landholding (Acres)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={landArea}
                  onChange={(e) => setLandArea(e.target.value)}
                  placeholder="6.5"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-forest-200 text-forest-950 text-sm focus:outline-none focus:ring-2 focus:ring-leaf-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-forest-900 mb-1.5">
                  Password <span className="text-rose-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-forest-200 text-forest-950 text-sm focus:outline-none focus:ring-2 focus:ring-leaf-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-forest-900 mb-1.5">
                  Confirm Password <span className="text-rose-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-forest-200 text-forest-950 text-sm focus:outline-none focus:ring-2 focus:ring-leaf-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-forest-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-forest-600">
                Already registered?{' '}
                <Link to="/farmer/login" className="text-leaf-700 font-bold hover:underline">
                  Sign In to Farmer Portal
                </Link>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleInstantDemoFarmer}
                  className="px-4 py-2.5 rounded-xl border border-forest-200 hover:bg-forest-50 text-forest-800 text-xs font-semibold transition"
                >
                  Skip & Use Demo Farmer
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-forest-950 hover:bg-forest-900 text-white font-bold text-sm shadow-sm transition"
                >
                  <span>{isSubmitting ? 'Registering...' : 'Complete Farmer Registration'}</span>
                  <ArrowRight className="w-4 h-4 text-leaf-400" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-forest-600 border-t border-forest-100">
        © 2026 AgriPulse Agricultural Intelligence.
      </footer>
    </div>
  );
};
