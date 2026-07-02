
import dayjs from 'dayjs';
import axios from 'axios';
import formatMoney from '../../utils/money.js';
import DeliveryOptions from './DeliveryOptions.jsx';
import imagePath from '../../utils/imagePath';


export default function OrderSummary({ cart, deliveryOption, loadCart }) {
    return (
        <div className="order-summary">
            {deliveryOption.length > 0 &&
                cart.map(cartItem => {
                    const selectedDeliveryOption = deliveryOption.find(
                        deliveryOption => {
                            return deliveryOption.id === cartItem.deliveryOptionId;
                        }
                    );
                    const deleteCartItem = async () => {
                        await axios.delete(`/api/cart-items/${cartItem.productId}`);
                        await loadCart();
                    }

                    const updateCartItem = async () => {
                        await axios.put(`/api/cart-items/${cartItem.productId}`, {
                            quantity: cartItem.quantity + 1
                        });
                        await loadCart();
                    }
                    return (
                        <div key={cartItem.productId} className="cart-item-container">
                            <div className="delivery-date">
                                Delivery date:{' '}
                                {dayjs(
                                    selectedDeliveryOption.estimatedDeliveryTimeMs
                                ).format('dddd, MMMM D')}
                            </div>

                            <div className="cart-item-details-grid">
                                <img
                                    className="product-image"
                                    src={imagePath(cartItem.product.image)}
                                />

                                <div className="cart-item-details">
                                    <div className="product-name">
                                        {cartItem.product.name}
                                    </div>
                                    <div className="product-price">
                                        ${formatMoney(cartItem.product.priceCents)}
                                    </div>
                                    <div className="product-quantity">
                                        <span>
                                            Quantity:{' '}
                                            <span className="quantity-label">
                                                {cartItem.quantity}
                                            </span>
                                        </span>
                                        <span className="update-quantity-link link-primary" onClick={updateCartItem}>
                                            Update
                                        </span>
                                        <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>
                                            Delete
                                        </span>
                                    </div>
                                </div>

                                <DeliveryOptions deliveryOption={deliveryOption} cartItem={cartItem} loadCart={loadCart} />
                            </div>
                        </div>
                    );
                })}
        </div>
    )
}
