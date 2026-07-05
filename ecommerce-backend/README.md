# ⚙️ E-Commerce Backend Service

A Node.js and Express REST API service orchestrating database operations, calculations, and catalog distribution for the e-commerce application. It is structured with **Sequelize ORM** and runs a zero-config local database engine.

---

## ⚡ Core Architecture & Persistence Design

The backend uses a dynamic persistence model configurable via environment variables:

1. **Local SQLite Persistence (Default)**:
   - Powered by `sql.js-as-sqlite3`, the database instance operates in-memory for speed during development and test configurations.
   - To persist state between server restarts, a custom hook interceptor listens to Sequelize write mutations (e.g., `afterCreate`, `afterUpdate`, `afterDestroy`, `afterBulkCreate`).
   - Upon interception, it writes the raw binary buffer of the in-memory database to the file `database.sqlite` in the workspace root.
2. **Cloud RDS Engine (Production-Ready)**:
   - When RDS environment variables (`RDS_HOSTNAME`, `RDS_USERNAME`, `RDS_PASSWORD`) are detected, the Sequelize engine automatically switches its dialect to connect to an external **MySQL** or **PostgreSQL** cluster.

---

## 🏗️ Folder Structure

```text
ecommerce-backend/
├── defaultData/           # Initial mock data arrays for DB seeding
│   ├── defaultProducts.js
│   ├── defaultDeliveryOptions.js
│   ├── defaultCart.js
│   └── defaultOrders.js
├── images/                # Static local catalog product images
├── models/                # Sequelize Model Schemas
│   ├── index.js           # Database engine selector & SQLite auto-save hooks
│   ├── Product.js         # Product model with keyword serialization getters/setters
│   ├── CartItem.js        # Active cart mappings pointing to products/deliveries
│   ├── DeliveryOption.js  # Shipping speeds, cost, and delivery parameters
│   └── Order.js           # Checkout purchase history containing product items
├── routes/                # Express Route Controllers
│   ├── products.js        # Catalog retrieval and text searches
│   ├── cartItems.js       # CRUD operations for cart adjustments
│   ├── deliveryOptions.js # Shipping options list
│   ├── orders.js          # Order placements and detailed order queries
│   ├── paymentSummary.js  # Live pricing calculations (tax, shipping, pre-tax)
│   └── reset.js           # Database wipes and seed restoring
├── server.js              # Server entry point, schema syncing, and port setup
└── documentation.md       # Full API route details
```

---

## 💾 Database Schema Definitions

### 1. Product Model (`Product.js`)
Stores catalog item specifications.
- `id` (UUID): Primary key, automatically generated.
- `image` (String): Resource path referencing product catalog graphics (served statically).
- `name` (String): Product display title.
- `rating` (JSON): Object containing `{ stars: Number, count: Number }`.
- `priceCents` (Integer): Price formatted in integer cents to prevent floating-point calculation errors.
- `keywords` (String): Serialized array of search tags (automatically converted to/from Javascript arrays using Sequelize `get()` and `set()` hooks).

### 2. Cart Item Model (`CartItem.js`)
Tracks products added to active client carts.
- `productId` (UUID): References `Product.id`.
- `quantity` (Integer): Item count restriction (enforced between 1 and 10 on add).
- `deliveryOptionId` (String): References `DeliveryOption.id`.

### 3. Delivery Option Model (`DeliveryOption.js`)
Defines courier configurations.
- `id` (String): Primary key (e.g. `"1"`, `"2"`, `"3"`).
- `deliveryDays` (Integer): Shipping duration days.
- `priceCents` (Integer): Flat courier fee formatted in integer cents.

### 4. Order Model (`Order.js`)
Archives checkouts.
- `id` (UUID): Primary key, automatically generated.
- `orderTimeMs` (BigInt): Creation epoch millisecond timestamp.
- `totalCostCents` (Integer): Completed transaction total cost.
- `products` (JSON): Raw array of purchase records containing `{ productId, quantity, estimatedDeliveryTimeMs }`.

---

## 🔄 Lifecycle Seeding and DB Synch

On startup:
1. Sequelize executes `sequelize.sync()`, building tables matching database definitions.
2. The server calls `Product.count()`. If the table is empty (`0` records), the backend reads files from `defaultData/` and runs `.bulkCreate()` to pre-seed products, delivery modes, and sample items.

---

## 🔌 API Route Overview

| Route Path | Method | Purpose | Query Params & Body |
| :--- | :--- | :--- | :--- |
| `/api/products` | **GET** | Fetches matching products list | `?search=term` (optional filter) |
| `/api/delivery-options` | **GET** | Fetches shipping courier configurations | `?expand=estimatedDeliveryTime` |
| `/api/cart-items` | **GET** | Returns active cart records | `?expand=product` (resolves product metadata) |
| `/api/cart-items` | **POST** | Adds a product to the cart | Body: `{ productId, quantity }` |
| `/api/cart-items/:productId` | **PUT** | Modifies cart item quantity / delivery speed | Body: `{ quantity, deliveryOptionId }` |
| `/api/cart-items/:productId` | **DELETE**| Removes product from the active cart | None |
| `/api/orders` | **GET** | Returns transaction purchase histories | `?expand=products` (resolves items detail) |
| `/api/orders` | **POST** | Places a new order from current cart | None (empties the cart) |
| `/api/orders/:orderId` | **GET** | Retrieves details for a specific order | `?expand=products` |
| `/api/payment-summary` | **GET** | Computes totals, taxes, and shipping rates | None |
| `/api/reset` | **POST** | Restores database to default initial state | None |

---

## 🚀 Execution Guide

### 1. Installation
Run inside the `ecommerce-backend` folder:
```bash
npm install
```

### 2. Launching in Development Mode
Launches the service on Port `3000` with `nodemon` to watch file changes:
```bash
npm run dev
```

### 3. Launching in Production Mode
Starts the server with standard node engine:
```bash
npm start
```

### 4. Utility Scripts
- `npm run zip`: Invokes `zipFiles.js` to bundle the backend directory contents into a ZIP file using `archiver`.
- `postinstall`: Invokes `patch-package` to patch core node modules in development configurations.
