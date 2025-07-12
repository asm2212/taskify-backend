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
```
### 🔐 Login and Get JWT Token
```bash
curl -X POST "https://taskify-backend-bsm1.onrender.com/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Passw0rd!"
  }'
```
✅ Create a Task (Requires JWT)

```bash
curl -X POST "https://taskify-backend-bsm1.onrender.com/tasks" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "Finish 1"}'
```
📋 Get All Tasks (With Optional Filters)
```bash
curl -X GET "https://taskify-backend-bsm1.onrender.com/tasks?status=OPEN&limit=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```
📝 Update Task Status
```bash
curl -X PATCH "https://taskify-backend-bsm1.onrender.com/tasks/<TASK_ID>" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "IN_PROGRESS"}'
```
🗑 Delete Task
```bash
curl -X DELETE "https://taskify-backend-bsm1.onrender.com/tasks/<TASK_ID>" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```
👤 Get Authenticated User Profile
```bash
curl -X GET "https://taskify-backend-bsm1.onrender.com/users/profile" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```
🛠 Build & Run Locally
```bash
git clone https://github.com/asm2212/taskify-backend.git
cd taskify-backend
npm install
npm run start:dev

