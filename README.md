# 📘 Personal Notes & Bookmark Manager – MERN Stack

A full-stack web application that allows users to manage personal **notes** and **bookmarks**, with features like search, filtering, and JWT authentication. Built using the **MERN stack** (MongoDB, Express, React, Node.js) and styled with **Tailwind CSS**.

---

## 🚀 Tech Stack

| Layer     | Tech                           |
|-----------|--------------------------------|
| Frontend  | React (Vite) + Tailwind CSS    |
| Backend   | Node.js + Express              |
| Database  | MongoDB with Mongoose ORM      |
| Auth      | JWT-based authentication       |

---

## ✅ Features

### 📝 Notes
- Create, update, delete notes
- Add tags to notes (comma-separated)
- Search notes by title/content or filter by tags

### 🔖 Bookmarks
- Save bookmarks with URL, title, description, and tags
- Auto-fetch title from URL if left blank ✅ (Bonus)
- Search and filter bookmarks by keyword or tags

### 🔐 Authentication
- Register/Login using email & password
- Authenticated routes protected using JWT
- Data is scoped to logged-in users only

### 💻 UI
- Fully responsive using Tailwind CSS
- Mobile-friendly layout
- Minimal, clean design

---

## 📁 Project Structure

Personal-Notes-Bookmark-Manager-/
├── client/ # React + Vite frontend
│ ├── .env # VITE_API_BASE_URL
│ ├── src/
├── server/ # Express + MongoDB backend
│ ├── .env # MONGO_URI, JWT_SECRET
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── server.js



---

## 🔧 Installation & Setup

### 📦 Backend Setup

```bash
cd server
npm install



🧪 API Endpoints
🔐 Auth
pgsql
Copy
Edit
POST   /api/auth/register       Register new user
POST   /api/auth/login          Login user (returns token)


📒 Notes
pgsql
Copy
Edit
GET    /api/notes                Get all notes
POST   /api/notes                Create a note
GET    /api/notes/:id            Get a note by ID
PUT    /api/notes/:id            Update a note
DELETE /api/notes/:id            Delete a note



🔖 Bookmarks
pgsql
Copy
Edit
GET    /api/bookmarks            Get all bookmarks
POST   /api/bookmarks            Create a bookmark
GET    /api/bookmarks/:id        Get a bookmark by ID
PUT    /api/bookmarks/:id        Update a bookmark
DELETE /api/bookmarks/:id        Delete a bookmark

