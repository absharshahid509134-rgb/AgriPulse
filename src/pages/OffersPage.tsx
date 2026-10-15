import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Tag,
  Copy,
  Check,
  Sparkles,
  ShoppingBag,
  Percent,
  Truck,
  Gift,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { VALID_DEMO_PROMO_CODES } from '../data/seedProducts';
import { formatPaiseToINR } from '../utils/formatters';

export const OffersPage: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-forest-800 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2.5">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-emerald-100">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Seasonal AGRIPULSE Promotions & Savings
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            Special Agricultural Vouchers & Bundle Offers
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Tested coupons and demo promotional discounts designed for progressive farmers. Copy any voucher code and apply it directly on the checkout page to simulate instant price reductions.
          </p>
        </div>
      </div>

      {/* Free Shipping Strip */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Automatic Free Demo Shipping</h2>
            <p className="text-xs text-slate-600">
              Orders with cart subtotals of ₹999 or more automatically receive zero shipping charges across India.
            </p>
          </div>
        </div>
        <Link
          to="/store"
          className="text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-xl transition-colors shadow-xs"
        >
          Shop Now
        </Link>
      </div>

      {/* Vouchers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {VALID_DEMO_PROMO_CODES.map((promo) => (
          <div
            key={promo.code}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-black bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-lg">
                  <Percent className="w-3.5 h-3.5" />
                  {promo.discountPct}% DISCOUNT
                </span>
                <span className="text-[11px] font-semibold text-slate-400">Verified Demo Code</span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 mt-1">{promo.description}</h2>

              <div className="mt-3 space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <div className="flex items-center justify-between">
                  <span>Minimum Order Value:</span>
                  <strong className="text-slate-800">{formatPaiseToINR(promo.minSubtotalPaise)}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Maximum Discount Cap:</span>
                  <strong className="text-slate-800">{formatPaiseToINR(promo.maxDiscountPaise)}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Applicability:</span>
                  <strong className="text-emerald-700">All Agricultural Catalog Items</strong>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <code className="text-base font-black font-mono text-emerald-900 bg-emerald-100/70 border border-emerald-300 px-3 py-1.5 rounded-xl tracking-wider">
                  {promo.code}
                </code>
                <button
                  type="button"
                  onClick={() => handleCopyCode(promo.code)}
                  className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors"
                  title="Copy Coupon Code"
                >
                  {copiedCode === promo.code ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <Link
                to="/store"
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
              >
                Use in Store <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Transparency Note */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p>
          Demonstration Promotional Policy: All promotional discounts and coupon codes displayed on this page are simulated for testing the full farmer e-commerce journey. No real monetary transactions or banking charges occur.
        </p>
      </div>
    </div>
  );
};
