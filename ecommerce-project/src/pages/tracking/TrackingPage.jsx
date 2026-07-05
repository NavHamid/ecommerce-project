import axios from 'axios';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router';
import { Header } from '../../components/Header';
import './TrackingPage.css';

export function TrackingPage({ cart }) {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const productId = searchParams.get('productId');

  const [order, setOrder] = useState(null);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!orderId || !productId) {
      setError('Missing order ID or product ID.');
      setLoading(false);
      return;
    }

    axios.get(`/api/orders/${orderId}?expand=products`)
      .then((response) => {
        const orderDetails = response.data;
        setOrder(orderDetails);
        
        // Find specific product in this order
        const targetProduct = orderDetails.products.find(
          (p) => p.productId === productId || p.product.id === productId
        );

        if (targetProduct) {
          setProductData(targetProduct);
        } else {
          setError('Product not found in this order.');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Error fetching tracking data.');
        setLoading(false);
      });
  }, [orderId, productId]);

  if (loading) {
    return (
      <>
        <Header cart={cart} />
        <div className="tracking-page-loading">
          <div className="loading-spinner"></div>
          <p>Loading tracking information...</p>
        </div>
      </>
    );
  }

  if (error || !productData || !order) {
    return (
      <>
        <Header cart={cart} />
        <div className="tracking-page-error">
          <p className="error-message">{error || 'Unable to load tracking details.'}</p>
          <Link to="/orders" className="back-btn link-primary">Back to Orders</Link>
        </div>
      </>
    );
  }

  // Calculate dynamic progress
  const now = Date.now();
  const orderTime = order.orderTimeMs;
  const deliveryTime = productData.estimatedDeliveryTimeMs;

  let progressPct = 0;
  if (now >= deliveryTime) {
    progressPct = 100;
  } else {
    const elapsed = now - orderTime;
    const total = deliveryTime - orderTime;
    progressPct = total > 0 ? Math.min(100, Math.max(0, (elapsed / total) * 100)) : 30;
  }
  progressPct = Math.round(progressPct);

  // Stepper milestones active states
  const isPreparing = true; // Always true once order is placed
  const isShipped = progressPct >= 33;
  const isDelivered = progressPct === 100;

  return (
    <>
      <title>Tracking</title>
      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            &larr; View all orders
          </Link>

          <div className="delivery-date">
            Arriving on {dayjs(deliveryTime).format('dddd, MMMM D')}
          </div>

          <div className="product-info-grid">
            <div className="product-text-details">
              <h2 className="product-title">{productData.product.name}</h2>
              <div className="product-qty">Quantity: {productData.quantity}</div>
            </div>
            <div className="product-img-wrapper">
              <img className="product-image" src={productData.product.image} alt={productData.product.name} />
            </div>
          </div>

          {/* Dynamic Tracking Stepper */}
          <div className="stepper-section">
            <div className="progress-labels-container">
              <div className={`progress-label ${isPreparing && !isShipped ? 'current-status' : ''} ${isShipped ? 'completed' : ''}`}>
                <div className="status-dot"></div>
                <span>Preparing</span>
              </div>
              <div className={`progress-label ${isShipped && !isDelivered ? 'current-status' : ''} ${isDelivered ? 'completed' : ''}`}>
                <div className="status-dot"></div>
                <span>Shipped</span>
              </div>
              <div className={`progress-label ${isDelivered ? 'current-status' : ''}`}>
                <div className="status-dot"></div>
                <span>Delivered</span>
              </div>
            </div>

            <div className="progress-bar-container">
              <div className="progress-bar-track">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${progressPct}%` }}
                ></div>
              </div>
            </div>
            <div className="progress-percentage-text">
              Status: <strong>{progressPct}% Completed</strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
