# 📚 Backend Sistem Peminjaman Buku Perpustakaan (Library Loans API)

API Backend RESTful sederhana untuk mengelola data peminjaman buku perpustakaan. Proyek ini dibangun menggunakan **Node.js**, **Express.js**, dan **Supabase (PostgreSQL)** dengan menerapkan arsitektur **MVC (Model-Controller-Route)**.

---

## 📌 Deskripsi Umum & Tujuan Proyek

Proyek ini bertujuan untuk menyediakan layanan backend API yang menangani operasional dasar peminjaman buku perpustakaan secara digital. API ini dirancang untuk memfasilitasi pencatatan data peminjaman, pembaruan status pengembalian, penghapusan data, serta fitur pencarian data secara spesifik menggunakan query filter.

### Fitur Utama

- **CRUD Operations** — Mengelola data peminjaman buku secara penuh (Create, Read, Update, Delete).
- **Query Parameter Filtering** — Pencarian data dinamis berdasarkan `status`, `member_name`, dan `book_title`.
- **Error Handling** — Penanganan error yang informatif serta validasi input data.
- **Serverless Ready** — Siap di-deploy ke platform Vercel.

---

## 🗄️ Struktur Data / Schema

Tabel database bernama `loans` pada Supabase PostgreSQL dengan struktur sebagai berikut:

| Nama Kolom    | Tipe Data   | Keterangan                                                  |
| :------------ | :---------- | :---------------------------------------------------------- |
| `id`          | `BIGINT`    | Primary Key, Auto-increment                                 |
| `member_name` | `TEXT`      | Nama anggota peminjam (Wajib)                               |
| `book_title`  | `TEXT`      | Judul buku yang dipinjam (Wajib)                            |
| `loan_date`   | `DATE`      | Tanggal peminjaman (Default: tanggal hari ini)              |
| `return_date` | `DATE`      | Tanggal tenggat pengembalian                                |
| `status`      | `VARCHAR`   | Status pinjaman: `borrowed` atau `returned` (Default: `borrowed`) |
| `created_at`  | `TIMESTAMP` | Waktu data dibuat (otomatis)                                |

---

## 🚀 Panduan Instalasi & Cara Menjalankan Lokal

### Prasyarat

- **Node.js** versi 18.x atau lebih baru
- **npm** (Node Package Manager)
- Akun **Supabase** dan proyek database yang aktif

### Langkah Instalasi

**1. Clone repository:**
```bash
git clone https://github.com/username/library-loans-api.git
cd library-loans-api
```

**2. Install dependencies:**
```bash
npm install
```

**3. Konfigurasi environment variable:**

Buat file `.env` pada root direktori proyek, lalu isi dengan kredensial Supabase:
```env
PORT=3000
SUPABASE_URL=https://your-supabase-project-id.supabase.co
SUPABASE_KEY=your-supabase-anon-key
```

**4. Jalankan aplikasi:**

Mode development (auto-reload dengan Nodemon):
```bash
npm run dev
```

Mode production:
```bash
npm start
```

Server akan berjalan pada: `http://localhost:3000`

---

## 📖 Contoh Request dan Response API

Base URL Lokal: `http://localhost:3000`
Base URL Production: `https://library-loans-api.vercel.app` *(ganti dengan URL Vercel kamu)*

---

### 1. `GET /api/loans` — Mengambil Semua Data & Filter

Mengambil seluruh daftar peminjaman. Mendukung query parameter `status`, `member_name`, dan `book_title`.

**Request:**
```
GET /api/loans
GET /api/loans?status=borrowed
GET /api/loans?member_name=Muhammad Daffa Ryan Fausta
```

**Response `200 OK`:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 4,
      "member_name": "May Triastuti",
      "book_title": "Badminton adalah Hobi yang paling seru",
      "loan_date": "2026-10-10",
      "return_date": "2026-10-25",
      "status": "borrowed",
      "created_at": "2026-10-10T09:01:55.344568+00:00"
    },
    {
      "id": 3,
      "member_name": "Willybrordus Anugrah Gusti",
      "book_title": "Menjadi EXP laner Terkuat di Mobile Legends",
      "loan_date": "2026-10-10",
      "return_date": "2026-10-25",
      "status": "borrowed",
      "created_at": "2026-10-10T09:01:10.830799+00:00"
    },
    {
      "id": 1,
      "member_name": "Muhammad Daffa Ryan Fausta",
      "book_title": "Mengenal dan belajar lebih dekat tentang UI/UX",
      "loan_date": "2026-10-10",
      "return_date": "2026-10-15",
      "status": "returned",
      "created_at": "2026-10-10T08:57:08.042156+00:00"
    }
  ]
}
```

---

### 2. `GET /api/loans/:id` — Mengambil Detail berdasarkan ID

**Request:**
```
GET /api/loans/3
```

**Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "id": 3,
    "member_name": "Willybrordus Anugrah Gusti",
    "book_title": "Menjadi EXP laner Terkuat di Mobile Legends",
    "loan_date": "2026-10-10",
    "return_date": "2026-10-25",
    "status": "borrowed",
    "created_at": "2026-10-10T09:01:10.830799+00:00"
  }
}
```

**Response `404 Not Found`:**
```json
{
  "success": false,
  "message": "Data peminjaman tidak ditemukan"
}
```

---

### 3. `POST /api/loans` — Mencatat Peminjaman Baru

**Headers:** `Content-Type: application/json`

**Request Body:**
```json
{
  "member_name": "May Triastuti",
  "book_title": "Badminton adalah Hobi yang paling seru",
  "return_date": "2026-10-25"
}
```

**Response `201 Created`:**
```json
{
  "success": true,
  "message": "Peminjaman buku berhasil dicatat",
  "data": {
    "id": 4,
    "member_name": "May Triastuti",
    "book_title": "Badminton adalah Hobi yang paling seru",
    "loan_date": "2026-10-10",
    "return_date": "2026-10-25",
    "status": "borrowed",
    "created_at": "2026-10-10T09:01:55.344568+00:00"
  }
}
```

---

### 4. `PUT /api/loans/:id` — Memperbarui Data Peminjaman

**Headers:** `Content-Type: application/json`

**Request:**
```
PUT /api/loans/1
```

**Request Body:**
```json
{
  "status": "returned",
  "return_date": "2026-10-10"
}
```

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Data peminjaman berhasil diperbarui",
  "data": {
    "id": 1,
    "member_name": "Muhammad Daffa Ryan Fausta",
    "book_title": "Mengenal dan belajar lebih dekat tentang UI/UX",
    "loan_date": "2026-10-10",
    "return_date": "2026-10-10",
    "status": "returned",
    "created_at": "2026-10-10T08:57:08.042156+00:00"
  }
}
```

---

### 5. `DELETE /api/loans/:id` — Menghapus Data Peminjaman

**Request:**
```
DELETE /api/loans/4
```

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Data peminjaman berhasil dihapus"
}
```

---

## 🔗 Link Deployment

| Platform | URL |
| :------- | :-- |
| **Vercel** | `https://library-loans-api.vercel.app` *(ganti dengan URL Vercel kamu)* |
| **GitHub** | `https://github.com/username/library-loans-api` *(ganti dengan URL repo kamu)* |