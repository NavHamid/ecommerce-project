# 🛒 Full-Stack E-Commerce Platform

A modern full-stack e-commerce application built with **React, Node.js, Express, and Sequelize**. Users can browse products, manage a shopping cart, place orders, and track purchases through a responsive interface.

## 🚀 Features

- Browse and search products
- Add, update, and remove cart items
- Dynamic payment summary
- Order placement and order history
- Delivery option selection
- Responsive design
- RESTful API integration
- Component and unit testing with Vitest

---

## 🛠️ Tech Stack

### Frontend
- React 19
- React Router
- Axios
- Vite
- CSS3

### Backend
- Node.js
- Express.js
- Sequelize ORM
- SQLite

### Testing
- Vitest
- React Testing Library

---

## 📁 Project Structure

```
react-course/
│
├── ecommerce-project/      # React Frontend
└── ecommerce-backend/      # Express Backend
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone <repository-url>
cd react-course
```

### Install dependencies

Frontend

```bash
cd ecommerce-project
npm install
```

Backend

```bash
cd ecommerce-backend
npm install
```

---

## ▶️ Run the Application

### Start Backend

```bash
cd ecommerce-backend
npm run dev
```

Runs on:

```
http://localhost:3000
```

### Start Frontend

```bash
cd ecommerce-project
npm run dev
```

Runs on:

```
http://localhost:5173
```

---

## 🧪 Run Tests

```bash
cd ecommerce-project
npx vitest
```

---

## 📌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get products |
| GET | `/api/cart-items` | Get cart |
| POST | `/api/cart-items` | Add item to cart |
| PUT | `/api/cart-items/:id` | Update cart item |
| DELETE | `/api/cart-items/:id` | Remove cart item |
| GET | `/api/orders` | Get orders |
| POST | `/api/orders` | Place order |
| GET | `/api/payment-summary` | Payment summary |

---

## 🎯 Future Improvements

- User Authentication (JWT)
- Stripe Payment Integration
- MongoDB/PostgreSQL Support
- Admin Dashboard
- Product Reviews & Ratings

---


## 🙏 Acknowledgements

Special thanks to **SuperSimpleDev** for the excellent React course and guidance that inspired and supported the development of this project.
