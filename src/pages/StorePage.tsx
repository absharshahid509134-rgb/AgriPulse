import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ShoppingBag,
  Search,
  ShoppingCart,
  Heart,
  Filter,
  LayoutGrid,
  List,
  CheckCircle2,
  Sparkles,
  Tag,
  Truck,
  Package,
  ArrowLeft,
  Plus,
  Minus,
  X,
  Sprout,
  Clock,
} from 'lucide-react';
import { useAgriPulse } from '../context/AgriPulseContext';
import { ProductCategory, StoreProduct } from '../types';
import { formatPaiseToINR } from '../utils/formatters';
import { ProductIllustration } from '../components/ProductIllustration';
import { VALID_DEMO_PROMO_CODES } from '../data/seedProducts';

const ALL_CATEGORIES: ('All' | ProductCategory)[] = [
  'All',
  'Seeds and planting material',
  'Fertilizers and soil nutrients',
  'Crop protection products',
  'Organic farming inputs',
  'Soil testing and farm-monitoring kits',
  'Irrigation equipment',
  'Sprayers and farm tools',
  'Hand tools and accessories',
  'Farm safety equipment',
  'Harvesting and storage supplies',
];

const CROP_COMPATIBILITY_OPTIONS = [
  'All Crops',
  'Wheat',
  'Rice (Paddy)',
  'Tomato',
  'Mustard (Sarson)',
  'Chickpea (Chana)',
  'Cotton',
  'Vegetables',
  'Sugarcane',
];

