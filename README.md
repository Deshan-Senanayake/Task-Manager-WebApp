# 📋 Task Manager Web App

A full-stack **Task Management Web Application** built with **React**, **Express**, and **MongoDB**. It allows users to register, log in, manage tasks (create, update, delete, filter), and securely access their dashboard.

---

## 🚀 Live Preview

**Local:**

```
Frontend: http://localhost:5173
Backend:  http://localhost:5000
```

---

## 🧩 Features

- 🧑‍💻 User Registration & Login (JWT Auth)
- ✅ Create, Update, Delete Tasks
- 🔍 Search & Live Filter Tasks
- 🟢 Toggle Completion Status
- 🔒 Protected Dashboard (only logged-in users)
- 📱 Responsive Design with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend

- **React** + Vite
- **React Router DOM** for routing
- **Context API** for auth state
- **Tailwind CSS** for styling
- **Axios** for HTTP requests

### Backend

- **Node.js** with **Express**
- **MongoDB** with **Mongoose**
- **bcryptjs** for hashing passwords
- **jsonwebtoken (JWT)** for secure sessions

---

## 🧪 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/task-manager-app.git
cd task-manager-app
```

### 2. Setup the Backend

```bash
cd backend
npm install
```

- Create a `.env` file in the `/backend` folder:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskapp
JWT_SECRET=yourSecretKey
```

- Start the backend:

```bash
npm run dev
```

### 3. Setup the Frontend

```bash
cd ../frontend
npm install
npm run dev
```

---

## 📁 Folder Structure

```
task-manager-app/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
```

---

## 🛡️ Environment Variables

Backend `.env` should contain:

```env
PORT=5000
MONGO_URI=<your_mongo_connection>
JWT_SECRET=<your_jwt_secret>
```

---

## 🧑‍🎓 Author

**Deshan Senanayake**\
📫 GitHub: [@Deshan-Senanayake](https://github.com/Deshan-Senanayake)

---

## 📦 Deployment

You can deploy this project using:

- **Frontend:** Vercel / Netlify / Surge
- **Backend:** Render / Cyclic / Railway / Heroku (MongoDB must be accessible)
- **Database:** MongoDB Atlas (recommended for production)

Need help with deployment? Just ask! ✅

