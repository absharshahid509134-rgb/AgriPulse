import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  ShoppingBag,
  Info,
  XCircle,
  CheckCircle2,
  MapPin,
  Calendar,
  CreditCard,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useAgriPulse } from '../context/AgriPulseContext';
import { formatDateTime, formatPaiseToINR } from '../utils/formatters';

export const OrdersPage: React.FC = () => {
  const { orders, cancelDemoOrder } = useAgriPulse();
  const navigate = useNavigate();

  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(
    orders[0]?.id || null
  );
  const [confirmCancelId, setConfirmCancelId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Header & Demo Disclosure */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 mb-1.5">
            <Info className="w-3.5 h-3.5 text-amber-700" />
            <span>Demonstration Orders Only — No Physical Shipment Exists</span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
            Demonstration Order History ({orders.length})
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Review placed demo orders, inspect itemized price breakdowns, or cancel eligible orders.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/store')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-bold shadow-sm shrink-0"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Browse Store</span>
        </button>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-3">
          <Package className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">No Demo Orders Yet</h3>
          <p className="text-xs text-slate-500">
            Add products from the Agricultural Store and complete a simulated checkout to see your orders here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const isExpanded = expandedOrderId === order.id;
            const canCancel =
              order.orderStatus === 'Placed' || order.orderStatus === 'Processing';
            const totalUnits = order.items.reduce((s, it) => s + it.quantity, 0);

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
              >
                {/* Summary Header */}
                <div className="p-4 sm:p-5 bg-slate-50/70 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <code className="text-xs sm:text-sm font-mono font-extrabold text-forest-950 bg-white px-2.5 py-0.5 rounded border border-slate-200">
                        {order.id}
                      </code>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          order.orderStatus === 'Delivered'
                            ? 'bg-leaf-100 text-leaf-900 border border-leaf-300'
                            : order.orderStatus === 'Cancelled'
                            ? 'bg-red-100 text-red-900 border border-red-300'
                            : 'bg-forest-100 text-forest-900 border border-forest-300'
                        }`}
                      >
                        Stage: {order.orderStatus}
                      </span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                        Demo Order
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {formatDateTime(order.createdAt)}
                      </span>
                      <span>•</span>
                      <span>
                        {order.items.length} Product(s) ({totalUnits} total units)
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                        {order.paymentMode}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] uppercase text-slate-500 block">
                        Total Amount (Demo)
                      </span>
                      <span className="text-base sm:text-lg font-extrabold text-slate-900">
                        {formatPaiseToINR(order.totalPayablePaise)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setExpandedOrderId(isExpanded ? null : order.id)
                      }
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800"
                    >
                      <span>{isExpanded ? 'Hide Details' : 'Order Details'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Order Details */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 space-y-4 text-xs">
                    {/* Order Stage Progress Bar */}
                    <div className="grid grid-cols-4 gap-2">
                      {(['Placed', 'Processing', 'Dispatched', 'Delivered'] as const).map(
                        (stage, idx) => {
                          const stageOrder = ['Placed', 'Processing', 'Dispatched', 'Delivered'];
                          const currentIdx = stageOrder.indexOf(order.orderStatus);
                          const isDone =
                            order.orderStatus !== 'Cancelled' && idx <= currentIdx;
                          return (
                            <div
                              key={stage}
                              className={`p-2 rounded-xl border text-center font-bold ${
                                order.orderStatus === 'Cancelled'
                                  ? 'bg-slate-50 border-slate-200 text-slate-400'
                                  : isDone
                                  ? 'bg-forest-50 border-forest-300 text-forest-900'
                                  : 'bg-slate-50 border-slate-200 text-slate-400'
                              }`}
                            >
                              {stage} (Demo)
                            </div>
                          );
                        }
                      )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                      {/* Purchased Products Table (7 cols) */}
                      <div className="lg:col-span-7 rounded-xl border border-slate-200 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase text-slate-500">
                              <th className="py-2 px-3">Purchased Product</th>
                              <th className="py-2 px-3">Unit Price</th>
                              <th className="py-2 px-3">Qty</th>
                              <th className="py-2 px-3 text-right">Line Total</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {order.items.map((it) => (
                              <tr key={it.productId}>
                                <td className="py-2.5 px-3">
                                  <span className="font-bold text-slate-900 block">
                                    {it.productName}
                                  </span>
                                  <span className="text-[11px] text-slate-500">
                                    {it.packSize} • {it.category}
                                  </span>
                                </td>
                                <td className="py-2.5 px-3">
                                  {formatPaiseToINR(it.unitPricePaise)}
                                </td>
                                <td className="py-2.5 px-3 font-bold">{it.quantity}</td>
                                <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                                  {formatPaiseToINR(it.lineTotalPaise)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Delivery & Payment Metadata (5 cols) */}
                      <div className="lg:col-span-5 space-y-3">
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                          <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-forest-700" />
                            <span>Simulated Delivery Address</span>
                          </h4>
                          <p className="font-semibold text-slate-800">
                            {order.deliveryDetails.customerName} (
                            {order.deliveryDetails.mobileNumber})
                          </p>
                          <p className="text-slate-600">
                            {order.deliveryDetails.deliveryAddress},{' '}
                            {order.deliveryDetails.village},{' '}
                            {order.deliveryDetails.district}, {order.deliveryDetails.state} —
                            PIN {order.deliveryDetails.pinCode}
                          </p>
                          {order.deliveryDetails.deliveryInstructions && (
                            <p className="text-[11px] text-slate-500 italic">
                              Note: {order.deliveryDetails.deliveryInstructions}
                            </p>
                          )}
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Subtotal:</span>
                            <span className="font-semibold">
                              {formatPaiseToINR(order.subtotalPaise)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Demo Shipping:</span>
                            <span className="font-semibold">
                              {order.shippingPaise === 0
                                ? 'FREE (₹0)'
                                : formatPaiseToINR(order.shippingPaise)}
                            </span>
                          </div>
                          {order.discountPaise > 0 && (
                            <div className="flex justify-between text-leaf-800 font-semibold">
                              <span>
                                Promo Discount ({order.promoCodeApplied || 'DEMO'}):
                              </span>
                              <span>-{formatPaiseToINR(order.discountPaise)}</span>
                            </div>
                          )}
                          <div className="pt-1.5 border-t border-slate-200 flex justify-between font-extrabold text-slate-900">
                            <span>Total Demo Amount:</span>
                            <span>{formatPaiseToINR(order.totalPayablePaise)}</span>
                          </div>
                          <p className="text-[11px] text-amber-900 pt-1">
                            <strong>Demo Payment Status:</strong> {order.demoPaymentStatus}
                          </p>
                        </div>

                        {/* Cancel Eligible Demo Order Action */}
                        {canCancel && (
                          <div>
                            {confirmCancelId === order.id ? (
                              <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-center justify-between gap-2">
                                <span className="font-bold text-red-900">
                                  Cancel demo order {order.id}?
                                </span>
                                <div className="flex gap-2">
                                  <button
                                    type="button"
                                    onClick={() => setConfirmCancelId(null)}
                                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 font-semibold"
                                  >
                                    Keep
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      cancelDemoOrder(order.id);
                                      setConfirmCancelId(null);
                                    }}
                                    className="px-2.5 py-1 rounded-lg bg-red-700 text-white font-bold"
                                  >
                                    Confirm Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setConfirmCancelId(order.id)}
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-800 border border-red-200 font-bold"
                              >
                                <XCircle className="w-4 h-4" />
                                <span>Cancel Eligible Demo Order</span>
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
