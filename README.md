# 📚 Student Dashboard 📊

A responsive and interactive **Student Dashboard** built using **React** and **Firebase**.  
This app helps students manage their daily academic life with features like to-do lists, assignments, grades, tests, calendar, and profile management.

---

## 🧩 Features

### 🔐 Authentication
- Firebase Authentication with **Email & Password**
- Protected routes using React Context

### ✅ To-Do List
- Add, edit, complete, and delete tasks 📝
- Stored in Firestore 🔥
- Realtime UI updates

### 📆 Calendar View
- Simple monthly calendar
- Visual reference for task planning

### 🧪 Upcoming Tests
- Overview of scheduled exams 🧠

### 🗃️ Assignment Tracker
- Track upcoming or ongoing assignments ✏️

### 📊 Grades Overview
- Visual display of grades (static/mock)

### 👤 Profile Card
- Shows logged-in user info

---

## 🛠️ Tech Stack

| Frontend | Backend / DB | Auth |
|----------|--------------|------|
| React.js ⚛️ | Firebase Firestore 🔥 | Firebase Auth 🔐 |

---

## 📂 Folder Structure

```bash
src/
│
├── App.jsx
├── firebase.js
├── context/
│   └── AuthContext.jsx
├── components/
│   ├── Dashboard.jsx
│   ├── TodoList.jsx
│   ├── AssignmentTracker.jsx
│   ├── CalendarView.jsx
│   ├── GradesOverview.jsx
│   ├── UpcomingTests.jsx
│   └── ProfileCard.jsx
└── routes/
    └── ProtectedRoute.jsx
