STK – Technical Test
Menu Tree System (Frontend UI + Backend API)

Project ini terdiri dari dua bagian terpisah:

Frontend (Next.js)
Fokus pada implementasi UI berdasarkan Figma yang diberikan.
Halaman, komponen, dan struktur tampilan sudah selesai.

Backend (NestJS)
Menyediakan REST API untuk pengelolaan menu tree (CRUD, move, reorder).
Database PostgreSQL, dokumentasi Swagger sudah tersedia.

Catatan:
Integrasi antara frontend dan backend belum dilakukan.
Keduanya sudah siap untuk dihubungkan pada langkah berikutnya (fetch API, state sync, dsb).

🚀 1. Frontend (UI Saja)
📦 Tech Stack

Next.js (App Router)

React

TailwindCSS

Shadcn/UI

Zustand (state management)

Iconify + Lucide Icons

Status

✔ Layout & components selesai
✔ Menu tree UI sesuai Figma
✔ Expand/collapse sudah ada
✔ Form & panel sudah ada
✘ Belum terhubung ke API
✘ Belum ada fetch real data

Running Frontend
cd frontend
npm install
npm run dev

http://localhost:3001

🔧 2. Backend (API Selesai + Swagger)
📦 Tech Stack

NestJS
TypeORM
PostgreSQL
Swagger
Class-validator
Status

✔ Semua endpoint sesuai requirement
✔ CRUD menu item
✔ Move & reorder
✔ Tree structure ready
✔ Migration tersedia
✔ Swagger tersedia
✔ Database jalan
✘ Belum dipakai oleh frontend (belum di-fetch)

Running Backend
cd backend
npm install
npm run migration:run
npm run start:dev

Swagger
http://localhost:3000/api/docs

Endpoint Utama
GET    /api/menus
GET    /api/menus/:id
POST   /api/menus
PUT    /api/menus/:id
DELETE /api/menus/:id
PATCH  /api/menus/:id/move
PATCH  /api/menus/:id/reorder

🌳 3. Database Schema

Tabel utama: menus

Relasi self-parent (rekursif)

Cascade delete aktif

🔌 4. Integrasi (Belum Dilakukan)

Semua fondasi sudah lengkap (UI + API).
Langkah selanjutnya sangat straightforward:

Frontend → Backend fetch plan:
GET /api/menus → populate tree
POST /api/menus → tambah node via form
PUT /api/menus/:id → update node
DELETE /api/menus/:id → delete node + children
PATCH /api/menus/:id/move → pindahkan node
PATCH /api/menus/:id/reorder → reorder sibling

