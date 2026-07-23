# 🚗 Apex Motors - Car Dealership Inventory System (TDD Kata)

A full-stack, production-grade **Car Dealership Inventory & Showroom System** built using **Node.js, Express, MongoDB (Mongoose)** for the backend API and **React, Tailwind CSS, HTML5, CSS3** for the frontend single-page application (SPA).

This project strictly adheres to **Test-Driven Development (TDD)** principles, clean architecture, role-based access control (RBAC), and AI co-authorship guidelines.

---

## 📸 Overview & Features

### 🔐 User & Admin Authentication (JWT + RBAC)
- **Customer Registration & Login**: Authenticates users and generates JWT tokens.
- **Admin Role Support**: Admin registration via secret key (`admin123secret`). Grants access to Add, Edit, Delete, and Restock inventory.

### 🚘 Vehicle Inventory & Search Engine
- **Live Dealership Grid**: Displays high-resolution vehicle cards, price formatting, category badges, and VIN tracking.
- **Dynamic Search & Filtering**: Multi-parameter search by Make, Model, VIN, Category (Electric, Sports, Sedan, SUV, Luxury, Truck), Price Slider ($20k–$300k), and In-Stock toggle.

### 📦 Inventory Control & Business Logic
- **Instant Purchase**: Decreases stock quantity by 1. **Automatically disables the purchase button when quantity reaches 0**.
- **Admin Restock Controls**: Restock modal with quick +1, +5, +10, +25 unit increments.
- **CRUD Operations**: Admin forms to create new vehicles, edit existing specifications, or delete entries.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Backend API** | Node.js, Express.js (JavaScript CommonJS) |
| **Database** | MongoDB with Mongoose ORM |
| **Backend Testing** | Jest, Supertest, `mongodb-memory-server` |
| **Frontend SPA** | React 18, HTML5, CSS3, JavaScript (JSX) |
| **Styling** | Tailwind CSS + Custom Glassmorphism System |
| **Frontend Testing**| Vitest, React Testing Library, jsdom |
| **Icons** | Lucide React |

---

## 🚀 Quickstart & Local Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) running locally on `mongodb://localhost:27017` (or MongoDB Atlas connection URI).

---

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create your local environment file
copy .env.example .env

# Start MongoDB locally (Docker option)
docker compose up -d

# (Optional) Seed database with sample luxury vehicles & admin credentials
node src/seed.js

# Run tests using Jest (Uses mongodb-memory-server, no local Mongo required for tests!)
npm test

# Start backend development server (Runs on http://localhost:5000)
npm run dev
```

> If you prefer not to use Docker, make sure MongoDB is running locally on port 27017 and keep the same MONGODB_URI value in your .env file.

#### Default Seed Credentials:
Admin registration requires a server-configured secret key stored in the environment variables.

Admin Secret Key: Configure `ADMIN_SECRET_KEY` in your local `.env` file.

### 2. Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run frontend unit tests using Vitest
npm test

# Start Vite dev server (Runs on http://localhost:3000)
npm run dev
```

---

## 🧪 Comprehensive Test Report

### Backend Test Suite (Jest & Supertest)
```text
PASS tests/vehicles.test.js
  Vehicle Management Endpoints (TDD JS)
    GET /api/vehicles
      ✓ should return all vehicles when authenticated (61 ms)
      ✓ should return 401 if unauthenticated (38 ms)
    GET /api/vehicles/search
      ✓ should filter vehicles by make (42 ms)
      ✓ should filter vehicles by category (54 ms)
      ✓ should filter vehicles by price range (38 ms)
    POST /api/vehicles
      ✓ should allow admin to create a new vehicle (44 ms)
      ✓ should deny non-admin from creating a vehicle with 403 (38 ms)
    PUT /api/vehicles/:id
      ✓ should allow admin to update a vehicle (51 ms)
    DELETE /api/vehicles/:id
      ✓ should allow admin to delete a vehicle (52 ms)
      ✓ should reject standard user from deleting a vehicle with 403 (33 ms)

PASS tests/auth.test.js
  Auth API Endpoints (TDD JS)
    POST /api/auth/register
      ✓ should register a new user successfully and return JWT token (180 ms)
      ✓ should register an admin user if valid adminSecret is provided (109 ms)
      ✓ should return 400 error if email is already in use (120 ms)
      ✓ should return 400 if required fields are missing (22 ms)
    POST /api/auth/login
      ✓ should login successfully with correct credentials (206 ms)
      ✓ should fail login with wrong password (194 ms)
      ✓ should fail login with non-existent email (126 ms)

PASS tests/inventory.test.js
  Inventory Transactions API (TDD JS)
    POST /api/vehicles/:id/purchase
      ✓ should successfully purchase a vehicle and decrement stock quantity (47 ms)
      ✓ should return 400 error when attempting to purchase an out-of-stock vehicle (40 ms)
    POST /api/vehicles/:id/restock
      ✓ should allow admin to restock a vehicle quantity (43 ms)
      ✓ should reject non-admin from restocking a vehicle (32 ms)

Test Suites: 3 passed, 3 total
Tests:       21 passed, 21 total
Time:        12.582 s
```

### Frontend Test Suite (Vitest & React Testing Library)
```text
 ✓ src/tests/VehicleCard.test.jsx  (2 tests) 98ms

 Test Files  1 passed (1)
      Tests  2 passed (2)
   Duration  2.51s
```

---

## 🤖 My AI Usage

## 🤖 AI-Assisted Development

AI tools were used as development assistants during this project for:

- Brainstorming architecture and feature ideas
- Explaining technical concepts
- Generating initial code suggestions
- Debugging and troubleshooting
- Reviewing implementation approaches
- Improving test coverage

The project was reviewed, tested, customized, and integrated by the developer. The developer is responsible for understanding the application architecture, business logic, authentication flow, inventory operations, and implementation decisions.



## 📂 Project Structure

```
INCB ANTI/
├── backend/
│   ├── src/
│   │   ├── config/ (db.js)
│   │   ├── controllers/ (authController.js, vehicleController.js, inventoryController.js)
│   │   ├── middleware/ (authMiddleware.js, errorMiddleware.js)
│   │   ├── models/ (User.js, Vehicle.js)
│   │   ├── routes/ (authRoutes.js, vehicleRoutes.js)
│   │   ├── app.js
│   │   ├── server.js
│   │   └── seed.js
│   ├── tests/
│   │   ├── auth.test.js
│   │   ├── vehicles.test.js
│   │   └── inventory.test.js
│   ├── jest.config.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/ (Navbar, HeroBanner, VehicleCard, VehicleGrid, VehicleFilter, Modals, Toast)
│   │   ├── context/ (AuthContext.jsx, VehicleContext.jsx)
│   │   ├── services/ (api.js)
│   │   ├── tests/ (VehicleCard.test.jsx, setup.js)
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── README.md
├── PROMPTS.md
└── .gitignore
```
