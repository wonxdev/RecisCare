# RecisCare

## Project Overview
RecisCare is a demo Progressive Web App for a school cleaning-duty and assignment workflow. The project preserves the original student/teacher experience while running fully offline with a localStorage data layer.

## Features
- Offline demo mode with local persistence
- Role-based access for Administrator, Teacher, Class Leader, and Student
- Cleaning-duty attendance workflow
- Assignment creation and status tracking
- User management for admin demo role

## Technologies
- HTML
- CSS
- Vanilla JavaScript

## Folder Structure
- index.html — launch page and role selection
- student.html — student dashboard
- teacher.html — teacher, class leader, and admin dashboard
- register.html — disabled registration placeholder
- app.js — centralized offline data layer and demo auth helpers
- style.css — shared UI styling
- manifest.json — PWA manifest
- assets/ — static assets

## Demo Accounts
- Administrator: admin@reciscare.demo / admin123
- Teacher: teacher@reciscare.demo / teacher123
- Class Leader: leader@reciscare.demo / leader123
- Student A: siswaa@reciscare.demo / student123
- Student B: siswab@reciscare.demo / student123

## Local Storage Architecture
The app uses a single localStorage key, reciscare-demo-db, to persist users, schedule, attendance, assignments, and assignment status. Demo auth state is stored with reciscare-demo-role and reciscare-demo-user.

## Screenshot Placeholders
- Student dashboard overview
- Teacher assignment management
- Admin user management

## Installation
No installation is required.

## Running Locally
Open index.html in a browser or serve the folder with any static file server.

## Project Limitations
- This is a portfolio demo, not a production backend system.
- Registration is intentionally disabled.
- File uploads are simulated through local entries rather than real storage.

## Original School Project Context
This repository preserves the spirit of the original school project while converting it into a fully offline, portfolio-friendly demonstration.

## License
MIT