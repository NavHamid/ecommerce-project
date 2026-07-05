import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { formatMoney } from '../../utils/money';

export function PaymentSummary({ paymentSummary, loadCart }) {
  const navigate = useNavigate();

  // Promo Code States
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [freeShipping, setFreeShipping] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [feedbackType, setFeedbackType] = useState(''); // 'success' | 'error'

  const createOrder = async () => {
    await axios.post('/api/orders');
    await loadCart();
    navigate('/orders');
  };

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'WELCOME10') {
      setAppliedPromo(code);
      setDiscountPercent(10);
      setFreeShipping(false);
      setFeedbackMsg('Promo code "WELCOME10" applied! 10% off items.');
      setFeedbackType('success');
    } else if (code === 'SUPER20') {
      setAppliedPromo(code);
      setDiscountPercent(20);
      setFreeShipping(false);
      setFeedbackMsg('Promo code "SUPER20" applied! 20% off items.');
      setFeedbackType('success');
    } else if (code === 'FREESHIP') {
      setAppliedPromo(code);
      setDiscountPercent(0);
      setFreeShipping(true);
      setFeedbackMsg('Promo code "FREESHIP" applied! Free shipping.');
      setFeedbackType('success');
    } else {
      setFeedbackMsg('Invalid promo code.');
      setFeedbackType('error');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo('');
    setDiscountPercent(0);
    setFreeShipping(false);
    setPromoInput('');
    setFeedbackMsg('');
    setFeedbackType('');
  };

  // Cost calculations
  const productCostCents = paymentSummary ? paymentSummary.productCostCents : 0;
  const shippingCostCents = paymentSummary ? paymentSummary.shippingCostCents : 0;

  let discountCents = 0;
  if (discountPercent > 0) {
    discountCents = Math.round(productCostCents * (discountPercent / 100));
  }
  if (freeShipping) {
    discountCents = shippingCostCents;
  }

  let totalCostBeforeTaxCents = productCostCents + shippingCostCents - discountCents;
  if (totalCostBeforeTaxCents < 0) totalCostBeforeTaxCents = 0;

  const taxCents = Math.round(totalCostBeforeTaxCents * 0.1);
  const totalCostCents = totalCostBeforeTaxCents + taxCents;

  return (
    <div className="payment-summary">
      <div className="payment-summary-title">
        Payment Summary
      </div>

      {paymentSummary && (
        <>
          <div className="payment-summary-row">
            <div>Items ({paymentSummary.totalItems}):</div>
            <div className="payment-summary-money">
              {formatMoney(productCostCents)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div className="payment-summary-money">
              {formatMoney(shippingCostCents)}
            </div>
          </div>

          {discountCents > 0 && (
            <div className="payment-summary-row">
              <div className="promo-discount-label">Promo Discount ({appliedPromo}):</div>
              <div className="promo-discount-amount">
                -{formatMoney(discountCents)}
              </div>
            </div>
          )}

          <div className="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div className="payment-summary-money">
              {formatMoney(totalCostBeforeTaxCents)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div className="payment-summary-money">
              {formatMoney(taxCents)}
            </div>
          </div>

          <div className="payment-summary-row total-row">
            <div>Order total:</div>
            <div className="payment-summary-money">
              {formatMoney(totalCostCents)}
            </div>
          </div>

          {/* Promo Code Input Section */}
          <div className="promo-code-container">
            <div className="promo-code-row">
              <input
                className="promo-code-input"
                type="text"
                placeholder="Enter Promo Code"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                disabled={!!appliedPromo}
              />
              {appliedPromo ? (
                <button className="promo-btn remove-btn" onClick={handleRemovePromo}>
                  Remove
                </button>
              ) : (
                <button className="promo-btn apply-btn" onClick={handleApplyPromo}>
                  Apply
                </button>
              )}
            </div>
            {feedbackMsg && (
              <div className={`promo-feedback-msg ${feedbackType}`}>
                {feedbackMsg}
              </div>
            )}
          </div>

          <button className="place-order-button button-primary"
            onClick={createOrder}>
            Place your order
          </button>
        </>
      )}
    </div>
  );
}