import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section brand-section">
          <Logo light={true} />
          <p className="footer-desc">
            A modern, interactive ecommerce platform delivering a seamless shopping
            experience with premium curated goods.
          </p>
        </div>

        <div className="footer-section navigation-section">
          <h4 className="footer-title">Navigation</h4>
          <ul className="footer-links">
            <li>
              <Link to="/">Home Store</Link>
            </li>
            <li>
              <Link to="/orders">Your Orders</Link>
            </li>
            <li>
              <Link to="/checkout">Checkout Cart</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section credit-section">
          <h4 className="footer-title">About Creator</h4>
          <p className="credit-text">
            Designed, built, and maintained by <strong>Hamid Ansari</strong>. Crafted 
            with modern React and UI components for peak responsiveness and style.
          </p>
          <div className="credit-badges">
            <span className="badge developer">Hamid Ansari</span>
            <span className="badge developer-title">Founder & Lead Dev</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Aura Select. All rights reserved. Developed by Hamid Ansari.</p>
      </div>
    </footer>
  );
}
