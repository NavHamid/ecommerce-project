import { Link } from "react-router-dom";
import Logo from "./Logo";
import imagePath from "../utils/imagePath";
import "./Header.css";

export default function Header({ cart }) {
    let totalQuantity = 0;

    cart.forEach((cartItem) => {
        totalQuantity += cartItem.quantity;
    });

    return (
        <div className="header">
            <div className="left-section">
                <Link to="/" className="header-link">
                    <Logo light={true} />
                </Link>
            </div>

            <div className="middle-section">
                <input className="search-bar" type="text" placeholder="Search" />

                <button className="search-button">
                    <img className="search-icon" src={imagePath("images/icons/search-icon.png")} />
                </button>
            </div>

            <div className="right-section">
                <Link className="orders-link header-link" to="/orders">

                    <span className="orders-text">Orders</span>
                </Link>

                <Link className="cart-link header-link" to="/checkout">
                    <img className="cart-icon" src={imagePath("images/icons/cart-icon.png")} />
                    <div className="cart-quantity">{totalQuantity}</div>
                    <div className="cart-text">Cart</div>
                </Link>
            </div>
        </div>
    )
}
