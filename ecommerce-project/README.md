# 💻 E-Commerce Frontend Client

This is the React client-side Single Page Application (SPA) for the E-Commerce platform, built using **React 19**, **Vite**, **React Router 7**, and **Vitest**.

---

## 🎨 Page Views & Features

The interface is structured into four core pages, managed by client-side routing in [App.jsx](file:///c:/Users/HP/Desktop/supersimpledev/React%20Supersimpledev/react-course/ecommerce-project/src/App.jsx):

### 1. 🏠 Product Catalog ([HomePage.jsx](file:///c:/Users/HP/Desktop/supersimpledev/React%20Supersimpledev/react-course/ecommerce-project/src/pages/home/HomePage.jsx))
- **Product Grid**: Rendered dynamically from `/api/products` via the [ProductsGrid](file:///c:/Users/HP/Desktop/supersimpledev/React%20Supersimpledev/react-course/ecommerce-project/src/pages/home/ProductsGrid.jsx) and [Product](file:///c:/Users/HP/Desktop/supersimpledev/React%20Supersimpledev/react-course/ecommerce-project/src/pages/home/Product.jsx) components.
- **Dynamic Search**: Integrated search bar in the header triggers query parameter filtering of products.
- **Quantity Selector**: Dropdown selector allowing users to select 1–10 items before adding to the cart.
- **Visual Feedback**: Adding an item triggers a temporary green checkmark confirmation message with smooth CSS transitions.

### 2. 🛒 Interactive Checkout ([CheckoutPage.jsx](file:///c:/Users/HP/Desktop/supersimpledev/React%20Supersimpledev/react-course/ecommerce-project/src/pages/checkout/CheckoutPage.jsx))
- **Cart Summary**: Lists all items currently in the cart, expanding product details (images, pricing, names).
- **Inline Operations**:
  - **Quantity Adjustments**: Click "Update" to toggle an inline input field, modify the quantity, and save to database.
  - **Item Removals**: Click "Delete" to instantly delete the record via API and update state.
- **Delivery Selection**: Interactive radio buttons for delivery speeds:
  - *Standard*: FREE shipping (approx. 7 days).
  - *Fast*: $4.99 shipping (approx. 3 days).
  - *Express*: $9.99 shipping (approx. 1 day).
  - *Dynamic Dates*: Selection changes the calculated delivery dates instantly using `dayjs`.
- **Payment Calculations**: Renders tax (10%), pre-tax, delivery fees, and order totals. Clicking "Place Order" commits the cart contents to the orders history database.

### 3. 📦 Order History ([OrdersPage.jsx](file:///c:/Users/HP/Desktop/supersimpledev/React%20Supersimpledev/react-course/ecommerce-project/src/pages/orders/OrdersPage.jsx))
- Displays chronological cards of past transactions.
- Shows total costs, order IDs, item counts, and expected delivery dates.
- Includes a "Track Package" action link directing users to the delivery status visualizer.

### 4. 📍 Delivery Visualizer ([TrackingPage.jsx](file:///c:/Users/HP/Desktop/supersimpledev/React%20Supersimpledev/react-course/ecommerce-project/src/pages/tracking/TrackingPage.jsx))
- Focuses on a single item tracking status.
- Renders an interactive multi-stage progress bar showing status stages: **Preparing** ➔ **Shipped** ➔ **Delivered**.
- Computes progress percentages by comparing order creation dates, current date, and expected delivery dates.

---

## 🏗️ Folder Structure

```text
ecommerce-project/
├── public/                    # Root client-side public folder
│   └── images/                # App asset directory (stars, icons)
├── src/
│   ├── components/            # Global UI Layout Components
│   │   ├── BrandLogo.jsx      # Custom SVG brand logo mark and link
│   │   ├── Header.jsx         # App bar with search logic and live cart badges
│   │   └── ...css files       # Matching CSS layouts for components
│   ├── pages/                 # Route-specific views
│   │   ├── home/              # Catalog display & product cards
│   │   ├── checkout/          # Checkout calculations, item adjustments, and shipping
│   │   ├── orders/            # Order list grid layout
│   │   └── tracking/          # Status bars & shipping details
│   ├── utils/                 # Utility files
│   │   └── money.js           # Helper to convert cents integers into formatted dollars
│   ├── App.jsx                # Layout orchestrator and routes configuration
│   └── main.jsx               # Bootstrap mount
├── vite.config.js             # Local proxies for API port integration
└── vitest.config.js           # Test settings (jsdom & setup scripts)
```

---

## ⚙️ Development Server Reverse-Proxy

Vite is configured with a development reverse proxy to forward requests to the Express server running on port `3000`. This prevents CORS blockages and enables clean relative path queries inside React code:

```javascript
// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
      },
      "/images": {
        target: "http://127.0.0.1:3000",
      }
    }
  }
})
```

---

## 🚀 Running the Client

### 1. Installation
Run inside the `ecommerce-project` folder:
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Vite will boot up, typically serving the client interface at `http://localhost:5173`. Make sure the backend server is running in parallel.

### 3. Production Build
Compile optimized static files:
```bash
npm run build
```
*Outputs compiled bundles into `dist/` where they can be static-served by Express or CDNs.*

---

## 🧪 Testing with Vitest & React Testing Library

The frontend utilizes **Vitest** + **jsdom** + **React Testing Library** for behavioral verification.

### Run all tests
```bash
npx vitest
```

### Test Scripts Config
- Test environment is configured in [vitest.config.js](file:///c:/Users/HP/Desktop/supersimpledev/React%20Supersimpledev/react-course/ecommerce-project/vitest.config.js).
- Assertions are extended using `@testing-library/jest-dom` loaded via [setupTests.js](file:///c:/Users/HP/Desktop/supersimpledev/React%20Supersimpledev/react-course/ecommerce-project/setupTests.js).
- Global variables (`vi`, `describe`, `expect`, `test`) are enabled for clean test syntax.
