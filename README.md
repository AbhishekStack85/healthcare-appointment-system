# 🏥 Healthcare Appointment Management System

A full-stack healthcare appointment management system that connects patients and doctors through a simple appointment booking platform.

## 🚀 Live Demo

https://healthcare-appointment-system-ten.vercel.app

## 📌 Features

### 👤 Patient
- Patient registration and login
- JWT-based authentication
- View available doctors
- Book appointments
- View booked appointments
- Cancel appointments
- Track appointment status

### 👨‍⚕️ Doctor
- Doctor login
- View patient appointments
- View appointment details
- Accept or reject appointments
- Track appointment status

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- React Router
- Vite

### Backend
- Python
- FastAPI
- REST APIs
- JWT Authentication
- Password Hashing

### Database
- MongoDB Atlas

### Deployment
- Vercel — Frontend
- Render — Backend
- MongoDB Atlas — Database

## 🏗️ Project Architecture

```text
React.js Frontend
       ↓
FastAPI Backend
       ↓
MongoDB Atlas
       ↓
FastAPI Response
       ↓
React.js UI
```
🔐 Authentication

The application uses:

JWT-based authentication
Password hashing
Role-based access for patients and doctors
Protected backend APIs

📂 Project Structure
```text
healthcare-appointment-system/
│
├── backend/
│   ├── database/
│   ├── models/
│   ├── routes/
│   ├── auth.py
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```
⚙️ Run Locally
```text
1. Clone the repository
git clone https://github.com/AbhishekStack85/healthcare-appointment-system.git
cd healthcare-appointment-system

2. Backend Setup
cd backend
python -m venv venv

Activate the virtual environment:
Windows:venv\Scripts\activate
Install dependencies:pip install -r requirements.txt
Create a .env file:MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Start the backend:uvicorn main:app --reload
Backend will run at:http://127.0.0.1:8000
```
3. Frontend Setup
```text
Open another terminal:
cd frontend
npm install
npm run dev
Frontend will run at:http://localhost:5173
```
🔗 Repository
GitHub: https://github.com/AbhishekStack85/healthcare-appointment-system

👨‍💻 Developer
Abhishek Anand
Built as a full-stack project to practice JavaScript, React.js, FastAPI, Python, REST APIs, authentication, and MongoDB integration.
