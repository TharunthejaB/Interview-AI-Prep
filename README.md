# 🚀 Interview AI Prep

An AI-powered interview preparation platform that helps users practice technical questions, improve answers, and get better at interviews.

---

## 🌐 Live Demo

👉 [Link](https://interview-ai-prep-frontend-lms5.onrender.com/)

---

## ✨ Features

* 🔐 User Authentication (Login / Signup)
* 🧠 AI-generated interview questions & answers
* 👤 Profile management (update name & profile picture)
* 📊 Structured learning and practice flow
* ⚡ Fast and responsive UI

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### Deployment

* Render (Frontend + Backend)
* MongoDB Atlas

---

## 📁 Project Structure

```
├── frontend
│   ├── src
│   ├── components
│   └── pages
│
├── backend
│   ├── routes
│   ├── controllers
│   ├── models
│   └── middleware
```

---

## ⚙️ Environment Variables

Create a `.env` file in your backend:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

## 🚀 Run Locally

### 1. Clone the repo

```
git clone https://github.com/TharunthejaBoyalla/Interview-AI-Prep.git
cd Interview-AI-Prep
```

### 2. Install dependencies

#### Backend

```
cd backend
npm install
npm run dev
```

#### Frontend

```
cd frontend
npm install
npm run dev
```

---

## 🔗 API Endpoints (Sample)

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/profile
POST   /api/auth/update-profile
```

---

## 🧪 Future Improvements

* 📄 Resume-based question generation
* 🎙️ Voice-based mock interviews
* 📈 Performance analytics dashboard
* 🌙 Dark mode

---

## 👤 Author

**Tharun Theja**

* GitHub: https://github.com/TharunthejaB

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
