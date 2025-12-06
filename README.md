# Shop Explorer

Aplikasi e-commerce sederhana untuk mencari dan mengelola keranjang belanja produk.

## Instruksi Setup

1.  **Install Dependencies:**

    ```bash
    npm install
    ```

2.  **Jalankan Aplikasi (Mode Development):**

    ```bash
    npm run dev
    ```

## Pendekatan & Keputusan Teknis

1.  **State Management (Zustand):**

    - Dipilih karena ringan dan mudah digunakan dibanding Redux.
    - Fitur **Persistence** (`localStorage`) diimplementasikan agar data keranjang tidak hilang saat refresh halaman.

2.  **User Experience (UX):**

    - **Optimistic Updates:** Notifikasi (Snackbar) muncul secara instan saat menambah barang untuk respon yang cepat.
    - **Feedback:** Indikator jumlah barang (Badge) di icon cart memudahkan user memantau belanjaan.
    - **Subtotal & Total:** Menampilkan rincian harga per item dan total keseluruhan di halaman Cart.

3.  **Struktur Kode:**
    - Struktur folder dipisahkan secara logis (`pages`, `store`, `hooks`, `components`) agar mudah dibaca dan dimaintain
