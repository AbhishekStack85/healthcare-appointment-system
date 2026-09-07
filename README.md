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

## 🎯 Demo

### 🌐 Live Application

Open the live application:

https://healthcare-appointment-system-ten.vercel.app

### 👤 Patient Demo

1. Open the application.
2. Click **Get Started** or **Register**.
3. Select **Patient** as the role.
4. Create a patient account.
5. Login with the registered account.
6. Go to **Find Doctors**.
7. Select a doctor.
8. Book an appointment by choosing date and time.
9. Open **My Appointments** to view the appointment.
10. The appointment will initially show **Pending**.
11. After the doctor accepts the appointment, the status changes to **Accepted**.

### 👨‍⚕️ Doctor Demo

1. Register a new account and select **Doctor** as the role.
2. Login with the doctor account.
3. Open **My Appointments**.
4. View patient appointment requests.
5. Click **Accept Appointment** or **Reject**.
6. The appointment status will be updated for the patient.

### 🔄 Complete Demo Flow

```text
Patient
   ↓
Register / Login
   ↓
Find Doctor
   ↓
Book Appointment
   ↓
Pending
   ↓
Doctor Login
   ↓
View Appointment
   ↓
Accept / Reject
   ↓
Patient sees updated status
```
## 🔐 Demo Login Credentials

### 👤 Patient Account

**Email:** test12345@gmail.com 
**Password:** 9155664245

### 👨‍⚕️ Doctor Account

**Email:** dr.rahul2026@test.com
**Password:** Rahul@12345

> These accounts are provided for demonstration purposes.
🔗 Repository
GitHub: https://github.com/AbhishekStack85/healthcare-appointment-system

👨‍💻 Developer
Abhishek Anand
Built as a full-stack project to practice JavaScript, React.js, FastAPI, Python, REST APIs, authentication, and MongoDB integration.
