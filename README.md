# 🚀 ChatApp

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)
![React](https://img.shields.io/badge/react-%5E18.2.0-blue)

> A polished full-stack real-time chat app with authentication, media upload, and chat history.

---

## 🌟 Highlights

- ✅ Auth (JWT) with registration/login
- ✅ Web chat architecture (Socket-ready)
- ✅ User profile + avatar image upload (Cloudinary)
- ✅ Conversation CRUD + message history
- ✅ Responsive UI for desktop/mobile
- ✅ Clean separation: `client` + `server`

---

## 🧭 Tech Stack

- Frontend: React + Vite + React Router + Context API
- Backend: Node.js + Express + MongoDB + Mongoose
- Auth: JWT + secure middleware
- Media: Cloudinary
- Dev: ESLint, Prettier, nodemon

---

## 📁 Repo Structure

- `client/` - React app
  - `src/components/` - reusable UI parts
  - `src/pages/` - entry pages: Home, Login, Profile
  - `src/context/` - global state contexts
  - `src/lib/` - shared utilities
- `server/` - API server
  - `controllers/` - route controllers
  - `routes/` - Express routes
  - `models/` - Mongoose schemas (User, Message)
  - `middleware/` - auth guard and helpers
  - `lib/db.js` - MongoDB connection

---

## 🛠️ Setup Instructions

### 1. Clone project

```bash
git clone https://github.com/your-org/chat-app.git
cd chat-app
```

### 2. Backend

```bash
cd server
npm install
copy .env.example .env
# Set the following values:
# MONGO_URI, JWT_SECRET, JWT_EXPIRES_IN, CLOUDINARY_* values
npm run dev
```

### 3. Frontend

```bash
cd ../client
npm install
npm run dev
```

Open `http://localhost:5173`.

---

## 🔐 Environment Variables

Create `server/.env`:

- `PORT=5000`
- `MONGO_URI=<your-mongodb-atlas-url>`
- `JWT_SECRET=<strong-secret>`
- `JWT_EXPIRES_IN=1d`
- `CLOUDINARY_CLOUD_NAME=<your-cloud-name>`
- `CLOUDINARY_API_KEY=<key>`
- `CLOUDINARY_API_SECRET=<secret>`

---

## 🗂️ API Endpoints

### User (`/api/users`)
- `POST /register` - create user
- `POST /login` - get token
- `GET /me` - fetch profile (auth)
- `PATCH /me` - update profile (auth)

### Message (`/api/messages`)
- `POST /` - send message
- `GET /thread/:userId` - get chat history

---

## 🧪 Scripts

### Server
- `npm run dev` - start server with nodemon
- `npm start` - run production

### Client
- `npm run dev` - start Vite dev server
- `npm run build` - build for production
- `npm run preview` - preview production build

---

## 📌 Next Enhancements

- 💬 Real-time messaging with `socket.io`
- 🧑‍🤝‍🧑 Group chats + dynamic chat rooms
- 🕒 Typing indicators, online status
- 🛡 Token refresh + refresh-token strategy
- 🧪 Add Jest + React Testing Library + Supertest
- 🧾 Accessibility, localization, PWA

---

## 🧹 Maintenance

- `npm run lint` (client)
- `npm run format` (if Prettier configured)

---

## 📄 License

MIT

---

## 🙋 Maintainer
- Name: `Nipuna`
- Email: `your-email@example.com`

