# 📚 Backend Sistem Peminjaman Buku Perpustakaan (PLMS API)

API Backend RESTful sederhana untuk mengelola data peminjaman buku perpustakaan. Proyek ini dibangun menggunakan **Node.js**, **Express.js**, dan **Supabase (PostgreSQL)** dengan menerapkan arsitektur **MVC (Model-Controller-Route)**.

---

## 📌 Deskripsi Umum & Tujuan Proyek

Proyek ini bertujuan untuk menyediakan layanan backend API yang menangani operasional dasar peminjaman buku perpustakaan secara digital. API ini dirancang untuk memfasilitasi pencatatan data peminjaman, pembaruan status pengembalian, penghapusan data, serta fitur pencarian data secara spesifik menggunakan query filter.

### Fitur Utama:
- **CRUD Operations**: Mengelola data peminjaman buku secara penuh (Create, Read, Update, Delete).
- **Query Parameter Filtering**: Pencarian data dinamis berdasarkan `status`, `member_name`, dan `book_title`.
- **Error Handling**: Penanganan error yang informatif serta validasi input data.
- **Serverless Ready**: Siap didaftarkan/dideploy ke platform seperti Vercel.

---

## 🗄️ Struktur Data / Schema

Tabel database dinamakan `loans` pada Supabase PostgreSQL dengan skema struktur data sebagai berikut:

| Nama Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id` | `BIGINT` / `INT` | Primary Key, Auto-increment |
| `member_name` | `VARCHAR` / `TEXT` | Nama anggota peminjam (Wajib) |
| `book_title` | `VARCHAR` / `TEXT` | Judul buku yang dipinjam (Wajib) |
| `loan_date` | `DATE` | Tanggal peminjaman (Default: Tanggal hari ini) |
| `return_date` | `DATE` | Tanggal tenggat pengembalian |
| `status` | `VARCHAR` | Status pinjaman: `'borrowed'` atau `'returned'` (Default: `'borrowed'`) |
| `created_at` | `TIMESTAMP` | Waktu data dibuat |

---

## 🚀 Panduan Instalasi & Cara Menjalankan Lokal

### Prasyarat
- **Node.js** (versi 18.x atau yang lebih baru)
- **npm** (Node Package Manager)
- Akun **Supabase** dan proyek database aktif

### Langkah Instalasi

1. **Clone Repository / Buka Folder Proyek:**
   Buka terminal di direktori proyek Anda:
   ```bash
   cd responsi-mod-1
   ```

2. **Install Dependencies:**
   Jalankan perintah berikut untuk mengunduh seluruh package yang dibutuhkan:
   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variable (`.env`):**
   Buat file bernama `.env` pada root direktori proyek Anda dan tambahkan kredensial Supabase Anda:
   ```env
   PORT=3000
   SUPABASE_URL=https://your-supabase-project-id.supabase.co
   SUPABASE_KEY=your-supabase-anon-key
   ```

4. **Jalankan Aplikasi:**
   - **Mode Development (dengan Nodemon auto-reload):**
     ```bash
     npm run dev
     ```
   - **Mode Production:**
     ```bash
     npm start
     ```

Server akan berjalan pada URL: `http://localhost:3000`

---

## 📖 Contoh Request dan Response API

### 1. `GET /api/loans` (Mengambil Semua Data & Filter)
Mengambil seluruh daftar peminjaman buku. Mendukung query parameter `status`, `member_name`, dan `book_title`.

* **Request Example:**
  `GET http://localhost:3000/api/loans?status=borrowed&member_name=Reizal`

* **Response (`200 OK`):**
  ```json
  {
    "success": true,
    "count": 1,
    "data": [
      {
        "id": 1,
        "member_name": "Reizal Haidar Akmal",
        "book_title": "Sistem Terdistribusi dan Jaringan",
        "loan_date": "2026-10-10",
        "return_date": "2026-10-25",
        "status": "borrowed",
        "created_at": "2026-10-10T13:39:24.000Z"
      }
    ]
  }
  ```

---

### 2. `GET /api/loans/:id` (Mengambil Detail berdasarkan ID)
Mengambil detail satu data peminjaman berdasarkan ID-nya.

* **Request Example:**
  `GET http://localhost:3000/api/loans/1`

* **Response (`200 OK`):**
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "member_name": "Reizal Haidar Akmal",
      "book_title": "Sistem Terdistribusi dan Jaringan",
      "loan_date": "2026-10-10",
      "return_date": "2026-10-25",
      "status": "borrowed",
      "created_at": "2026-10-10T13:39:24.000Z"
    }
  }
  ```

* **Response (`404 Not Found`):**
  ```json
  {
    "success": false,
    "message": "Data peminjaman tidak ditemukan"
  }
  ```

---

### 3. `POST /api/loans` (Mencatat Peminjaman Baru)
Menambahkan data peminjaman buku baru ke database.

* **Headers:** `Content-Type: application/json`
* **Request Body:**
  ```json
  {
    "member_name": "Reizal Haidar Akmal",
    "book_title": "Sistem Terdistribusi dan Jaringan",
    "return_date": "2026-10-25"
  }
  ```

* **Response (`201 Created`):**
  ```json
  {
    "success": true,
    "message": "Peminjaman buku berhasil dicatat",
    "data": {
      "id": 1,
      "member_name": "Reizal Haidar Akmal",
      "book_title": "Sistem Terdistribusi dan Jaringan",
      "loan_date": "2026-10-10",
      "return_date": "2026-10-25",
      "status": "borrowed",
      "created_at": "2026-10-10T13:39:24.000Z"
    }
  }
  ```

---

### 4. `PUT /api/loans/:id` (Memperbarui Data Peminjaman)
Memperbarui data atau status peminjaman (misal: mengubah status menjadi `returned`).

* **Headers:** `Content-Type: application/json`
* **Request Body:**
  ```json
  {
    "status": "returned",
    "return_date": "2026-10-12"
  }
  ```

* **Response (`200 OK`):**
  ```json
  {
    "success": true,
    "message": "Data peminjaman berhasil diperbarui",
    "data": {
      "id": 1,
      "member_name": "Reizal Haidar Akmal",
      "book_title": "Sistem Terdistribusi dan Jaringan",
      "loan_date": "2026-10-10",
      "return_date": "2026-10-12",
      "status": "returned",
      "created_at": "2026-10-10T13:39:24.000Z"
    }
  }
  ```

---

### 5. `DELETE /api/loans/:id` (Menghapus Data Peminjaman)
Menghapus catatan peminjaman berdasarkan ID.

* **Request Example:**
  `DELETE http://localhost:3000/api/loans/1`

* **Response (`200 OK`):**
  ```json
  {
    "success": true,
    "message": "Data peminjaman berhasil dihapus"
  }
  ```