<div align="center">

# 🚀 TeamTasker

### A full-stack collaborative task management app built for modern teams

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![SQLite](https://img.shields.io/badge/SQLite-sql.js-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://sql.js.org)
[![JWT](https://img.shields.io/badge/Auth-JWT-FB015B?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io)
[![Railway](https://img.shields.io/badge/Deployed-Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)](https://railway.app)

**[🌐 Live Demo →](https://task-manager-production-d505.up.railway.app/)**

</div>

---

## 📌 What is TeamTasker?

TeamTasker is a lightweight yet powerful **project & task management tool** designed for small teams. Create projects, invite teammates, assign tasks, track progress on a **Kanban board**, and visualise workload from a central dashboard — all in real time.

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🔐 **JWT Authentication** | Secure sign up & login with bcrypt-hashed passwords |
| 📁 **Project Management** | Create projects, add/remove members with role control |
| 👑 **Role-Based Access** | Admins manage everything; Members update their own task status |
| ✅ **Task Management** | Title, description, priority, due date, assignee per task |
| 🗂 **Kanban Board** | Drag-and-drop tasks across **To Do → In Progress → Done** |
| 📊 **Dashboard** | Stats overview, bar chart by assignee, overdue tracking, recent tasks |

---

## 🛠 Tech Stack

```
Backend   →  Node.js + Express.js
Database  →  SQLite (via sql.js — zero native dependencies)
Auth      →  JWT + bcryptjs
Frontend  →  Vanilla HTML + CSS + JavaScript (no framework)
Deploy    →  Railway
```

---

## 📁 Project Structure

```
team-task-manager/
│
├── backend/
│   ├── server.js              # App entry point & route mounting
│   ├── database.js            # SQLite schema & sql.js wrapper
│   ├── middleware/
│   │   ├── auth.js            # JWT token verification
│   │   └── role.js            # Project-level role guard
│   └── routes/
│       ├── auth.js            # Signup / Login / Me
│       ├── projects.js        # Project CRUD + member management
│       ├── tasks.js           # Task CRUD with role enforcement
│       └── dashboard.js       # Aggregated stats endpoint
│
├── frontend/
│   ├── index.html             # Login / Sign Up page
│   ├── dashboard.html         # Stats, charts & project list
│   ├── project.html           # Kanban board view
│   ├── css/
│   │   └── style.css          # Full design system (dark theme)
│   └── js/
│       └── api.js             # Centralised API client + UI helpers
│
├── railway.toml               # Railway deployment config
└── README.md
```

---

## 🔌 API Reference

### 🔐 Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive a JWT |
| `GET`  | `/api/auth/me` | Get the currently logged-in user |

### 📁 Projects
| Method | Endpoint | Auth | Role Required |
|--------|----------|------|---------------|
| `GET`    | `/api/projects` | ✅ | Any member |
| `POST`   | `/api/projects` | ✅ | Any (becomes Admin) |
| `GET`    | `/api/projects/:id` | ✅ | Member+ |
| `PUT`    | `/api/projects/:id` | ✅ | Admin only |
| `DELETE` | `/api/projects/:id` | ✅ | Admin only |
| `POST`   | `/api/projects/:id/members` | ✅ | Admin only |
| `DELETE` | `/api/projects/:id/members/:userId` | ✅ | Admin only |

### ✅ Tasks
| Method | Endpoint | Auth | Role Required |
|--------|----------|------|---------------|
| `GET`    | `/api/projects/:id/tasks` | ✅ | Member+ |
| `POST`   | `/api/projects/:id/tasks` | ✅ | Admin only |
| `PUT`    | `/api/tasks/:taskId` | ✅ | Admin (full) / Member (status only) |
| `DELETE` | `/api/tasks/:taskId` | ✅ | Admin only |

### 📊 Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/dashboard` | Returns aggregated stats for the logged-in user |

---

## 👤 Role Permissions

| Action | 👑 Admin | 👤 Member |
|--------|:-------:|:--------:|
| Create tasks | ✅ | ❌ |
| Edit all task fields | ✅ | ❌ |
| Update task status | ✅ | ✅ *(assigned only)* |
| Add / remove members | ✅ | ❌ |
| Edit project details | ✅ | ❌ |
| Delete project | ✅ | ❌ |

---

## ⚡ Getting Started Locally

```bash
# 1. Clone the repo
git clone https://github.com/your-username/team-task-manager.git
cd team-task-manager

# 2. Install backend dependencies
cd backend
npm install

# 3. Create your .env file
cp ../.env.example .env
# → Edit .env and set JWT_SECRET

# 4. Start the server
node server.js

# 5. Open in browser
# → http://localhost:5000
```

> The frontend is served as static files directly from the Express server — no separate build step needed.

---

## 🌐 Deployment (Railway)

1. Push your code to GitHub
2. Create a new project on [Railway](https://railway.app)
3. Connect your GitHub repo
4. Set the following environment variables in Railway:

```
JWT_SECRET=your_strong_secret_here
PORT=5000
NODE_ENV=production
```

5. Railway auto-deploys on every push to `main` ✅

---

## 📄 License

MIT — free to use, modify, and distribute.

---

<div align="center">
  Made with ❤️ · <a href="https://task-manager-production-d505.up.railway.app/">Live Demo</a>
</div>