export const StorePage: React.FC = () => {
  const {
    products,
    cart,
    addToCart,
    wishlist,
    toggleWishlist,
    recentProducts,
    recordProductView,
    crops,
    profile,
    calculateCartTotals,
  } = useAgriPulse();

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters & Sorting state
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProductCategory>('All');
  const [selectedCropFilter, setSelectedCropFilter] = useState<string>('All Crops');
  const [maxPriceRupees, setMaxPriceRupees] = useState<number>(3000);
  const [availabilityOnly, setAvailabilityOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'name-asc'>(
    'relevance'
  );
  const [viewLayout, setViewLayout] = useState<'grid' | 'list'>('grid');
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);

  // Selected Product Detail View
  const [activeProduct, setActiveProduct] = useState<StoreProduct | null>(null);
  const [detailQty, setDetailQty] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const qParam = searchParams.get('q');
    if (qParam) setSearchQuery(qParam);
  }, [searchParams]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const cartTotals = useMemo(() => calculateCartTotals(), [cart, products]);

  // Farmer's active crops for personalized recommendations
  const farmerCropNames = useMemo(() => {
    const names = crops.map((c) => c.cropName);
    if (names.length === 0) return [profile.preferences.defaultCrop || 'Wheat'];
    return Array.from(new Set(names));
  }, [crops, profile.preferences.defaultCrop]);

  // Filtered & Sorted Catalog
  const filteredProducts = useMemo(() => {
    const list = products.filter((p) => {
      if (showWishlistOnly && !wishlist.includes(p.id)) return false;
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (
        selectedCropFilter !== 'All Crops' &&
        !p.compatibleCrops.some(
          (c) => c.toLowerCase() === selectedCropFilter.toLowerCase()
        )
      ) {
        return false;
      }
      if (p.pricePaise > maxPriceRupees * 100) return false;
      if (availabilityOnly && p.availability !== 'In Stock') return false;

      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const hay = `${p.name} ${p.category} ${p.brand} ${p.shortDescription} ${p.compatibleCrops.join(
          ' '
        )}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.pricePaise - b.pricePaise);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.pricePaise - a.pricePaise);
    } else if (sortBy === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Relevance: Featured & Popular first
      list.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    }
    return list;
  }, [
    products,
    showWishlistOnly,
    wishlist,
    selectedCategory,
    selectedCropFilter,
    maxPriceRupees,
    availabilityOnly,
    searchQuery,
    sortBy,
  ]);

  const recommendedForCrops = useMemo(() => {
    return products
      .filter((p) =>
        p.compatibleCrops.some((cropTag) =>
          farmerCropNames.some((fc) =>
            fc.toLowerCase().includes(cropTag.toLowerCase().split(' ')[0])
          )
        )
      )
      .slice(0, 4);
  }, [products, farmerCropNames]);

  const recentlyViewedList = useMemo(() => {
    return recentProducts
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is StoreProduct => Boolean(p))
      .slice(0, 4);
  }, [recentProducts, products]);

  const openProductDetail = (prod: StoreProduct) => {
    recordProductView(prod.id);
    navigate(`/store/product/${prod.id}`);
  };

  const handleAddToCartClick = (prod: StoreProduct, qty = 1) => {
    const res = addToCart(prod.id, qty);
    triggerToast(res.message);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedCropFilter('All Crops');
    setMaxPriceRupees(3000);
    setAvailabilityOnly(false);
    setSortBy('relevance');
    setShowWishlistOnly(false);
    if (searchParams.has('q')) setSearchParams({});
  };

  // --- PRODUCT DETAILS PAGE VIEW ---
  if (activeProduct) {
    const similarProducts = products
      .filter(
        (p) => p.id !== activeProduct.id && p.category === activeProduct.category
      )
      .slice(0, 3);

    const isWishlisted = wishlist.includes(activeProduct.id);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setActiveProduct(null)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Store Catalog</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/cart')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-bold shadow-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>
              Cart ({cartTotals.itemCount}) • {formatPaiseToINR(cartTotals.subtotalPaise)}
            </span>
          </button>
        </div>

        {toastMessage && (
          <div
            role="status"
            className="p-3.5 rounded-xl bg-leaf-50 border border-leaf-300 text-forest-900 text-xs font-bold flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-leaf-600" />
              {toastMessage}
            </span>
            <button
              type="button"
              onClick={() => navigate('/cart')}
              className="underline font-extrabold"
            >
              Open Cart & Checkout →
            </button>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Product Visual */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <ProductIllustration
              svgType={activeProduct.imageSvgType}
              category={activeProduct.category}
              name={activeProduct.name}
              className="h-64 sm:h-72"
            />
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <p className="font-bold text-slate-800">
                Seller: {activeProduct.sellerName}
              </p>
              <p className="text-slate-600">
                Brand: {activeProduct.brand} • Pack Specification: {activeProduct.packSize}
              </p>
              <p className="text-[11px] text-amber-800 font-medium">
                Note: This is a demonstration store listing. All prices, sellers, and shipping estimates are for simulation only.
              </p>
            </div>
          </div>

          {/* Product Details & Controls */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-full bg-forest-100 text-forest-900">
                {activeProduct.category}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {activeProduct.seasonTag} Season
              </span>
              {activeProduct.demoOfferLabel && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-harvest-100 text-harvest-900 border border-harvest-300">
                  {activeProduct.demoOfferLabel}
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {activeProduct.name}
            </h2>
            <p className="text-xs text-slate-500">
              Product ID: <code>{activeProduct.id}</code> • Pack Size:{' '}
              <strong>{activeProduct.packSize}</strong>
            </p>

            {/* Price Box */}
            <div className="p-4 rounded-xl bg-forest-50/70 border border-forest-200 flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-forest-950">
                    {formatPaiseToINR(activeProduct.pricePaise)}
                  </span>
                  {activeProduct.mrpPaise > activeProduct.pricePaise && (
                    <span className="text-sm text-slate-400 line-through">
                      MRP {formatPaiseToINR(activeProduct.mrpPaise)}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Inclusive of all taxes (Demo Store Pricing in INR)
                </p>
              </div>

              <div className="text-right">
                <span
                  className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${
                    activeProduct.availability === 'In Stock'
                      ? 'bg-leaf-100 text-leaf-900'
                      : 'bg-amber-100 text-amber-900'
                  }`}
                >
                  {activeProduct.availability} ({activeProduct.stockCount} demo units)
                </span>
                <p className="text-[11px] text-slate-500 mt-1 flex items-center justify-end gap-1">
                  <Truck className="w-3.5 h-3.5 text-forest-700" />
                  <span>{activeProduct.shippingEstimateDays}</span>
                </p>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="inline-flex items-center rounded-xl border border-slate-300 bg-white">
                <button
                  type="button"
                  onClick={() => setDetailQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="p-2.5 text-slate-600 hover:text-slate-900"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-slate-900">{detailQty}</span>
                <button
                  type="button"
                  onClick={() =>
                    setDetailQty((q) => Math.min(activeProduct.stockCount, q + 1))
                  }
                  aria-label="Increase quantity"
                  className="p-2.5 text-slate-600 hover:text-slate-900"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleAddToCartClick(activeProduct, detailQty)}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-sm font-bold shadow-sm transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>
                  Add to Cart — {formatPaiseToINR(activeProduct.pricePaise * detailQty)}
                </span>
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(activeProduct.id)}
                className={`p-3 rounded-xl border font-bold text-xs inline-flex items-center gap-1.5 ${
                  isWishlisted
                    ? 'bg-red-50 border-red-300 text-red-700'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                <span>{isWishlisted ? 'Saved' : 'Wishlist'}</span>
              </button>
            </div>

            {/* Descriptions, Usage, Storage & Safety */}
            <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Product Overview</h3>
                <p className="text-slate-700 leading-relaxed">
                  {activeProduct.detailedDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-1">
                    Recommended Usage Instructions
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    {activeProduct.usageInstructions}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-1">
                    Storage & Handling Information
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    {activeProduct.storageInstructions}
                  </p>
                </div>
              </div>

              {activeProduct.safetyOrLegalNote && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950">
                  <strong>Safety & Label Guidance:</strong> {activeProduct.safetyOrLegalNote}
                </div>
              )}

              <div>
                <span className="font-bold text-slate-700 block mb-1.5">
                  Compatible Crops / Applications:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeProduct.compatibleCrops.map((crop) => (
                    <span
                      key={crop}
                      className="px-2.5 py-1 rounded-lg bg-forest-50 text-forest-900 border border-forest-200 font-semibold"
                    >
                      {crop}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        {similarProducts.length > 0 && (
          <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-4">
              Similar Products in {activeProduct.category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {similarProducts.map((sim) => (
                <div
                  key={sim.id}
                  className="p-4 rounded-xl border border-slate-200 flex flex-col justify-between gap-3"
                >
                  <div>
                    <ProductIllustration
                      svgType={sim.imageSvgType}
                      category={sim.category}
                      name={sim.name}
                      className="h-36 mb-3"
                    />
                    <h4 className="text-sm font-bold text-slate-900">{sim.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{sim.packSize}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-base font-extrabold text-forest-900">
                      {formatPaiseToINR(sim.pricePaise)}
                    </span>
                    <button
                      type="button"
                      onClick={() => openProductDetail(sim)}
                      className="px-3 py-1.5 rounded-lg bg-forest-50 hover:bg-forest-100 text-forest-900 text-xs font-bold"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  // --- MAIN STORE HOMEPAGE & CATALOG VIEW ---
  return (
    <div className="space-y-6">
      {/* 1. Store Header & Quick Cart / Orders Bar */}
      <section className="bg-forest-900 text-white rounded-2xl p-5 sm:p-6 shadow-sm border border-forest-800 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-forest-800 border border-forest-700 text-leaf-300 text-[11px] font-semibold mb-2">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>AGRIPULSE Agricultural Store — Complete E-Commerce Demo</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Farm Inputs, Monitoring Kits, Irrigation & Safety Supplies
          </h2>
          <p className="text-xs sm:text-sm text-forest-100 mt-1">
            Explore {products.length} realistic demo products across 10 agricultural categories. All prices are calculated in integer paise (₹) with full cart & demo order persistence.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setShowWishlistOnly((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-colors ${
              showWishlistOnly
                ? 'bg-red-600 text-white border-red-500'
                : 'bg-forest-950/80 hover:bg-forest-800 text-white border-forest-700'
            }`}
          >
            <Heart className="w-4 h-4 text-red-300" />
            <span>Wishlist ({wishlist.length})</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/orders')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-forest-950/80 hover:bg-forest-800 text-white border border-forest-700 text-xs font-bold transition-colors"
          >
            <Package className="w-4 h-4 text-leaf-300" />
            <span>My Demo Orders</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/cart')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-harvest-500 hover:bg-harvest-400 text-forest-950 text-xs font-extrabold shadow-sm transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>
              Cart ({cartTotals.itemCount}) • {formatPaiseToINR(cartTotals.subtotalPaise)}
            </span>
          </button>
        </div>
      </section>

      {toastMessage && (
        <div
          role="status"
          className="p-3.5 rounded-xl bg-leaf-50 border border-leaf-300 text-forest-950 text-xs font-bold flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-leaf-600" />
            {toastMessage}
          </span>
          <button
            type="button"
            onClick={() => navigate('/cart')}
            className="underline font-extrabold"
          >
            Proceed to Cart & Checkout →
          </button>
        </div>
      )}

      {/* 2. Demo Seasonal Offers & Recommended for Farmer's Crops */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Demo Offers Banner (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-amber-50 to-harvest-100/70 border border-harvest-200 rounded-2xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-harvest-900">
                <Tag className="w-4 h-4 text-harvest-700" />
                Active Demo Store Promotions
              </span>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-white text-harvest-900 border border-harvest-200">
                Demo Offers
              </span>
            </div>
            <div className="mt-3 space-y-2 text-xs">
              {VALID_DEMO_PROMO_CODES.map((promo) => (
                <div
                  key={promo.code}
                  className="p-2.5 rounded-xl bg-white/90 border border-harvest-200 flex items-center justify-between gap-2"
                >
                  <div>
                    <code className="font-mono font-extrabold text-forest-900 bg-forest-50 px-1.5 py-0.5 rounded">
                      {promo.code}
                    </code>
                    <p className="text-[11px] text-slate-600 mt-0.5">{promo.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[11px] text-amber-900 mt-2.5">
            Free demo shipping automatically applied on cart subtotals of ₹999 or more.
          </p>
        </div>

        {/* Recommended for Farmer's Selected Crops (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              <Sprout className="w-4 h-4 text-leaf-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Recommended for Your Active Crops ({farmerCropNames.slice(0, 3).join(', ')})
              </h3>
            </div>
            <span className="text-[10px] font-semibold text-slate-500">
              Seasonal Rabi & Kharif Picks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {recommendedForCrops.map((rec) => (
              <div
                key={rec.id}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-forest-50/50 border border-slate-200 flex items-center justify-between gap-2 text-xs"
              >
                <div className="min-w-0">
                  <button
                    type="button"
                    onClick={() => openProductDetail(rec)}
                    className="font-bold text-slate-900 hover:text-forest-800 text-left truncate block w-full"
                  >
                    {rec.name}
                  </button>
                  <span className="text-[11px] text-slate-500">
                    {formatPaiseToINR(rec.pricePaise)} • {rec.packSize}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddToCartClick(rec, 1)}
                  className="px-2.5 py-1.5 rounded-lg bg-forest-800 hover:bg-forest-900 text-white font-bold shrink-0 text-[11px]"
                >
                  + Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Search, Category Pills & Filter Controls */}
      <section className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              aria-label="Search store products"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (searchParams.has('q')) setSearchParams({});
              }}
              placeholder="Search seeds, NPK, sticky traps, tensiometer, drip, PPE..."
              className="w-full pl-10 pr-8 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-forest-600"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Crop Compatibility Filter */}
          <div className="md:col-span-3">
            <select
              aria-label="Filter by compatible crop"
              value={selectedCropFilter}
              onChange={(e) => setSelectedCropFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 bg-white"
            >
              {CROP_COMPATIBILITY_OPTIONS.map((crop) => (
                <option key={crop} value={crop}>
                  Crop: {crop}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="md:col-span-2">
            <select
              aria-label="Sort products by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 bg-white"
            >
              <option value="relevance">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>

          {/* Grid / List View + Clear Filters */}
          <div className="md:col-span-2 flex items-center justify-end gap-2">
            <div className="inline-flex rounded-xl border border-slate-200 p-0.5 bg-slate-50">
              <button
                type="button"
                onClick={() => setViewLayout('grid')}
                aria-label="Grid view"
                className={`p-1.5 rounded-lg ${
                  viewLayout === 'grid'
                    ? 'bg-white text-forest-900 shadow-sm'
                    : 'text-slate-500'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewLayout('list')}
                aria-label="List view"
                className={`p-1.5 rounded-lg ${
                  viewLayout === 'list'
                    ? 'bg-white text-forest-900 shadow-sm'
                    : 'text-slate-500'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={clearAllFilters}
              className="px-2.5 py-2 rounded-xl text-xs font-bold text-forest-800 hover:bg-forest-50 border border-slate-200"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Price Range & Availability Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-3">
            <Filter className="w-3.5 h-3.5 text-forest-700" />
            <label htmlFor="price-range-slider" className="font-semibold text-slate-700">
              Max Price: <strong>₹{maxPriceRupees.toLocaleString('en-IN')}</strong>
            </label>
            <input
              id="price-range-slider"
              type="range"
              min="300"
              max="3000"
              step="100"
              value={maxPriceRupees}
              onChange={(e) => setMaxPriceRupees(Number(e.target.value))}
              className="w-36 accent-forest-800"
            />
          </div>

          <label className="inline-flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={availabilityOnly}
              onChange={(e) => setAvailabilityOnly(e.target.checked)}
              className="rounded border-slate-300 text-forest-700"
            />
            <span>Show &ldquo;In Stock&rdquo; only (exclude Low Stock)</span>
          </label>

          <span className="font-bold text-slate-800">
            Showing {filteredProducts.length} of {products.length} Demo Products
          </span>
        </div>

        {/* 10 Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-forest-800 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-forest-50 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 4. Product Catalog Grid / List */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-3">
          <p className="text-sm font-bold text-slate-900">
            No agricultural products match your active filters.
          </p>
          <p className="text-xs text-slate-500">
            Try increasing the maximum price slider or clearing the category/search filter.
          </p>
          <button
            type="button"
            onClick={clearAllFilters}
            className="px-4 py-2 rounded-xl bg-forest-800 text-white text-xs font-bold"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div
          className={
            viewLayout === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
              : 'space-y-3'
          }
        >
          {filteredProducts.map((prod) => {
            const isWishlisted = wishlist.includes(prod.id);
            const inCartItem = cart.find((c) => c.productId === prod.id);

            return (
              <article
                key={prod.id}
                className={`bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:border-forest-300 transition-all flex ${
                  viewLayout === 'list'
                    ? 'flex-col sm:flex-row items-start sm:items-center justify-between gap-4'
                    : 'flex-col justify-between'
                }`}
              >
                <div className={viewLayout === 'list' ? 'flex items-center gap-4 flex-1' : ''}>
                  <div
                    onClick={() => openProductDetail(prod)}
                    className={`cursor-pointer relative ${
                      viewLayout === 'list' ? 'w-36 shrink-0' : 'mb-3'
                    }`}
                  >
                    <ProductIllustration
                      svgType={prod.imageSvgType}
                      category={prod.category}
                      name={prod.name}
                      className={viewLayout === 'list' ? 'h-28' : 'h-40'}
                    />
                    {prod.demoOfferLabel && (
                      <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-harvest-500 text-forest-950 shadow-sm">
                        {prod.demoOfferLabel}
                      </span>
                    )}
                    {prod.isNewArrival && !prod.demoOfferLabel && (
                      <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-leaf-600 text-white shadow-sm">
                        New Arrival
                      </span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase text-forest-800 truncate">
                        {prod.category}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleWishlist(prod.id)}
                        aria-label={
                          isWishlisted
                            ? `Remove ${prod.name} from wishlist`
                            : `Add ${prod.name} to wishlist`
                        }
                        className={`p-1 rounded-lg ${
                          isWishlisted
                            ? 'text-red-600'
                            : 'text-slate-400 hover:text-slate-700'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <h3
                      onClick={() => openProductDetail(prod)}
                      className="text-sm font-bold text-slate-900 hover:text-forest-800 cursor-pointer mt-1 line-clamp-2"
                    >
                      {prod.name}
                    </h3>

                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {prod.packSize} • {prod.sellerName}
                    </p>

                    <p className="text-xs text-slate-600 mt-1.5 line-clamp-2">
                      {prod.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {prod.compatibleCrops.slice(0, 3).map((c) => (
                        <span
                          key={c}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Price & Action Footer */}
                <div
                  className={`${
                    viewLayout === 'list'
                      ? 'sm:text-right shrink-0 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100'
                      : 'mt-4 pt-3 border-t border-slate-100'
                  }`}
                >
                  <div className="flex items-baseline justify-between mb-2.5">
                    <div>
                      <span className="text-lg font-extrabold text-slate-900">
                        {formatPaiseToINR(prod.pricePaise)}
                      </span>
                      {prod.mrpPaise > prod.pricePaise && (
                        <span className="text-[11px] text-slate-400 line-through ml-1.5">
                          {formatPaiseToINR(prod.mrpPaise)}
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        prod.availability === 'In Stock'
                          ? 'bg-leaf-50 text-leaf-800'
                          : 'bg-amber-50 text-amber-800'
                      }`}
                    >
                      {prod.availability}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openProductDetail(prod)}
                      className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                    >
                      Details
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddToCartClick(prod, 1)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-bold shadow-sm transition-colors"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>
                        {inCartItem ? `Add More (${inCartItem.quantity} in cart)` : 'Add to Cart'}
                      </span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* 5. Recently Viewed Products Bar */}
      {recentlyViewedList.length > 0 && (
        <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-forest-700" />
            <h3 className="text-sm font-bold text-slate-900">Recently Viewed Products</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {recentlyViewedList.map((rv) => (
              <div
                key={rv.id}
                onClick={() => openProductDetail(rv)}
                className="p-3 rounded-xl bg-slate-50 hover:bg-forest-50 border border-slate-200 cursor-pointer flex items-center justify-between gap-2 text-xs"
              >
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 truncate">{rv.name}</p>
                  <p className="text-slate-500 mt-0.5">
                    {formatPaiseToINR(rv.pricePaise)} • {rv.packSize}
                  </p>
                </div>
                <Sparkles className="w-4 h-4 text-forest-700 shrink-0" />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
