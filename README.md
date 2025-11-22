# 🎮 MyKart - Frontend

The official frontend for the **MyKart** e-commerce platform. Built with **React 18**, this Single Page Application (SPA) provides a seamless shopping experience for gamers, connecting to a Spring Boot microservices backend via a central API Gateway.

<img width="1500" height="1500" alt="image" src="https://github.com/user-attachments/assets/1b1facc5-7210-49e8-adbc-975f056a80ae" />


---

## 🚀 Features

### 🛍️ **Shopping Experience**
* **Dynamic Home Page:** Showcases "Today's Best Deals" and a curated list of top gaming brands (Logitech, Razer, Alienware, etc.).
* **Product Catalog:** Browse products with filtering by brand and category.
* **Product Details:** Rich product pages with high-quality images, specifications, and real-time stock status.
* **Search:** Efficient search functionality to find specific gaming gear.

### 👤 **User Account**
* **Secure Authentication:** JWT-based Login and Sign-up with automatic token management.
* **Profile Management:** Update personal details and manage saved shipping addresses.
* **Wishlist:** Save favorite items for later purchase.
* **Shopping Cart:** Fully functional cart with quantity adjustments, price summaries, and dynamic delivery charge calculation.

### 💼 **Seller Portal**
* **Seller Login:** Dedicated entry point for sellers to manage their inventory and business profile.

---

## 📸 Screenshots

| **Home Page** | **Product Details** |
|:---:|:---:|
| ![Home Page Screenshot](path/to/home-screenshot.png) | ![Product Page Screenshot](path/to/product-page-screenshot.png) |
| *Browse top deals and brands* | *View specs and add to cart* |

| **Shopping Cart** | **Login Screen** |
|:---:|:---:|
| ![Cart Screenshot](path/to/cart-screenshot.png) | ![Login Screenshot](path/to/login-screenshot.png) |
| *Manage items and checkout* | *Secure authentication* |

---

## 🛠️ Tech Stack

* **Core:** [React 18](https://reactjs.org/), JavaScript (ES6+)
* **Routing:** [React Router v6](https://reactrouter.com/)
* **State Management:** React Context API (`AuthProvider`)
* **Networking:** [Axios](https://axios-http.com/) (Centralized instance with Interceptors)
* **Styling:** Custom CSS, Responsive Grid Layouts
* **Icons:** React Icons, FontAwesome
* **Notifications:** React Toastify
* **Image Optimization:** ImageKit.io React SDK

---

## 📂 Project Structure

This project follows a feature-based directory structure for better scalability and maintenance.

```text
MyKart-Frontend/
├── .env                     # Environment variables (Gateway URL)
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies and scripts
├── public/                  # Static assets
│   ├── images/              # Brand logos (Logitech.png, Razer.png, etc.)
│   ├── index.html           # HTML entry point
│   └── manifest.json        # PWA manifest
└── src/
    ├── App.js               # Main App component & Routing configuration
    ├── index.js             # Application entry point
    ├── App.css              # Global styles
    │
    ├── Auth/                # Authentication Logic
    │   └── AuthProvider.jsx # Context for User ID, Login/Logout state
    │
    ├── Components/          # Reusable UI Components
    │   ├── NavBar/          # Navigation Bar component
    │   └── CustomComponents/# Shared widgets
    │       ├── Cards.jsx    # Brand & Product Cards
    │       ├── CustomButtons.jsx
    │       ├── CustomInputs.jsx
    │       ├── Loader.jsx
    │       ├── Modals.jsx
    │       ├── ProductCard.jsx
    │       ├── Rating.jsx
    │       ├── SkeletonLoader.jsx
    │       └── Toast.js
    │
    ├── Controller/          # API Integration Layer
    │   ├── api.js           # Central Axios instance with Interceptors
    │   ├── ProductController.jsx
    │   ├── SellerController.jsx
    │   ├── UserActivityController.jsx
    │   └── UserController.jsx
    │
    ├── Function/            # Utility Functions
    │   └── GenericFunctions.js # JWT Parsing, Validation helpers
    │
    └── Screens/             # Page Views
        ├── Cart/            # Shopping Cart Page
        ├── Home/            # Landing Page
        ├── Login/           # User Login & Signup
        ├── Product/         # Individual Product Details
        ├── Profile/         # User Profile & Address Management
        ├── Search/          # Search Results Page
        ├── Seller/          # Seller Authentication
        └── WishList/        # User Wishlist
```
# 🛠️ Setup & Installation Guide

This document provides step-by-step instructions to set up and run the **MyKart Frontend** application locally.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:

* **Node.js**: v16.0.0 or higher
* **npm** (Node Package Manager): v8.0.0 or higher
* **Git**: For cloning the repository
* **MyKart Backend**: The backend microservices must be running locally (specifically the **API Gateway** on port `8080`).
* **MyKart Url**: https://github.com/harshdesai695/My-Kart_Backend

---

## ⚙️ Configuration

The application relies on a connection to the API Gateway. You can configure this using environment variables.

1.  **Navigate to the project root:**
    ```bash
    cd MyKart-Frontend
    ```

2.  **Create an Environment File:**
    Create a file named `.env` in the root directory (if it doesn't already exist).

3.  **Add the Gateway URL:**
    Add the following line to `.env` to point to your local API Gateway:
    ```env
    REACT_APP_API_GATEWAY_URL=http://localhost:8080
    ```
    *Note: The application defaults to `http://localhost:8080` if this is not set, but using the `.env` file is recommended for flexibility.*

---

## 📥 Installation

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/yourusername/mykart-frontend.git](https://github.com/yourusername/mykart-frontend.git)
    ```

2.  **Install Dependencies:**
    Navigate to the project folder and install the required Node packages:
    ```bash
    npm install
    ```
    *This might take a few minutes as it installs React, Axios, and other UI libraries.*

---

## 🚀 Running the Application

### Development Mode
To start the application in development mode with hot-reloading enabled:

```bash
npm start
