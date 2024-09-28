# Classroom Management System

## Project Overview

This project is a **Classroom Management System** designed to help principals, teachers, and students manage classroom activities efficiently. The system provides distinct dashboards and functionalities for each user role:

- **Principal**: Can create timetables, assign teachers to classes, create teacher logins, and manage other administrative tasks.
- **Teacher**: Can log in, manage students, provide class notes, and view timetables.
- **Student**: Can log in, view timetables, and access provided notes.

The system is built using **React.js** for the frontend and **Node.js/Express.js** with **MongoDB** for the backend. It employs **JWT (JSON Web Tokens)** for secure authentication and **role-based access control**.

---

## Features

### 1. **Principal Features**
- Login/Logout
- Create and manage timetables.
- Manage teachers and students.
- Generate timetables for specific classes.
- Edit and delete existing timetables.
- Create teacher logins.

### 2. **Teacher Features**
- Login/Logout
- View timetables assigned to their class.
- Create student accounts.
- Provide class notes.
- View their assigned timetable.

### 3. **Student Features**
- Login/Logout
- View assigned timetable.
- Access and download notes provided by teachers.

---

## Technologies Used

### **Frontend**
- **React.js**: For building the user interface.
- **Tailwind CSS**: For styling the components.
- **React Router**: For managing routing within the app.
- **Axios**: For making API requests to the backend.
- **jspdf & jspdf-autotable**: For generating and downloading timetables as PDF.

### **Backend**
- **Node.js**: For building the server-side application.
- **Express.js**: For managing the API routes and business logic.
- **MongoDB**: A NoSQL database for storing user and timetable data.
- **Mongoose**: For object data modeling (ODM) in MongoDB.
- **JWT**: For secure user authentication and role-based access control.
  
---
