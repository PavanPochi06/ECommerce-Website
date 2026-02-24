import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import { Header } from "../../components/Header";
import "./TrackingPage.css";

const STEPS = [
  { key: "placed", label: "Order Placed", icon: "📦" },
  { key: "processing", label: "Processing", icon: "⚙️" },
  { key: "shipped", label: "Shipped", icon: "🚚" },
  { key: "out", label: "Out for Delivery", icon: "🏠" },
  { key: "delivered", label: "Delivered", icon: "✅" },
];

/** Derive tracking step from estimated delivery time vs now */
function getStepIndex(orderTimeMs, estimatedDeliveryTimeMs) {
  const now = Date.now();
  const total = estimatedDeliveryTimeMs - orderTimeMs;
  const elapsed = now - orderTimeMs;
  const ratio = elapsed / total;

  if (ratio >= 1) return 4; // delivered
  if (ratio >= 0.75) return 3; // out for delivery
  if (ratio >= 0.5) return 2; // shipped
  if (ratio >= 0.2) return 1; // processing
  return 0;                     // just placed
}

export function TrackingPage({ cart }) {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const productId = searchParams.get("productId");

  const [order, setOrder] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId) {
      setError("No order ID provided.");
      setLoading(false);
      return;
    }

    axios
      .get(`/api/orders/${orderId}?expand=products`)
      .then((res) => {
        const o = res.data;
        setOrder(o);

        if (productId) {
          const match = o.products.find((p) => p.productId === productId);
          setProduct(match || o.products[0] || null);
        } else {
          setProduct(o.products[0] || null);
        }
      })
      .catch(() => setError("Could not load order. Please try again."))
      .finally(() => setLoading(false));
  }, [orderId, productId]);

  const stepIndex = product && order
    ? getStepIndex(order.orderTimeMs, product.estimatedDeliveryTimeMs)
    : 0;

  return (
    <>
      <title>Track Package</title>
      <Header cart={cart} />

      <div className="tracking-page">
        {loading && (
          <div className="tracking-loading">
            <div className="tracking-spinner" />
            <p>Loading tracking information…</p>
          </div>
        )}

        {error && !loading && (
          <div className="tracking-error">
            <span className="tracking-error-icon">⚠️</span>
            <p>{error}</p>
            <Link to="/orders" className="tracking-back-btn">Back to Orders</Link>
          </div>
        )}

        {!loading && !error && order && product && (
          <>
            {/* ── Top bar ── */}
            <div className="tracking-hero">
              <div className="tracking-hero-inner">
                <h1 className="tracking-title">Track Your Package</h1>
                <p className="tracking-subtitle">
                  Real-time updates for your order
                </p>
              </div>
            </div>

            <div className="tracking-content">
              {/* ── Order meta ── */}
              <div className="tracking-meta-card">
                <div className="tracking-meta-row">
                  <div className="tracking-meta-item">
                    <span className="tracking-meta-label">Order ID</span>
                    <span className="tracking-meta-value tracking-id-badge">{order.id}</span>
                  </div>
                  <div className="tracking-meta-item">
                    <span className="tracking-meta-label">Order Placed</span>
                    <span className="tracking-meta-value">
                      {dayjs(order.orderTimeMs).format("MMMM D, YYYY")}
                    </span>
                  </div>
                  <div className="tracking-meta-item">
                    <span className="tracking-meta-label">Estimated Delivery</span>
                    <span className="tracking-meta-value tracking-delivery-date">
                      {dayjs(product.estimatedDeliveryTimeMs).format("MMMM D, YYYY")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="tracking-main">
                {/* ── Product card ── */}
                <div className="tracking-product-card">
                  <div className="tracking-product-image">
                    {product.product?.image
                      ? <img src={product.product.image} alt={product.product?.name} />
                      : <div className="tracking-product-placeholder">📦</div>
                    }
                  </div>
                  <div className="tracking-product-info">
                    <h2 className="tracking-product-name">
                      {product.product?.name || "Product"}
                    </h2>
                    <p className="tracking-product-qty">Quantity: {product.quantity}</p>
                    {stepIndex >= 4 ? (
                      <span className="tracking-badge delivered">Delivered</span>
                    ) : stepIndex >= 3 ? (
                      <span className="tracking-badge out-for-delivery">Out for Delivery</span>
                    ) : stepIndex >= 2 ? (
                      <span className="tracking-badge shipped">Shipped</span>
                    ) : (
                      <span className="tracking-badge processing">Processing</span>
                    )}
                  </div>
                </div>

                {/* ── Progress stepper ── */}
                <div className="tracking-stepper-card">
                  <h3 className="tracking-stepper-title">Shipment Progress</h3>
                  <div className="tracking-stepper">
                    {STEPS.map((step, idx) => {
                      const done = idx <= stepIndex;
                      const active = idx === stepIndex;
                      return (
                        <div
                          key={step.key}
                          className={`tracking-step ${done ? "done" : ""} ${active ? "active" : ""}`}
                        >
                          <div className="tracking-step-icon-wrap">
                            <div className="tracking-step-icon">{step.icon}</div>
                            {active && <div className="tracking-step-pulse" />}
                          </div>
                          {idx < STEPS.length - 1 && (
                            <div className={`tracking-step-line ${done ? "done" : ""}`} />
                          )}
                          <div className="tracking-step-label">{step.label}</div>
                        </div>
                      );
                    })}
                  </div>

                  {/* ── Timeline events ── */}
                  <div className="tracking-timeline">
                    {STEPS.slice(0, stepIndex + 1).reverse().map((step, i) => (
                      <div key={step.key} className={`tracking-event ${i === 0 ? "latest" : ""}`}>
                        <div className="tracking-event-dot" />
                        <div className="tracking-event-body">
                          <span className="tracking-event-title">{step.label}</span>
                          <span className="tracking-event-time">
                            {i === 0 ? "Most recent update" : "Completed"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Actions ── */}
              <div className="tracking-actions">
                <Link to="/orders" className="tracking-back-btn">
                  ← Back to Orders
                </Link>
                <Link to="/" className="tracking-shop-btn">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}