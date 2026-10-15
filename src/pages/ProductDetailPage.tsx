import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Copy,
  ExternalLink,
  Heart,
  HelpCircle,
  Info,
  MapPin,
  Maximize2,
  Minus,
  Package,
  Plus,
  RotateCcw,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Tag,
  Truck,
  X,
  Zap,
} from 'lucide-react';
import { useAgriPulse } from '../context/AgriPulseContext';
import { ProductIllustration } from '../components/ProductIllustration';
import { formatPaiseToINR } from '../utils/formatters';
import { StoreProduct } from '../types';

export const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const {
    products,
    cart,
    addToCart,
    wishlist,
    toggleWishlist,
    recordProductView,
    addStoreProductReview,
  } = useAgriPulse();

  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [pinCodeInput, setPinCodeInput] = useState('');
  const [pinCodeChecked, setPinCodeChecked] = useState(false);
  const [pinCodeError, setPinCodeError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [cartSuccessFeedback, setCartSuccessFeedback] = useState<string | null>(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);

  // Review submission state
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    userName: '',
    rating: 5,
    title: '',
    comment: '',
  });
  const [reviewSubmittedSuccess, setReviewSubmittedSuccess] = useState(false);

  // Find product by id or fallback to slug
  const product: StoreProduct | undefined = useMemo(() => {
    if (!productId) return undefined;
    return products.find((p) => p.id === productId || p.slug === productId);
  }, [products, productId]);

  useEffect(() => {
    if (product) {
      recordProductView(product.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [product?.id]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-4">
          <Package className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Product Not Found</h1>
        <p className="text-slate-600 mb-6">
          The requested agricultural item does not exist in the current AGRIPULSE demo catalog or has been moved.
        </p>
        <Link
          to="/store"
          className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Agricultural Store
        </Link>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const cartItem = cart.find((i) => i.productId === product.id);
  const currentCartQty = cartItem ? cartItem.quantity : 0;
  const availableRemainingStock = Math.max(0, product.stockCount - currentCartQty);

  // Calculations
  const discountPaise = Math.max(0, product.mrpPaise - product.pricePaise);
  const discountPct =
    product.mrpPaise > 0 ? Math.round((discountPaise / product.mrpPaise) * 100) : 0;

  // Similar products
  const similarProducts = products
    .filter(
      (p) =>
        p.id !== product.id &&
        (product.relatedProductIds?.includes(p.id) ||
          p.category === product.category ||
          p.seasonTag === product.seasonTag)
    )
    .slice(0, 4);

  const handleAddToCart = () => {
    const res = addToCart(product.id, selectedQuantity);
    if (res.ok) {
      setCartSuccessFeedback(`Added ${selectedQuantity} unit(s) of ${product.name} to cart.`);
      setTimeout(() => setCartSuccessFeedback(null), 3500);
    }
  };

  const handleBuyNow = () => {
    addToCart(product.id, selectedQuantity);
    navigate('/cart');
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.userName.trim() || !reviewForm.title.trim() || !reviewForm.comment.trim()) {
      return;
    }
    addStoreProductReview(product.id, {
      userName: reviewForm.userName.trim(),
      rating: reviewForm.rating,
      title: reviewForm.title.trim(),
      comment: reviewForm.comment.trim(),
    });
    setReviewSubmittedSuccess(true);
    setTimeout(() => {
      setReviewSubmittedSuccess(false);
      setIsReviewModalOpen(false);
      setReviewForm({ userName: '', rating: 5, title: '', comment: '' });
    }, 1800);
  };

  const galleryItems = product.gallery && product.gallery.length > 0
    ? product.gallery
    : ['Main Front View', 'Packaging & FCO Label', 'Batch & Analytical Spec', 'Field Application Guide'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* SECTION A: BREADCRUMBS */}
      <nav className="flex items-center text-xs text-slate-500 gap-1.5 flex-wrap">
        <Link to="/home" className="hover:text-emerald-700 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <Link to="/store" className="hover:text-emerald-700 transition-colors">
          Agricultural Store
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span className="text-slate-600 font-medium">{product.category}</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span className="text-slate-900 font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      <div className="demo-workspace-banner" role="status">
        <Info className="demo-workspace-icon" aria-hidden="true" />
        <p><strong>Sample catalog entry — not a live product offer.</strong> Product identity, brand, certifications, stock, price, reviews, delivery, seller, warranty, and support details are illustrative and unverified. Cart and checkout actions are local simulations only.</p>
      </div>

      {/* SUCCESS NOTIFICATION TOAST */}
      {cartSuccessFeedback && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl flex items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-sm font-medium">{cartSuccessFeedback}</span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/cart"
              className="text-xs font-bold underline text-emerald-800 hover:text-emerald-950 px-2 py-1"
            >
              View Cart & Checkout
            </Link>
            <button
              onClick={() => setCartSuccessFeedback(null)}
              className="text-emerald-700 hover:text-emerald-950"
              aria-label="Dismiss message"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* SECTION B: MAIN PRODUCT HERO (GALLERY ON LEFT, BUY BOX ON RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Gallery (col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm group">
            {/* Badges */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
              {discountPct > 0 && (
                <span className="bg-rose-600 text-white text-[11px] font-black uppercase px-2.5 py-1 rounded-md shadow-sm">
                  {discountPct}% OFF
                </span>
              )}
              {product.demoOfferLabel && (
                <span className="bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                  {product.demoOfferLabel}
                </span>
              )}
            </div>

            {/* Zoom / Fullscreen Button */}
            <button
              onClick={() => setIsZoomModalOpen(true)}
              className="absolute top-3 right-3 z-10 p-2 bg-white/90 hover:bg-white text-slate-700 rounded-lg shadow-sm border border-slate-200 transition-all opacity-80 group-hover:opacity-100"
              title="Click to Enlarge / View Full Details"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Main Image Illustration */}
            <div className="p-6 flex flex-col items-center justify-center min-h-[340px] sm:min-h-[380px]">
              <ProductIllustration
                svgType={product.imageSvgType}
                category={product.category}
                name={product.name}
                className="w-full h-64 sm:h-72 object-contain"
              />
              <div className="mt-3 text-center">
                <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                  {galleryItems[selectedGalleryIdx] || 'Main Product View'}
                </span>
              </div>
            </div>
          </div>

          {/* Thumbnail Gallery Selectors */}
          <div className="grid grid-cols-4 gap-2.5">
            {galleryItems.map((itemLabel, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedGalleryIdx(idx)}
                className={`p-2 rounded-xl border text-left flex flex-col justify-between transition-all h-20 ${
                  selectedGalleryIdx === idx
                    ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-600/30 font-medium'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] font-bold text-slate-400">0{idx + 1}</span>
                  {selectedGalleryIdx === idx && (
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  )}
                </div>
                <span className="text-[10px] leading-tight font-medium line-clamp-2">
                  {itemLabel}
                </span>
              </button>
            ))}
          </div>

          {/* Assurance strip */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-50 border border-slate-100">
              <ShieldCheck className="w-5 h-5 text-emerald-700 mb-1" />
              <span className="text-[11px] font-semibold text-slate-800">Demo listing</span>
              <span className="text-[10px] text-slate-500">Not verified</span>
            </div>
            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-50 border border-slate-100">
              <Truck className="w-5 h-5 text-emerald-700 mb-1" />
              <span className="text-[11px] font-semibold text-slate-800">Delivery preview</span>
              <span className="text-[10px] text-slate-500">Carrier not connected</span>
            </div>
            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-50 border border-slate-100">
              <RotateCcw className="w-5 h-5 text-emerald-700 mb-1" />
              <span className="text-[11px] font-semibold text-slate-800">Policy preview</span>
              <span className="text-[10px] text-slate-500">No active guarantee</span>
            </div>
          </div>
        </div>

        {/* Right Info & Actions (col-span-7) */}
        <div className="lg:col-span-7 space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          {/* Header Row */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                {product.brand}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                  title="Share or Copy Link"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    isWishlisted
                      ? 'border-rose-300 bg-rose-50 text-rose-600'
                      : 'border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-slate-50'
                  }`}
                  title={isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mt-2 text-xs text-slate-500 flex-wrap">
              <span>SKU: <strong className="text-slate-700 font-mono">{product.sku || `AGRI-${product.id}`}</strong></span>
              <span>•</span>
              <span>Pack: <strong className="text-slate-700">{product.packSize}</strong></span>
              <span>•</span>
              {/* Rating */}
              <div className="flex items-center gap-1 text-amber-500 font-semibold">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{product.rating || 4.7}</span>
                <span className="text-slate-400 font-normal">({product.reviewCount || 38} demo reviews)</span>
              </div>
            </div>
          </div>

          {/* Pricing Block */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {formatPaiseToINR(product.pricePaise)}
              </span>
              {product.mrpPaise > product.pricePaise && (
                <>
                  <span className="text-base text-slate-400 line-through">
                    {formatPaiseToINR(product.mrpPaise)}
                  </span>
                  <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                    Save {formatPaiseToINR(discountPaise)} ({discountPct}% off)
                  </span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
              <span>Indicative demo price; tax treatment is not verified</span>
              <span>•</span>
              <span className="text-emerald-700 font-medium">Free Demo Shipping on orders above ₹999</span>
            </div>
          </div>

          {/* Stock & Availability */}
          <div className="flex items-center justify-between text-xs py-1 border-b border-slate-100">
            <span className="text-slate-500">Availability:</span>
            <div className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  product.stockCount > 0 ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
              />
              <span
                className={`font-semibold ${
                  product.stockCount > 0 ? 'text-emerald-800' : 'text-rose-700'
                }`}
              >
                {product.availability} ({product.stockCount} units available)
              </span>
            </div>
          </div>

          {/* Quantity Selector & Purchase Actions */}
          <div className="space-y-4 pt-1">
            <div className="flex items-center gap-4">
              <span className="text-xs font-medium text-slate-700">Quantity:</span>
              <div className="inline-flex items-center border border-slate-300 rounded-xl bg-white shadow-sm overflow-hidden">
                <button
                  type="button"
                  onClick={() => setSelectedQuantity((q) => Math.max(1, q - 1))}
                  disabled={selectedQuantity <= 1}
                  className="p-2 text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-12 text-center text-sm font-bold text-slate-800">
                  {selectedQuantity}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedQuantity((q) => Math.min(product.stockCount, q + 1))
                  }
                  disabled={selectedQuantity >= product.stockCount}
                  className="p-2 text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-xs text-slate-400">
                Total:{' '}
                <strong className="text-slate-700">
                  {formatPaiseToINR(product.pricePaise * selectedQuantity)}
                </strong>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stockCount <= 0}
                className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white font-semibold py-3 px-5 rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-emerald-600"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={product.stockCount <= 0}
                className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 disabled:bg-slate-300 text-white font-semibold py-3 px-5 rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-amber-500"
              >
                <Zap className="w-4 h-4" />
                Buy Now
              </button>
            </div>
          </div>

          {/* Delivery & PIN Code Estimate Checker */}
          <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200 text-xs space-y-2">
            <div className="flex items-center gap-2 text-slate-700 font-semibold">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>Check a sample delivery estimate (not carrier-confirmed):</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={pinCodeInput}
                onChange={(e) => {
                  setPinCodeInput(e.target.value.replace(/\D/g, '').slice(0, 6));
                  setPinCodeChecked(false);
                  setPinCodeError(null);
                }}
                maxLength={6}
                inputMode="numeric"
                aria-label="Six-digit delivery PIN for a sample estimate"
                placeholder="6-digit PIN"
                className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-mono focus:outline-none focus:ring-1 focus:ring-emerald-600 w-36"
              />
              <button
                type="button"
                onClick={() => {
                  if (!/^\d{6}$/.test(pinCodeInput)) {
                    setPinCodeError('Enter a six-digit PIN to view the illustrative estimate. No carrier check is performed.');
                    setPinCodeChecked(false);
                    return;
                  }
                  setPinCodeError(null);
                  setPinCodeChecked(true);
                }}
                className="bg-slate-800 hover:bg-slate-900 text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
              >
                Check
              </button>
            </div>
            {pinCodeError && <p role="alert" className="text-rose-700 text-[11px]">{pinCodeError}</p>}
            {pinCodeChecked && (
              <p role="status" className="text-amber-900 font-medium text-[11px] flex items-center gap-1.5 pt-0.5">
                <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                Illustrative estimate for PIN {pinCodeInput}: {product.shippingEstimateDays}. Not confirmed with a carrier.
              </p>
            )}
          </div>

          {/* Demo Active Promotions in Buy Box */}
          <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-amber-900 font-semibold">
              <Tag className="w-3.5 h-3.5 text-amber-700" />
              <span>Available Demo Promotional Vouchers:</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="font-mono bg-white border border-amber-300 px-2 py-0.5 rounded text-amber-900 font-bold">
                KISAN10
              </span>
              <span className="font-mono bg-white border border-amber-300 px-2 py-0.5 rounded text-amber-900 font-bold">
                HARVEST15
              </span>
              <span className="font-mono bg-white border border-amber-300 px-2 py-0.5 rounded text-amber-900 font-bold">
                AGRI500
              </span>
            </div>
            <p className="text-[11px] text-amber-800">
              Apply coupon codes on the checkout page to simulate instant demo discounts.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION C: PRODUCT HIGHLIGHTS */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Sparkles className="w-5 h-5 text-emerald-700" />
          <h2 className="text-lg font-bold text-slate-900">Key Product Highlights</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {(product.highlights || [
            'Tested under national agricultural quality benchmarks',
            'Tailored for Indian soil types and farming conditions',
            'Direct doorstep farm delivery across registered pin codes',
            'Backed by official manufacturer technical support',
          ]).map((highlight, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100/80"
            >
              <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                ✓
              </div>
              <p className="text-sm font-medium text-slate-800 leading-snug">{highlight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION D: DETAILED AGRONOMIC DESCRIPTION */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
          Detailed Description & Field Guidance
        </h2>
        <div className="prose prose-sm max-w-none text-slate-700 space-y-3 leading-relaxed">
          <p className="text-base text-slate-800 font-medium">{product.shortDescription}</p>
          <p>{product.detailedDescription}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                Recommended Application Instructions
              </h3>
              <p className="text-xs text-slate-600 leading-normal">{product.usageInstructions}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-700" />
                Safe Storage & Handling Protocol
              </h3>
              <p className="text-xs text-slate-600 leading-normal">{product.storageInstructions}</p>
            </div>
          </div>

          {product.safetyOrLegalNote && (
            <p className="text-xs text-amber-800 bg-amber-50 p-3 rounded-lg border border-amber-200">
              <strong>Notice:</strong> {product.safetyOrLegalNote}
            </p>
          )}
        </div>
      </div>

      {/* SECTION E: TECHNICAL SPECIFICATIONS TABLE */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
          Technical Specifications
        </h2>
        <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200 text-xs sm:text-sm">
          {(product.specifications || []).map((spec, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-1 sm:grid-cols-3 p-3.5 ${
                idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'
              }`}
            >
              <span className="font-semibold text-slate-700">{spec.label}</span>
              <span className="sm:col-span-2 text-slate-900">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION F & G: MANUFACTURER, SELLER & WARRANTY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Manufacturer & Seller Information */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3.5 text-xs sm:text-sm">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2.5">
            Sample Manufacturer & Seller Details
          </h2>
          <div className="space-y-2 text-slate-700">
            <div>
              <span className="text-slate-500 font-medium">Manufacturer: </span>
              <strong className="text-slate-900">{product.isDemoSeller ? `${product.brand} (sample, not verified)` : product.manufacturer?.name || product.brand}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Country of Origin (sample): </span>
              <span className="text-slate-900">{product.isDemoSeller ? 'Not verified in this demo' : product.manufacturer?.originCountry || 'Not provided'}</span>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Facility Address: </span>
              <span className="text-slate-600">{product.isDemoSeller ? 'Not provided in this demo' : product.manufacturer?.address || 'Not provided'}</span>
            </div>
            <div className="pt-2 border-t border-slate-100">
              <span className="text-slate-500 font-medium">Marketplace Seller: </span>
              <strong className="text-emerald-800">{product.isDemoSeller ? `${product.sellerName} (demo record)` : product.seller?.name || product.sellerName}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Return Policy: </span>
              <span className="text-slate-700">{product.isDemoSeller ? 'Illustrative only; no active return policy' : product.seller?.returnPolicy || 'Not provided'}</span>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Support Contact: </span>
              <span className="text-slate-600">{product.isDemoSeller ? 'Not connected in this prototype' : product.manufacturer?.supportContact || 'Not provided'}</span>
            </div>
          </div>
        </div>

        {/* Warranty & Service */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3.5 text-xs sm:text-sm">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2.5">
            Illustrative Warranty Information
          </h2>
          <div className="space-y-2 text-slate-700">
            <div>
              <span className="text-slate-500 font-medium">Warranty Period: </span>
              <strong className="text-slate-900">
                {product.isDemoSeller ? 'Not configured' : product.warranty?.durationMonths ? `${product.warranty.durationMonths} Months` : 'Not provided'}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Warranty Type: </span>
              <span className="text-slate-900">{product.isDemoSeller ? 'Sample data only' : product.warranty?.warrantyType || 'Not provided'}</span>
            </div>
            <div>
              <span className="text-slate-500 font-medium">What is Covered: </span>
              <p className="text-slate-600 mt-0.5">{product.isDemoSeller ? 'No warranty or quality guarantee is active in this demo.' : product.warranty?.coverage || 'Not provided'}</p>
            </div>
            <div className="pt-2 border-t border-slate-100">
              <span className="text-slate-500 font-medium">Claim Procedure: </span>
              <p className="text-slate-600 mt-0.5">{product.isDemoSeller ? 'No support service is connected in this prototype.' : product.warranty?.claimProcedure || 'Not provided'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION I: RATINGS & CUSTOMER REVIEWS (WITH WRITE REVIEW MODAL) */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 flex-wrap gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Sample Ratings & Demo Reviews</h2>
            <p className="text-xs text-slate-500">Sample review content for interface preview; no purchase history is connected.</p>
          </div>
          <button
            type="button"
            onClick={() => setIsReviewModalOpen(true)}
            className="text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl transition-colors shadow-sm"
          >
            Write a Review (Demo)
          </button>
        </div>

        {/* Rating Summary Bar */}
        <div className="flex items-center gap-8 p-4 bg-slate-50 rounded-xl border border-slate-200 flex-wrap">
          <div className="text-center">
            <span className="text-4xl font-extrabold text-slate-900">{product.rating || 4.7}</span>
            <div className="flex text-amber-500 justify-center my-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-xs text-slate-500">Sample count: {product.reviewCount || 38} (demo)</span>
          </div>

          <div className="flex-1 min-w-[200px] space-y-1.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-10 text-slate-600">5 star</span>
              <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full w-[78%]" />
              </div>
              <span className="w-8 text-right text-slate-500">78%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-10 text-slate-600">4 star</span>
              <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[16%]" />
              </div>
              <span className="w-8 text-right text-slate-500">16%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-10 text-slate-600">3 star</span>
              <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full w-[4%]" />
              </div>
              <span className="w-8 text-right text-slate-500">4%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-10 text-slate-600">1-2 star</span>
              <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-rose-400 h-full w-[2%]" />
              </div>
              <span className="w-8 text-right text-slate-500">2%</span>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {(product.reviews || []).map((rev) => (
            <div key={rev.id} className="p-4 rounded-xl border border-slate-100 bg-white shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <strong className="text-sm font-bold text-slate-800">{rev.title}</strong>
                </div>
                <span className="text-[11px] text-slate-400">{rev.date}</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">{rev.comment}</p>
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700">{rev.userName}</span>
                {rev.verifiedPurchase && !product.isDemoSeller && (
                  <span className="text-emerald-700 flex items-center gap-0.5 font-medium">
                    <CheckCircle2 className="w-3 h-3" /> Verified Purchase
                  </span>
                )}
                {product.isDemoSeller && <span className="text-slate-500 font-medium">Sample demo review · not verified</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION J: PRODUCT FAQS ACCORDION */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <HelpCircle className="w-5 h-5 text-emerald-700" />
          <h2 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-2.5">
          {(product.faqs || []).map((faq, idx) => {
            const isExpanded = expandedFaqIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaqIndex(isExpanded ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between font-semibold text-sm text-slate-800 hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isExpanded ? 'rotate-180 text-emerald-700' : ''
                    }`}
                  />
                </button>
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-600 border-t border-slate-100 bg-slate-50/50 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION K: SIMILAR PRODUCTS */}
      {similarProducts.length > 0 && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Similar Products You May Need</h2>
              <p className="text-xs text-slate-500">Related agricultural supplies for your farm setup</p>
            </div>
            <Link
              to="/store"
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
            >
              Browse All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {similarProducts.map((sim) => (
              <div
                key={sim.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                <div>
                  <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-center mb-3">
                    <ProductIllustration
                      svgType={sim.imageSvgType}
                      category={sim.category}
                      name={sim.name}
                      className="h-28 w-full object-contain"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                    {sim.category}
                  </span>
                  <Link
                    to={`/store/product/${sim.id}`}
                    className="block text-sm font-bold text-slate-900 hover:text-emerald-700 line-clamp-2 mt-1 leading-snug"
                  >
                    {sim.name}
                  </Link>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-1">{sim.packSize}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between">
                  <div>
                    <span className="text-base font-bold text-slate-900">
                      {formatPaiseToINR(sim.pricePaise)}
                    </span>
                    {sim.mrpPaise > sim.pricePaise && (
                      <span className="text-[11px] text-slate-400 line-through block">
                        {formatPaiseToINR(sim.mrpPaise)}
                      </span>
                    )}
                  </div>
                  <Link
                    to={`/store/product/${sim.id}`}
                    className="text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-lg transition-colors border border-emerald-200"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WRITE A REVIEW MODAL */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Write a Demo Product Review</h3>
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {reviewSubmittedSuccess ? (
              <div className="py-8 text-center text-emerald-800 space-y-2">
                <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-600 animate-bounce" />
                <h4 className="text-base font-bold">Demo review saved</h4>
                <p className="text-xs text-slate-600">Saved only in your account workspace; it is not verified or published to a live marketplace.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-3.5 text-xs sm:text-sm">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Demo display name *</label>
                  <span className="text-[11px] text-slate-500">Use a fictional display name; this unverified draft is saved only to your account workspace.</span>
                  <input
                    type="text"
                    required
                    value={reviewForm.userName}
                    onChange={(e) => setReviewForm({ ...reviewForm, userName: e.target.value })}
                    placeholder="e.g. Demo Farmer"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Rating *</label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= reviewForm.rating
                              ? 'text-amber-400 fill-current'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-700 ml-2">
                      {reviewForm.rating} of 5 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Review Headline *</label>
                  <input
                    type="text"
                    required
                    value={reviewForm.title}
                    onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                    placeholder="e.g. Excellent crop germination in Taraori black soil"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Detailed Farmer Experience *</label>
                  <textarea
                    required
                    rows={3}
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    placeholder="Describe how the input performed, crop stage, soil moisture, or farm results..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(false)}
                    className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold shadow-sm"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* FULLSCREEN ZOOM MODAL */}
      {isZoomModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 relative">
            <button
              onClick={() => setIsZoomModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-900 bg-slate-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-bold text-slate-900">{product.name}</h3>
            <p className="text-xs text-slate-500">{galleryItems[selectedGalleryIdx]}</p>
            <div className="flex items-center justify-center p-8 bg-slate-50 rounded-xl border border-slate-200">
              <ProductIllustration
                svgType={product.imageSvgType}
                category={product.category}
                name={product.name}
                className="w-full h-80 object-contain"
              />
            </div>
            <div className="text-center">
              <button
                onClick={() => setIsZoomModalOpen(false)}
                className="bg-slate-800 text-white px-5 py-2 rounded-xl text-xs font-semibold"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
