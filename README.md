# 💰 Finance Tracker App

A full-stack finance tracker application built with **React (frontend)**, **Express (backend)**, and **MongoDB (database)**. This app uses **Clerk Authentication** (Google & Apple OAuth) for seamless login, and **NLP (Natural Language Processing)** to automatically categorize expenses.

---

## 🚀 Features

### 🔐 Authentication
- Google OAuth (for Android & Web users)
- Apple ID OAuth (for iOS users)

### 📊 Dashboard
- View income and expense insights
- Add income

### 🧾 Expenses
- Add expenses in natural language (e.g., *"Coffee at Starbucks $6.50"*)
- NLP automatically categorizes the expense before saving
- Expenses are stored in MongoDB

### 📈 Data Analysis
- Analyze and visualize expenses and income on the dashboard

---

## 🛠️ Tech Stack
- **Frontend:** React + Vite + TailwindCSS
- **Backend:** Express.js + Node.js
- **Database:** MongoDB
- **Authentication:** Clerk (Google & Apple OAuth)
- **NLP:** Compromise.js (or chosen NLP library)

---

## 📂 Project Structure

```
project-root/
│── frontend/      # React application
│── backend/       # Express API + MongoDB connection
│── README.md
```

---

## ⚙️ Environment Variables

### 🔑 Backend (`/backend/.env`)
```env
MONGO_URI=mongodb+srv://patijanardhanbabu143_db_user:evIGVMwUKcfFLgNq@cluster0.yyktbad.mongodb.net/ExpenseTracker
PORT=5000
```

### 🔑 Frontend (`/frontend/.env.local`)
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_c3VwZXItZG9nLTY4LmNsZXJrLmFjY291bnRzLmRldiQ
```
> ⚠️ Never share your private Clerk secret key. Only use the publishable key in the frontend.

---

## 🖥️ Setup & Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/janardhanbabu666/Smart-Finance-Tracker
cd Smart-Finance-Tracker
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
npm run dev
```
- Runs Express server on [http://localhost:5000](http://localhost:5000)

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
- Runs React app on [http://localhost:5173](http://localhost:5173) (default Vite port)

---

## 🔄 Application Flow

1. User logs in via Google/Apple OAuth (Clerk).
2. If new user → account is created seamlessly.
3. User is redirected to Dashboard:
   - Add income
   - View financial insights
4. In the Expenses tab:
   - Add expenses via text input
   - NLP auto-categorizes the expense
   - Expenses are stored in MongoDB

---

## 🧪 Example Expense Entry

**Input:**
```
Pizza at Dominos $15
```

**NLP Output:**
- Item: Pizza at Dominos
- Amount: $15
- Category: Food

---

## 📌 Scripts

### Backend
```bash
npm install   # Install dependencies
npm run dev   # Start Express server with Nodemon
```

### Frontend
```bash
npm install   # Install dependencies
npm run dev   # Start React app
```

---

## ✅ Future Enhancements
- Add budgeting goals
- Generate monthly expense reports
- Push notifications/reminders
- Mobile-friendly UI/UX improvements

