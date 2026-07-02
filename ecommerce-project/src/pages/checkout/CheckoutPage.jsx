import axios from 'axios';
import { useState, useEffect } from 'react';
import OrderSummary from './OrderSummary.jsx';
import PaymentSummary from './PaymentSummary.jsx';
import Logo from '../../components/Logo';
import Footer from '../../components/Footer';
import './checkout-header.css';
import './CheckoutPage.css';

export default function CheckOutPage({ cart , loadCart }) {
    const [deliveryOption, setDeliveryOption] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState([]);



    useEffect(() => {
        const fetchCheckoutData = async () => {
            let response = await axios.get(
                "/api/delivery-options?expand=estimatedDeliveryTime"
            );
            setDeliveryOption(response.data);

            response = await axios.get("/api/payment-summary");
            setPaymentSummary(response.data);
        };

        fetchCheckoutData();
    }, [cart]);



    return (
        <>
            <title>Checkout | Aura Select</title>
            <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <a href="/" style={{ textDecoration: 'none' }}>
                            <Logo light={false} />
                        </a>
                    </div>

                    <div className="checkout-header-middle-section">
                        Checkout (
                        <a className="return-to-home-link" href="/">
                            3 items
                        </a>
                        )
                    </div>

                    <div className="checkout-header-right-section">
                        <img src="images/icons/checkout-lock-icon.png" />
                    </div>
                </div>
            </div>

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary cart={cart} deliveryOption={deliveryOption} loadCart={loadCart} />

                    <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
                </div>
            </div>
            <Footer />
        </>
    );
}
