# 📌 HRMS Lite – Full-Stack Coding Assignment

## 🚀 Live Application

### 🌐 Frontend (Vercel)
https://hrms-lite-one-rho.vercel.app/

### 🔧 Backend API (Render)
https://hrms-backend-0r61.onrender.com/

### 📦 GitHub Repository
https://github.com/amanvrma798-sys/hrms-lite

---

## 📖 Project Overview

HRMS Lite is a lightweight Human Resource Management System designed to manage employee records and track daily attendance.

This project was developed as part of a Full-Stack Coding Assignment to demonstrate:

- Frontend development
- Backend REST API design
- Database modeling & persistence
- Server-side validation
- Error handling
- Production deployment readiness

The focus is on delivering a clean, stable, and realistically usable system without over-engineering.

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- Lucide React Icons

### Backend
- Django
- Django REST Framework

### Database
- PostgreSQL (Production – Render)
- SQLite (Optional for local development)

### Deployment
- Frontend: Vercel
- Backend: Render

---

## ✨ Core Features

### 1️⃣ Employee Management

Admin can:

- Add new employee with:
  - Employee ID (Unique)
  - Full Name
  - Email Address (Validated)
  - Department
- View list of employees
- Delete employees

#### Server-Side Validation Includes:

- Required field validation
- Email format validation
- Duplicate employee ID prevention
- Duplicate email prevention
- Proper HTTP status codes (200, 201, 400)

#### Example Structured Error Response

```json
{
  "employee_id": ["Employee with this ID already exists."]
}
```

---

### 2️⃣ Attendance Management

Admin can:

- Mark attendance:
  - Date
  - Status (Present / Absent)
- View attendance records per employee
- Prevent duplicate attendance for the same employee on the same date

Database-level unique constraints ensure data integrity.

---

### 3️⃣ Dashboard Summary (Bonus Feature)

Dashboard provides:

- Total Employees
- Present Today
- Absent Today

This gives a quick operational overview of workforce attendance.

---

## 🌐 Live API Endpoints

Base URL:

```
https://hrms-backend-0r61.onrender.com/api/
```

### 📌 Employees

```
GET    /api/employees/
POST   /api/employees/
DELETE /api/employees/{id}/
```

Live:

- https://hrms-backend-0r61.onrender.com/api/employees/
- https://hrms-backend-0r61.onrender.com/api/employees/{id}/

---

### 📌 Attendance

```
POST   /api/attendance/
GET    /api/attendance/list/?employee_id=EMP001
GET    /api/attendance/dashboard/
```

Live:

- https://hrms-backend-0r61.onrender.com/api/attendance/
- https://hrms-backend-0r61.onrender.com/api/attendance/list/?employee_id=EMP001
- https://hrms-backend-0r61.onrender.com/api/attendance/dashboard/

---

## 🧪 How To Test (Evaluator Guide)

1. Open Frontend:
   https://hrms-lite-one-rho.vercel.app/

2. Go to **Employees**:
   - Add employee
   - Try duplicate email → error appears
   - Try duplicate employee ID → error appears
   - Delete employee

3. Go to **Attendance**:
   - Select employee
   - Mark attendance
   - Try marking same date twice → validation works

4. Go to **Dashboard**:
   - View total employees
   - View present & absent counts

All operations are connected to live PostgreSQL database.

---

## 📂 Project Structure

```
hrms-lite/
│
├── backend/
│   ├── config/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── exceptions.py
│   │
│   ├── employees/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   └── views.py
│   │
│   ├── attendance/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   └── views.py
│   │
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## ⚙️ Local Setup

### Backend

```bash
cd backend
python -m venv venv
```

Activate:

Windows:
```
venv\Scripts\activate
```

Mac/Linux:
```
source venv/bin/activate
```

Install dependencies:

```
pip install -r requirements.txt
```

Run migrations:

```
python manage.py migrate
```

Start server:

```
python manage.py runserver
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables (Production)

Backend uses secure environment variables for:

- SECRET_KEY
- Database credentials
- DEBUG flag

No sensitive credentials are stored in GitHub.

---

## ⚠️ Assumptions

- Single admin user (no authentication required)
- Leave management & payroll excluded intentionally
- Designed as lightweight internal HR tool

---

## ✅ Assignment Coverage

- ✔ Employee Management
- ✔ Attendance Tracking
- ✔ RESTful APIs
- ✔ Database Persistence
- ✔ Server-side Validation
- ✔ Error Handling
- ✔ Clean Professional UI
- ✔ Live Deployment

---

## 👨‍💻 Final Note

This project fulfills all requirements of the Full-Stack Coding Assignment and demonstrates practical full-stack development capability including frontend, backend, database design, validation, and deployment.

The application is fully functional, publicly accessible, and production-ready.
