import axios from 'axios';
import dayjs from 'dayjs';
import { useState } from 'react';
import { formatMoney } from '../../utils/money';
import { DeliveryOptions } from './DeliveryOptions';

export function OrderSummary({ cart, deliveryOptions, loadCart }) {
  const [editingId, setEditingId] = useState(null);
  const [editQuantity, setEditQuantity] = useState(1);

  const startEditing = (cartItem) => {
    setEditingId(cartItem.productId);
    setEditQuantity(cartItem.quantity);
  };

  const saveQuantity = async (productId) => {
    if (editQuantity < 1) return;
    await axios.put(`/api/cart-items/${productId}`, {
      quantity: editQuantity
    });
    setEditingId(null);
    await loadCart();
  };

  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 && cart.map((cartItem) => {
        const selectedDeliveryOption = deliveryOptions
          .find((deliveryOption) => {
            return deliveryOption.id === cartItem.deliveryOptionId;
          });

        const deleteCartItem = async () => {
          await axios.delete(`/api/cart-items/${cartItem.productId}`);
          await loadCart();
        };

        return (
          <div key={cartItem.productId} className="cart-item-container">
            <div className="delivery-date">
              Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
            </div>

            <div className="cart-item-details-grid">
              <img className="product-image"
                src={cartItem.product.image} alt={cartItem.product.name} />

              <div className="cart-item-details">
                <div className="product-name">
                  {cartItem.product.name}
                </div>
                <div className="product-price">
                  {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                  {editingId === cartItem.productId ? (
                    <>
                      <input 
                        type="number" 
                        min="1" 
                        max="1000" 
                        value={editQuantity}
                        onChange={(e) => setEditQuantity(Number(e.target.value))}
                        className="quantity-input"
                      />
                      <span className="save-quantity-link link-primary" onClick={() => saveQuantity(cartItem.productId)}>
                        Save
                      </span>
                      <span className="cancel-quantity-link link-primary" onClick={() => setEditingId(null)}>
                        Cancel
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                      </span>
                      <span className="update-quantity-link link-primary" onClick={() => startEditing(cartItem)}>
                        Update
                      </span>
                      <span className="delete-quantity-link link-primary"
                        onClick={deleteCartItem}>
                        Delete
                      </span>
                    </>
                  )}
                </div>
              </div>

              <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions} loadCart={loadCart} />
            </div>
          </div>
        );
      })}
    </div>
  );
}