# RecisCare - Portfolio Demo
A web-based school duty (piket) attendance system developed as a Senior High School Informatics project. RecisCare helps students, teachers, class leaders, and administrators manage daily duty schedules, attendance submissions, and review processes through a centralized application.
> **Portfolio Version:** This repository contains a frontend-only demonstration that runs entirely in the browser using LocalStorage. The original project was built with Supabase for authentication and database services.

---

## Overview
Managing school duty attendance manually often requires teachers to collect photo evidence through messaging applications, verify submissions one by one, and record attendance separately. Students also have limited visibility into submission status and teacher feedback.

RecisCare was developed to centralize the entire duty attendance process. Students submit photo evidence of completed duties, teachers review submissions, class leaders monitor attendance within their classes, and administrators manage users and system data.

For portfolio purposes, the original Supabase backend has been replaced with a LocalStorage-powered demo that preserves the original application workflow without requiring any external services.

---

## Features
* Demo login with four roles

  * Administrator
  * Teacher
  * Class Leader
  * Student
* Duty attendance submission
* Teacher approval and rejection workflow
* Submission history and status tracking
* Class duty schedule monitoring
* User management
* Role-based interface
* Persistent demo database using LocalStorage
* Resettable demo environment

---

## Demo Roles
| Role              | Capabilities                                               |
| ----------------- | ---------------------------------------------------------- |
| **Administrator** | Manage users, roles, and system data                       |
| **Teacher**       | Review, approve, reject, and export attendance submissions |
| **Class Leader**  | Monitor class duty schedules and submission progress       |
| **Student**       | Submit duty evidence and monitor submission status         |

---

## Tech Stack
### Frontend
* HTML5
* CSS3
* Vanilla JavaScript

### Demo Data Layer
* Browser LocalStorage
* Custom JavaScript data abstraction (`DemoStore`)

### Original Backend (Archived)
* Supabase Authentication
* PostgreSQL
* Row Level Security (RLS)

---

## Demo Architecture
```text
Browser
│
├── LocalStorage
│   ├── users
│   ├── schedules
│   ├── submissions
│   └── sessions
│
└── RecisCare
    ├── Administrator
    ├── Teacher
    ├── Class Leader
    └── Student
```

---

## Original Architecture
```text
Users
│
├── Students
├── Teachers
├── Class Leaders
└── Administrators
        │
        ▼
RecisCare
        │
        ▼
Supabase
├── Authentication
├── PostgreSQL
└── Row Level Security
        │
        ▼
Database
├── users
├── schedules
├── submissions
└── classes
```

---

## Project Structure
```text
.
├── assets/
│   ├── css/
│   ├── js/
│   └── logo.png
├── demo/
│   └── demo-data.js
├── pages/
│   ├── student.html
│   ├── teacher.html
│   └── register.html
├── public/
│   └── manifest.json
├── index.html
├── DEMO_ACCOUNTS.md
├── README.md
└── LICENSE
```

---

## Running the Project
1. Clone the repository.
```bash
git clone https://github.com/YOUR_USERNAME/reciscare.git
```
2. Open the project folder.
3. Launch `index.html` using **Live Server** (recommended).
No installation, backend, or environment variables are required.

---

## Demo Workflow
1. Open the application.
2. Select one of the demo roles.
3. Explore the application.
4. All changes are stored locally in your browser.
5. Reset the demo database at any time to restore the initial dataset.

---

## Original Database
The original implementation used several primary tables.
| Table         | Purpose                             |
| ------------- | ----------------------------------- |
| `users`       | User profiles and roles             |
| `schedules`   | School duty schedules               |
| `submissions` | Student duty attendance submissions |
| `classes`     | Class information                   |

The portfolio version replaces these tables with LocalStorage while preserving the application's original workflow.

---

## Learning Outcomes
This project provided experience with:
* Designing a complete web application
* Building responsive user interfaces
* Structuring JavaScript applications
* Designing relational database schemas
* Implementing role-based authorization
* Working with Supabase
* Building LocalStorage-powered frontend demonstrations
* Converting a backend application into a standalone portfolio project

---

## Project Status
This project is archived as a completed Senior High School project.

The original backend has been retired. This repository now serves as a self-contained portfolio demonstration that reproduces the application's core functionality without requiring external infrastructure.

---

## License
This project is available for educational and portfolio purposes.
