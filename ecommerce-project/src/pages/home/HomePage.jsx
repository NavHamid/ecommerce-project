import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import ProductsGrid from "./ProductsGrid"
import Footer from "../../components/Footer";
import "./HomePage.css";

export default function HomePage({ cart, loadCart }) {
    const [products, setProducts] = useState([]);


    useEffect(() => {
        const fetchHomeData = async () => {
            const response = await axios.get("/api/products")
            setProducts(response.data)
        }
        fetchHomeData()
    }, [])


    return (
        <>
            <title>Aura Select | Curated Essentials</title>

            <Header cart={cart} />

            <div className="home-page app-shell">
                <section className="home-hero">
                    <div className="home-hero-copy">
                        <p className="home-hero-kicker">Curated essentials</p>
                        <h1>Shop a cleaner, calmer storefront.</h1>
                        <p className="home-hero-description">
                            Browse daily deals, trusted basics, and quick-pick gifts with a more polished checkout flow.
                        </p>
                    </div>

                    <div className="home-hero-metrics" aria-label="store highlights">
                        <div>
                            <span>24h</span>
                            <p>Fast dispatch</p>
                        </div>
                        <div>
                            <span>4.8/5</span>
                            <p>Average rating</p>
                        </div>
                        <div>
                            <span>Free</span>
                            <p>Delivery on orders over $35</p>
                        </div>
                    </div>
                </section>

                <ProductsGrid products={products} loadCart={loadCart} />
            </div>

            <Footer />
        </>
    )
}
