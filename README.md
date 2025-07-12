# Taskify Backend API

![Node.js](https://img.shields.io/badge/Node.js-22.x-green)
![NestJS](https://img.shields.io/badge/NestJS-11-red)
![MongoDB](https://img.shields.io/badge/MongoDB-8.0-green)
![Render](https://img.shields.io/badge/Deployed%20on-Render-46e3b7)

A production-ready task management REST API built with NestJS, MongoDB, and JWT-based authentication.

---

## 🚀 Live Demo

**Base URL:** `https://taskify-backend-bsm1.onrender.com`

[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/YOUR_COLLECTION_ID)

---

## 🔑 API Endpoints

### 🧑‍💼 Auth

| Method | Endpoint       | Description              |
|--------|----------------|--------------------------|
| POST   | `/auth/signup` | Register new user        |
| POST   | `/auth/login`  | Login and get JWT token  |

### ✅ Tasks

| Method | Endpoint     | Description                        |
|--------|--------------|------------------------------------|
| POST   | `/tasks`     | Create a new task (protected)      |
| GET    | `/tasks`     | Get all tasks (filter supported)   |
| PATCH  | `/tasks/:id` | Update task status (protected)     |
| DELETE | `/tasks/:id` | Delete task by ID (protected)      |

### 👤 Users

| Method | Endpoint        | Description                     |
|--------|------------------|---------------------------------|
| GET    | `/users/profile` | Get authenticated user profile  |

---

## 🔐 Example Requests

### 📌 Register a User

```bash
curl -X POST "https://taskify-backend-bsm1.onrender.com/auth/signup" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Passw0rd!"
  }'
