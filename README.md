# 🛒 Full-Stack Ecommerce Project

A full-stack ecommerce web application built while learning full-stack development from SuperSimpleDev. The project is divided into a **React frontend** and a **Node.js + Express backend**, communicating through REST APIs to simulate a real-world online shopping experience.

---

## 📂 Project Structure

```text
.
├── ecommerce-project/      # React Frontend
└── ecommerce-backend/      # Node.js + Express Backend
```

### Frontend (`ecommerce-project/`)

Built with **React**, the frontend provides a responsive shopping experience with:

* 🏠 Home page with product catalog
* 🔍 Product search functionality
* 🛒 Shopping cart management
* ✏️ Update item quantities
* 🚚 Select delivery options
* 💳 Checkout process
* 📦 Order history
* 📍 Order tracking
* ✅ Unit and component tests

---

### Backend (`ecommerce-backend/`)

Built with **Node.js** and **Express**, the backend provides REST APIs for:

* Products
* Shopping cart
* Orders
* Delivery options

It also includes:

* Model files
* Sample JSON data
* API routes
* Express server configuration

---

## ✨ Features

* Browse products
* Search for products
* Add products to the cart
* Update cart quantities
* Choose delivery options
* Complete the checkout process
* View previous orders
* Track order status
* Frontend and backend integration using REST APIs

---

## 🛠️ Tech Stack

### Frontend

* React
* JavaScript (ES6+)
* HTML5
* CSS3
* Axios

### Backend

* Node.js
* Express.js
* REST API

### Testing

* Vitest
* React Testing Library

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Install dependencies

Install packages in both folders:

```bash
cd ecommerce-project
npm install
```

```bash
cd ../ecommerce-backend
npm install
```

### 3. Start the backend

```bash
cd ecommerce-backend
npm start
```

### 4. Start the frontend

```bash
cd ecommerce-project
npm run dev
```

The frontend will connect to the backend API, allowing you to explore the complete ecommerce workflow.

---

## 🎯 Learning Objectives

This project was built as part of my full-stack development learning journey using the SuperSimpleDev course. It helped me gain practical experience with:

* React component architecture
* State management
* REST API integration
* Express.js server development
* CRUD operations
* Testing React applications
* Building a complete full-stack application

---

## 📌 Future Improvements

* User authentication
* Payment gateway integration
* Admin dashboard
* Product reviews and ratings
* Wishlist functionality
* Responsive design improvements
* Database integration (MongoDB/PostgreSQL)
* Deployment with Render and Vercel

---

## 🙏 Acknowledgements

This project was built while learning full-stack development through the **SuperSimpleDev** course. It has been a valuable hands-on project for understanding how frontend and backend applications work together in a real-world ecommerce environment.
