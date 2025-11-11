# FERO Fullstack Take-Home Assignment

This is a small full-stack project simulating a checkout flow.  
It includes a **React frontend** and a **PHP backend**.

---

## Project Structure

FERO-Assignment/
├─ frontend/fero # React app (Next.js)
├─ backend/ # PHP API
│ ├─ data/ # JSON files with cart and payment data
│ │ ├─ cart.json
│ │ └─ payment-methods.json
│ └─ index.php # PHP API entry point
└─ README.md

---

## Backend (PHP)

### Requirements

- PHP 7.4+ (XAMPP or local PHP installation)
- No database required, data is hardcoded in JSON files.

### Run Backend

1. Open terminal in `backend/` folder:
   ```bash
   cd backend
   ```
2. Start PHP built-in server:
   php -S localhost:8000
3. API Endpoints:
   GET /cart → Returns cart items
   GET /payment-methods → Returns payment options
   POST /pay → Accepts cart, shipping, and payment info, returns success/failure

### Run Frontend

1. Open teminal in `frontend/fero` folder
   ```bash
   cd frontend/fero
   npm install
   ```
2. Create a .env.local file with the backend URL:
   NEXT_PUBLIC_API_URL=http://localhost:8000
3. Start development server:
   npm run dev
4. Open in browser:
   http://localhost:5173
   or the URL shown in terminal.

### Features

3-Step Checkout Flow 1. Cart Review → Fetch and display cart items, show total 2. Shipping Info → Form with basic validation (name, email, address, phone) 3. Payment → Fetch payment methods, select one, simulate payment submission

Global State Management
Cart, shipping, and payment info persist across steps using React Context.

Error and Loading States
Displays loading indicators and error messages for API calls.

Styling
Tailwind CSS for basic styling.

### Notes

1. Data is hardcoded in backend/data/ to simplify setup.
2. Images in cart items are served via public URLs; can be replaced with local images in frontend/public/images.
3. Backend supports CORS for local development.
4. This project is designed to be easily run locally without any external dependencies.

### How to Submit

1. Include the full project repository with frontend and backend folders.
2. Make sure .env.local file is included with instructions, but do not include sensitive keys.

---
