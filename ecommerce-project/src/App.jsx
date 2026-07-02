import axios from 'axios'
import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import HomePage from './pages/home/HomePage'
import CheckoutPage from './pages/checkout/CheckoutPage'
import OrdersPage from './pages/orders/OrdersPage'
import TrackingOrder from './pages/TrackingOrder'
import './App.css'

function App() {
  const [cart, setCartItems] = useState([]);
  const loadCart = async () => {
    const response = await axios.get("/api/cart-items?expand=product")
    setCartItems(response.data)
  }

  useEffect(() => {
    loadCart()
  }, [])

  return (
    <div className="app-shell">
      <Routes>
        <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
        <Route path="checkout" element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
        <Route path="orders" element={<OrdersPage cart={cart} />} />
        <Route path="tracking-order" element={<TrackingOrder />} />
      </Routes>
    </div>
  )
}

export default App
