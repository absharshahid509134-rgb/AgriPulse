import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Truck,
  Tag,
  ShieldCheck,
  PackageCheck,
  CreditCard,
} from 'lucide-react';
import { useAgriPulse } from '../context/AgriPulseContext';
import { formatPaiseToINR } from '../utils/formatters';
import { ProductIllustration } from '../components/ProductIllustration';
import { VALID_DEMO_PROMO_CODES } from '../data/seedProducts';
import { DemoOrder } from '../types';

export const CartAndCheckoutPage: React.FC = () => {
  const {
    products,
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    calculateCartTotals,
    checkoutDraft,
    updateCheckoutDraft,
    placeDemoOrder,
  } = useAgriPulse();

  const navigate = useNavigate();

  const [promoInput, setPromoInput] = useState(checkoutDraft.promoCode || 'KISAN10');
  const [appliedPromo, setAppliedPromo] = useState(checkoutDraft.promoCode || 'KISAN10');
  const [promoFeedback, setPromoFeedback] = useState<string | null>(null);

  const [selectedPayment, setSelectedPayment] = useState<
    'Cash on Delivery (Demo)' | 'UPI (Demo Workflow)' | 'Online Gateway (Unavailable)'
  >('Cash on Delivery (Demo)');
  const [agreedDemoTerms, setAgreedDemoTerms] = useState(true);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<DemoOrder | null>(null);

  const cartLines = useMemo(() => {
    return cart
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return null;
        return {
          item,
          product,
          lineTotalPaise: Math.round(product.pricePaise) * Math.round(item.quantity),
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);
  }, [cart, products]);

  const totals = useMemo(
    () => calculateCartTotals(appliedPromo),
    [cart, products, appliedPromo]
  );

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (!code) {
      setAppliedPromo('');
      updateCheckoutDraft({ promoCode: '' });
      setPromoFeedback('Cleared promo code.');
      return;
    }

    const found = VALID_DEMO_PROMO_CODES.find((p) => p.code === code);
    if (!found) {
      setPromoFeedback(
        'Invalid demo promo code. Valid demo codes: KISAN10 (orders ≥ ₹500) or RABISEASON (orders ≥ ₹1,500).'
      );
      return;
    }
    if (totals.subtotalPaise < found.minSubtotalPaise) {
      setPromoFeedback(
        `Promo ${code} requires a minimum subtotal of ${formatPaiseToINR(found.minSubtotalPaise)}.`
      );
      return;
    }
    setAppliedPromo(code);
    updateCheckoutDraft({ promoCode: code });
    setPromoFeedback(`Applied ${code}: ${found.description}`);
  };

  const validateCheckoutForm = () => {
    const errs: Record<string, string> = {};
    if (!checkoutDraft.customerName.trim()) {
      errs.customerName = 'Customer name is required.';
    }
    const cleanPhone = checkoutDraft.mobileNumber.replace(/[\s-]/g, '');
    if (!/^(?:\+91)?[6-9][0-9]{9}$/.test(cleanPhone)) {
      errs.mobileNumber =
        'Please enter a valid 10-digit Indian mobile number (starting with 6–9).';
    }
    if (!checkoutDraft.deliveryAddress.trim() || checkoutDraft.deliveryAddress.trim().length < 5) {
      errs.deliveryAddress = 'Please enter a complete delivery address.';
    }
    if (!checkoutDraft.village.trim()) {
      errs.village = 'Village or locality is required.';
    }
    if (!checkoutDraft.district.trim()) {
      errs.district = 'District is required.';
    }
    if (!checkoutDraft.state.trim()) {
      errs.state = 'State is required.';
    }
    if (!/^[1-9][0-9]{5}$/.test(checkoutDraft.pinCode.trim())) {
      errs.pinCode = 'Please enter a valid 6-digit Indian PIN code (e.g., 132116).';
    }
    if (selectedPayment === 'Online Gateway (Unavailable)') {
      errs.payment =
        'Real online payment processing is not enabled in this demo environment. Please select Cash on Delivery (Demo) or UPI (Demo Workflow).';
    }
    if (!agreedDemoTerms) {
      errs.terms = 'Please acknowledge the demonstration order terms.';
    }
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleConfirmOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingOrder || cartLines.length === 0) return;
    if (!validateCheckoutForm()) return;

    setIsSubmittingOrder(true);
    try {
      await new Promise((r) => setTimeout(r, 420));
      const mode =
        selectedPayment === 'UPI (Demo Workflow)'
          ? 'UPI (Demo Workflow)'
          : 'Cash on Delivery (Demo)';
      const res = placeDemoOrder(mode, appliedPromo);
      if (res.ok && res.order) {
        setCompletedOrder(res.order);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setFormErrors({ submit: res.error || 'Could not place demo order.' });
      }
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  // --- COMPLETED DEMO ORDER CONFIRMATION SCREEN ---
  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl border-2 border-leaf-600 p-6 sm:p-8 shadow-md text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-leaf-100 text-leaf-700 flex items-center justify-center mx-auto">
            <PackageCheck className="w-8 h-8" />
          </div>
          <span className="inline-block text-xs font-bold uppercase px-3 py-1 rounded-full bg-amber-100 text-amber-950 border border-amber-300">
            Demonstration Order Confirmation — No Real Payment Collected
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900">
            Demo Order Placed Successfully!
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Your simulated order{' '}
            <code className="font-mono font-bold text-forest-900 bg-forest-50 px-2 py-0.5 rounded">
              {completedOrder.id}
            </code>{' '}
            has been saved to your browser&apos;s persistent demo order history. No real money was charged and no physical shipment was dispatched.
          </p>

          <div className="text-left bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs space-y-2">
            <div className="flex justify-between font-bold text-slate-900 pb-2 border-b border-slate-200">
              <span>Order ID: {completedOrder.id}</span>
              <span>Status: {completedOrder.orderStatus}</span>
            </div>
            <div className="space-y-1">
              {completedOrder.items.map((it) => (
                <div key={it.productId} className="flex justify-between text-slate-700">
                  <span>
                    {it.productName} × {it.quantity}
                  </span>
                  <span className="font-semibold">{formatPaiseToINR(it.lineTotalPaise)}</span>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between font-extrabold text-sm text-forest-950">
              <span>Total Demo Payable ({completedOrder.paymentMode})</span>
              <span>{formatPaiseToINR(completedOrder.totalPayablePaise)}</span>
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              Delivering to (Simulated): {completedOrder.deliveryDetails.customerName},{' '}
              {completedOrder.deliveryDetails.deliveryAddress},{' '}
              {completedOrder.deliveryDetails.village},{' '}
              {completedOrder.deliveryDetails.district},{' '}
              {completedOrder.deliveryDetails.state} — {completedOrder.deliveryDetails.pinCode}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/orders')}
              className="px-5 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-bold shadow-sm"
            >
              View Order in Orders History
            </button>
            <button
              type="button"
              onClick={() => navigate('/store')}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-bold"
            >
              Continue Shopping in Store
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- EMPTY CART STATE ---
  if (cartLines.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center max-w-2xl mx-auto space-y-4 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
          <ShoppingCart className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-extrabold text-slate-900">Your Shopping Cart is Empty</h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
          Browse our 24+ demonstration agricultural products—including seeds, water-soluble NPK, sticky traps, tensiometers, and drip irrigation kits—to test the cart and checkout workflow.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/store')}
            className="px-5 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-bold shadow-sm"
          >
            Browse Agricultural Store
          </button>
          <button
            type="button"
            onClick={() => navigate('/orders')}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold"
          >
            View Past Demo Orders
          </button>
        </div>
      </div>
    );
  }

  // --- ACTIVE CART & SIMULATED CHECKOUT WORKFLOW ---
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => navigate('/store')}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping in Store</span>
        </button>

        <button
          type="button"
          onClick={clearCart}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-red-700 hover:bg-red-50 border border-red-200"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Empty Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Cart Items & Delivery Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Cart Line Items */}
          <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">
                Shopping Cart Items ({totals.itemCount} unit{totals.itemCount > 1 ? 's' : ''})
              </h2>
              <span className="text-[11px] text-slate-500">
                Integer Paise Currency Calculation
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {cartLines.map(({ item, product, lineTotalPaise }) => (
                <div
                  key={product.id}
                  className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-20 shrink-0">
                      <ProductIllustration
                        svgType={product.imageSvgType}
                        category={product.category}
                        name={product.name}
                        className="h-20"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase text-forest-800">
                        {product.category}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {product.name}
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        {product.packSize} • Unit Price:{' '}
                        <strong>{formatPaiseToINR(product.pricePaise)}</strong>
                      </p>
                      <p className="text-[10px] text-slate-400">
                        Max available stock: {product.stockCount}
                      </p>
                    </div>
                  </div>

                  {/* Quantity & Line Total Controls */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                    <div className="inline-flex items-center rounded-xl border border-slate-300 bg-slate-50">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(product.id, item.quantity - 1)}
                        aria-label={`Decrease quantity of ${product.name}`}
                        className="p-2 text-slate-600 hover:text-slate-900"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(product.id, item.quantity + 1)}
                        disabled={item.quantity >= product.stockCount}
                        aria-label={`Increase quantity of ${product.name}`}
                        className="p-2 text-slate-600 hover:text-slate-900 disabled:opacity-40"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right min-w-[80px]">
                      <span className="text-sm font-extrabold text-slate-900 block">
                        {formatPaiseToINR(lineTotalPaise)}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        className="text-[11px] font-semibold text-red-600 hover:underline mt-0.5"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 2. Delivery Details Form */}
          <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">
                Simulated Delivery Details (Demo Checkout)
              </h2>
              <p className="text-xs text-slate-500">
                Collects only the fields required for the demonstration order receipt.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  value={checkoutDraft.customerName}
                  onChange={(e) => updateCheckoutDraft({ customerName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
                {formErrors.customerName && (
                  <p className="text-red-600 mt-1">{formErrors.customerName}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Mobile Number (10-digit Indian format) *
                </label>
                <input
                  type="tel"
                  value={checkoutDraft.mobileNumber}
                  onChange={(e) => updateCheckoutDraft({ mobileNumber: e.target.value })}
                  placeholder="9812456780"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
                {formErrors.mobileNumber && (
                  <p className="text-red-600 mt-1">{formErrors.mobileNumber}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">
                  Delivery Address *
                </label>
                <input
                  type="text"
                  value={checkoutDraft.deliveryAddress}
                  onChange={(e) => updateCheckoutDraft({ deliveryAddress: e.target.value })}
                  placeholder="Farm / House landmark, Road"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
                {formErrors.deliveryAddress && (
                  <p className="text-red-600 mt-1">{formErrors.deliveryAddress}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Village or Locality *
                </label>
                <input
                  type="text"
                  value={checkoutDraft.village}
                  onChange={(e) => updateCheckoutDraft({ village: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
                {formErrors.village && (
                  <p className="text-red-600 mt-1">{formErrors.village}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">District *</label>
                <input
                  type="text"
                  value={checkoutDraft.district}
                  onChange={(e) => updateCheckoutDraft({ district: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
                {formErrors.district && (
                  <p className="text-red-600 mt-1">{formErrors.district}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">State *</label>
                <input
                  type="text"
                  value={checkoutDraft.state}
                  onChange={(e) => updateCheckoutDraft({ state: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
                {formErrors.state && <p className="text-red-600 mt-1">{formErrors.state}</p>}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Postal PIN Code (6 digits) *
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={checkoutDraft.pinCode}
                  onChange={(e) => updateCheckoutDraft({ pinCode: e.target.value })}
                  placeholder="132116"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
                {formErrors.pinCode && (
                  <p className="text-red-600 mt-1">{formErrors.pinCode}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">
                  Delivery Instructions (Optional)
                </label>
                <input
                  type="text"
                  value={checkoutDraft.deliveryInstructions}
                  onChange={(e) =>
                    updateCheckoutDraft({ deliveryInstructions: e.target.value })
                  }
                  placeholder="Optional landmark notes..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right: Order Review, Promo Code & Simulated Payment Selection (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              Final Order Review & Totals
            </h2>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                Demo Promotion Code (Try <code>KISAN10</code> or <code>RABISEASON</code>)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Enter KISAN10"
                  className="flex-1 px-3 py-2 text-xs font-mono uppercase rounded-xl border border-slate-300"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-forest-50 hover:bg-forest-100 text-forest-900 border border-forest-200 text-xs font-bold"
                >
                  Apply
                </button>
              </div>
              {promoFeedback && (
                <p className="text-[11px] text-forest-800 font-medium">{promoFeedback}</p>
              )}
            </form>

            {/* Price Breakdown in INR (computed from integer paise) */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-700">
                <span>Items Subtotal ({totals.itemCount} units)</span>
                <span className="font-bold text-slate-900">
                  {formatPaiseToINR(totals.subtotalPaise)}
                </span>
              </div>

              <div className="flex justify-between text-slate-700">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-forest-700" />
                  <span>Demo Shipping Rule (Free ≥ ₹999)</span>
                </span>
                <span className="font-bold text-slate-900">
                  {totals.shippingPaise === 0
                    ? 'FREE (₹0)'
                    : formatPaiseToINR(totals.shippingPaise)}
                </span>
              </div>

              {totals.discountPaise > 0 && (
                <div className="flex justify-between text-leaf-800 font-semibold">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Demo Promo Discount ({appliedPromo})</span>
                  </span>
                  <span>-{formatPaiseToINR(totals.discountPaise)}</span>
                </div>
              )}

              <div className="pt-2.5 border-t border-slate-200 flex justify-between items-baseline text-sm font-extrabold text-forest-950">
                <span>Final Payable Amount (Demo)</span>
                <span className="text-lg">{formatPaiseToINR(totals.totalPayablePaise)}</span>
              </div>
            </div>

            {/* Simulated Payment Choices */}
            <div className="space-y-2.5 text-xs">
              <span className="block font-bold text-slate-800">
                Select Simulated Payment Method
              </span>

              <label
                className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer ${
                  selectedPayment === 'Cash on Delivery (Demo)'
                    ? 'bg-forest-50 border-forest-700'
                    : 'bg-white border-slate-200'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMode"
                  checked={selectedPayment === 'Cash on Delivery (Demo)'}
                  onChange={() => setSelectedPayment('Cash on Delivery (Demo)')}
                  className="mt-0.5 text-forest-800"
                />
                <div>
                  <span className="font-bold text-slate-900 block">
                    Cash on Delivery — Demo Workflow
                  </span>
                  <span className="text-[11px] text-slate-600">
                    Places a demonstration order with status &ldquo;Demo Pending on Delivery&rdquo;.
                  </span>
                </div>
              </label>

              <label
                className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer ${
                  selectedPayment === 'UPI (Demo Workflow)'
                    ? 'bg-forest-50 border-forest-700'
                    : 'bg-white border-slate-200'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMode"
                  checked={selectedPayment === 'UPI (Demo Workflow)'}
                  onChange={() => setSelectedPayment('UPI (Demo Workflow)')}
                  className="mt-0.5 text-forest-800"
                />
                <div>
                  <span className="font-bold text-slate-900 block">
                    UPI — Demo Workflow (No Real Charge or UPI PIN Requested)
                  </span>
                  <span className="text-[11px] text-slate-600">
                    Simulates a UPI checkout confirmation without collecting any real payment credentials.
                  </span>
                </div>
              </label>

              <label
                className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer ${
                  selectedPayment === 'Online Gateway (Unavailable)'
                    ? 'bg-amber-50 border-amber-500'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMode"
                  checked={selectedPayment === 'Online Gateway (Unavailable)'}
                  onChange={() => setSelectedPayment('Online Gateway (Unavailable)')}
                  className="mt-0.5 text-amber-700"
                />
                <div>
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-slate-500" />
                    <span>Online Payment — Unavailable (Gateway Not Configured)</span>
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Real card/net-banking processing is disabled until an authorized payment gateway is configured.
                  </span>
                </div>
              </label>

              {formErrors.payment && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 font-semibold flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>{formErrors.payment}</span>
                </div>
              )}
            </div>

            {/* Demo Order Terms Checkbox */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedDemoTerms}
                  onChange={(e) => setAgreedDemoTerms(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-forest-800"
                />
                <span className="text-[11px] text-slate-700 leading-relaxed">
                  <strong>Demo Order Terms:</strong> I understand this is a simulated demonstration checkout. No real payment is collected, no card/UPI credentials are asked, and no physical shipment is created.
                </span>
              </label>
              {formErrors.terms && (
                <p className="text-red-600 mt-1 font-semibold">{formErrors.terms}</p>
              )}
            </div>

            <button
              type="button"
              disabled={isSubmittingOrder}
              onClick={(e) => void handleConfirmOrder(e)}
              className="w-full py-3.5 px-4 rounded-xl bg-forest-800 hover:bg-forest-900 disabled:bg-slate-400 text-white text-sm font-extrabold shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-leaf-300" />
              <span>
                {isSubmittingOrder
                  ? 'Confirming Demo Order...'
                  : `Confirm Demo Order (${formatPaiseToINR(totals.totalPayablePaise)})`}
              </span>
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};
