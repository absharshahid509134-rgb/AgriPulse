import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingCart,
  Trash2,
  Package,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { useAgriPulse } from '../context/AgriPulseContext';
import { formatPaiseToINR } from '../utils/formatters';
import { ProductIllustration } from '../components/ProductIllustration';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, products, addToCart } = useAgriPulse();
  const navigate = useNavigate();
  const [toastMsg, setToastMsg] = React.useState<string | null>(null);

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleAddToCart = (productId: string, name: string) => {
    const res = addToCart(productId, 1);
    if (res.ok) {
      setToastMsg(`Added ${name} to cart.`);
      setTimeout(() => setToastMsg(null), 3000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 mb-1.5">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Saved Agricultural Inputs ({wishlistedProducts.length})</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            My Wishlist & Saved Supplies
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Keep track of essential seeds, fertilizers, and monitoring kits for your upcoming seasonal sowing schedule.
          </p>
        </div>

        <Link
          to="/store"
          className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-colors shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          Browse Store Catalog
        </Link>
      </div>

      {toastMsg && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl flex items-center justify-between text-xs font-semibold shadow-sm">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {toastMsg}
          </span>
          <Link to="/cart" className="underline font-bold text-emerald-950">
            Open Cart & Checkout →
          </Link>
        </div>
      )}

      {wishlistedProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Your Wishlist is Empty</h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Browse the Agricultural Store and click the heart icon on any seed packet, fertilizer bag, or diagnostic tool to save it here.
          </p>
          <Link
            to="/store"
            className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            Explore Agricultural Store
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {wishlistedProducts.map((p) => {
            const discountPaise = Math.max(0, p.mrpPaise - p.pricePaise);
            const discountPct = p.mrpPaise > 0 ? Math.round((discountPaise / p.mrpPaise) * 100) : 0;

            return (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group"
              >
                <div>
                  <div className="relative bg-slate-50 rounded-xl p-4 flex items-center justify-center mb-3.5">
                    <ProductIllustration
                      svgType={p.imageSvgType}
                      category={p.category}
                      name={p.name}
                      className="h-36 w-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => toggleWishlist(p.id)}
                      className="absolute top-2 right-2 p-1.5 bg-white rounded-lg border border-slate-200 text-rose-600 hover:bg-rose-50 transition-colors shadow-xs"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {discountPct > 0 && (
                      <span className="absolute top-2 left-2 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                        {discountPct}% OFF
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    {p.category}
                  </span>

                  <Link
                    to={`/store/product/${p.id}`}
                    className="block text-sm font-bold text-slate-900 hover:text-emerald-700 mt-1.5 line-clamp-2 leading-snug"
                  >
                    {p.name}
                  </Link>

                  <p className="text-xs text-slate-500 mt-1">
                    {p.packSize} • {p.brand}
                  </p>

                  <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                    {p.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-slate-900">
                      {formatPaiseToINR(p.pricePaise)}
                    </span>
                    {p.mrpPaise > p.pricePaise && (
                      <span className="text-xs text-slate-400 line-through block">
                        {formatPaiseToINR(p.mrpPaise)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/store/product/${p.id}`}
                      className="text-xs font-semibold px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl transition-colors"
                    >
                      Details
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleAddToCart(p.id, p.name)}
                      className="text-xs font-bold px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
