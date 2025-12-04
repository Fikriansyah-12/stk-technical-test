📘 Fullstack Menu Tree System

Technical Test – STK

A fullstack application that implements a hierarchical menu tree system with unlimited nesting, CRUD operations, search, and drag-and-drop.
Built using NestJS, Next.js, PostgreSQL, and fully dockerized for easy setup.

🚀 Features
# Backend (NestJS + TypeORM + PostgreSQL)
CRUD menu items
Unlimited nested menu tree
Auto-build tree structure
Update + delete with children
Move & reorder menu items (if supported)
Validation & error handling
Swagger API Documentation
Docker-ready
.env support
# Frontend (Next.js + TypeScript + Tailwind CSS)
Display hierarchical menu tree
Add, edit, delete menu items
Expand/collapse nested items
Search & filter menu
Drag & drop reorder (if implemented)
Clean UI following Figma
Responsive
Zustand state management (optional)
# Docker (Bonus Completed)
Dockerfile for backend
Dockerfile for frontend
docker-compose.yml to run everything in one command
Persistent Postgres volume
Environment variables managed cleanly

⚙️ Environment Variables
# Frontend (frontend/.env)
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
PORT=3000
# Backend (backend/.env)
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=1234567
DB_NAME=db
DB_SSL=false

PORT=3000

# 🐳 Running With Docker (Recommended)
# Start containers
docker compose up -d --build
# Check services
docker compose ps

▶️ Running Locally (Without Docker)
1️⃣ Backend
cd backend
npm install
cp .env.example .env
npm run start:dev

2️⃣ Frontend
cd frontend
npm install
cp .env.example .env
npm run dev

🧪 API Endpoints Complete all
GET    /api/menus              - Get menu tree
GET    /api/menus/:id          - Get single menu
POST   /api/menus              - Create menu
PUT    /api/menus/:id          - Update menu
DELETE /api/menus/:id          - Delete menu (recursive)
PATCH  /api/menus/:id/move     - Move to another parent (optional)
PATCH  /api/menus/:id/reorder  - Reorder within same level (optional) 

#Swagger UI
http://localhost:3000/api/docs#/

📌 Technology Choices
#Backend
NestJS + TypeORM → consistency, modular architecture
PostgreSQL → relational, easy to handle tree data
Swagger → clear API documentation
#Frontend
Next.js + TypeScript
TailwindCSS → fast UI development
Zustand / Context → simple shared state
Deployment
Docker → eliminates setup issues, runs anywhere

📦 Deliverables Checklist

✔ Fullstack app
✔ CRUD + nested menu tree
✔ Responsive UI
✔ Drag & drop (optional)
✔ Swagger API
✔ Dockerized (backend + frontend + db)
✔ README lengkap
✔ .env.example disediakan

✅ How to Test
Clone repo
Run docker compose
Open frontend UI (http://localhost:3001)
Add/edit/delete menu
Check backend logs
Verify API via Swagger
