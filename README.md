# Quiz Builder

Full‑stack Quiz Builder application built with **Next.js (frontend)**, **NestJS (backend)**, **Prisma ORM**, and **PostgreSQL**.

The app allows users to:

* View all quizzes
* Create a new quiz with different question types
* Delete quizzes

---

## Tech Stack

* **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS, Axios, React Hook Form, Zod
* **Backend:** NestJS, TypeScript
* **Database:** PostgreSQL
* **ORM:** Prisma

---

## ⚙️ Prerequisites

Make sure you have installed:

* Node.js >= 18
* npm or yarn
* PostgreSQL
  
---

## 🚀 Getting Started

### Clone repository

```bash
git clone https://github.com/your-username/quiz-builder.git
cd quiz-builder
```

---

## Database Setup (PostgreSQL + Prisma)

### 1. Create PostgreSQL database

```sql
CREATE DATABASE quiz_builder;
```

### 2. Backend environment variables

Create `backend/.env`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/quiz_builder"
PORT=3001
```

> Update username/password if needed.

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Run Prisma migrations

```bash
npx prisma migrate dev
npx prisma generate
```

---

## Backend (NestJS)

### Start backend server

```bash
cd backend
npm run start:dev
```

Backend will be available at:

```
http://localhost:3001
```

### Available API endpoints

* `POST /quizzes` – create quiz
* `GET /quizzes` – get all quizzes
* `GET /quizzes/:id` – get quiz by id
* `DELETE /quizzes/:id` – delete quiz

---

## Frontend (Next.js)

### 1. Frontend environment variables

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Start frontend

```bash
npm run dev
```

Frontend will be available at:

```
http://localhost:3000
```

---

## Creating a Sample Quiz

1. Open browser and go to:

```
http://localhost:3000/quizzes
```

2. Click **"Create New Quiz"**

3. Enter:

* Quiz title
* Add one or more questions
* Select question type:

  * `INPUT` – short answer
  * `BOOLEAN` – true / false
  * `CHECKBOX` – multiple choice

4. For `CHECKBOX` questions, add answer options

5. Click **Create Quiz**

<img width="1566" height="873" alt="image" src="https://github.com/user-attachments/assets/c6e31a24-e4f5-4b0a-8a9b-c77c37b3b6e1" />
<br />
<img width="1594" height="663" alt="image" src="https://github.com/user-attachments/assets/efaefbe4-4017-4b85-97e0-05b8ff65b012" />
<br />
<img width="1579" height="611" alt="image" src="https://github.com/user-attachments/assets/aa8a053d-26c4-4a0e-bbb2-23e0a2078744" />
