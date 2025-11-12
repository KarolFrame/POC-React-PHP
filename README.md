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
├─ start.sh # Script to start backend and frontend easily
└─ README.md

---

## Backend (PHP)

### Requirements

- PHP 7.4+ (XAMPP or local PHP installation)
- No database required, data is hardcoded in JSON files.

### Run Backend Manually

1. Open terminal in `backend/` folder:

   ```bash
   cd backend
   ```

2. Start PHP built-in server:

   ```bash
   php -S localhost:8000
   ```

3. API Endpoints:

   - `GET /cart` → Returns cart items
   - `GET /payment-methods` → Returns payment options
   - `POST /pay` → Accepts cart, shipping, and payment info, returns success/failure

---

## Frontend (React)

### Requirements

- Node.js 16+
- npm or yarn

### Run Frontend Manually

1. Open terminal in `frontend/fero` folder:

   ```bash
   cd frontend/fero
   npm install
   ```

2. Create a `.env.local` file with the backend URL:

   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

3. Start development server:

   ```bash
   npm run dev
   ```

4. Open in browser:

   ```
   http://localhost:5173
   ```

   or the URL shown in terminal.

---

## Run Both Frontend and Backend Easily

A helper script `start.sh` is included in the project root. This script will:

- Start the PHP backend in the background
- Install frontend dependencies if needed
- Create `.env.local` if it does not exist
- Start the React frontend
- Stop the backend automatically when the frontend is stopped

### Usage

1. Give execute permissions:

   ```bash
   chmod +x start.sh
   ```

2. Run the script from the project root:

   ```bash
   ./start.sh
   ```

3. The backend will run at [http://localhost:8000](http://localhost:8000) and the frontend at [http://localhost:5173](http://localhost:5173).

---

## Features

1. **3-Step Checkout Flow**

   - **Cart Review** → Fetch and display cart items, show total
   - **Shipping Info** → Form with basic validation (name, email, address, phone)
   - **Payment** → Fetch payment methods, select one, simulate payment submission

2. **Global State Management**
   Cart, shipping, and payment info persist across steps using React Context.

3. **Error and Loading States**
   Displays loading indicators and error messages for API calls.

4. **Styling**
   Tailwind CSS for basic styling.

---

## Notes

1. Data is hardcoded in `backend/data/` to simplify setup.
2. Images in cart items are served via public URLs; can be replaced with local images in `frontend/public/images`.
3. Backend supports CORS for local development.
4. The project is designed to be easily run locally without any external dependencies.

---

## How to Submit

1. Include the full project repository with frontend and backend folders.
2. Make sure `.env.local` file is included with instructions, but do **not** include sensitive keys.
