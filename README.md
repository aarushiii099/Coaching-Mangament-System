Coaching Management System

Backend REST API for managing operations of a coaching institute such as student records, attendance tracking, and attendance management.

This project demonstrates backend architecture, REST API design, database modeling, and modular Node.js application structure.

![Application Preview] (./allScreens.jpg)

## Key Features

### Student Management
- Add new students
- Update student details
- Delete students
- Fetch and search student records

### Attendance Management
- Mark attendance for students
- Track daily attendance records
- Track monthly attendance records
- Retrieve attendance history


### Backend Architecture
- RESTful API design
- Modular MVC-style structure (routes, controllers, models)
- MongoDB database integration using Mongoose
- Clean separation of business logic and routing

Coaching-Mangament-System
│
├── controllers
│   ├── studentController.js
│   ├── attendanceController.js
│   └── userController.js
│
├── models
│   ├── studentModel.js
│   ├── attendanceModel.js
│   └── userModel.js
│
├── routes
│   ├── studentRoutes.js
│   ├── attendanceRoutes.js
│   └── userRoutes.js
│
├── server.js
├── package.json
└── README.md