# PRD --- Task Manager App

**Versi:** 1.0\
**Status:** Draft untuk implementasi\
**Tipe produk:** Personal project / portfolio\
**Tech stack:** TanStack Start, Tailwind CSS, shadcn/ui, Drizzle ORM,
Supabase PostgreSQL

------------------------------------------------------------------------

## 1. Ringkasan Produk

Task Manager adalah aplikasi web untuk membantu pengguna mencatat,
mengorganisasi, dan memantau tugas pribadi melalui antarmuka yang
sederhana dan responsif. Proyek ini merupakan proyek pertama dalam
roadmap portofolio full-stack, sehingga ruang lingkupnya sengaja
dibatasi agar fokus pada fondasi UI, alur CRUD, validasi, integrasi
database, dan deployment.

Pengembangan dilakukan **frontend terlebih dahulu** menggunakan data
mock. Setelah alur dan tampilan utama stabil, aplikasi dihubungkan ke
server dan database melalui TanStack Start, Drizzle ORM, dan Supabase
PostgreSQL.

## 2. Tujuan Produk

### Tujuan pengguna

-   Mencatat tugas yang perlu dikerjakan.
-   Melihat tugas berdasarkan status.
-   Mengubah detail atau status tugas.
-   Menemukan tugas melalui pencarian dan filter.

### Tujuan pembelajaran

-   Membuat halaman dan navigasi dengan TanStack Start.
-   Membangun UI responsif dengan Tailwind CSS dan shadcn/ui.
-   Mengelola state, form, dialog, dan feedback UI.
-   Mendesain schema PostgreSQL menggunakan Drizzle ORM.
-   Mengimplementasikan CRUD melalui server-side code.
-   Menangani validasi, error, loading, dan empty state.
-   Men-deploy aplikasi dan mendokumentasikan hasilnya.

## 3. Target Pengguna

Pengguna awal adalah satu orang yang ingin mengelola tugas pribadi.
Versi MVP tidak membutuhkan fitur kolaborasi, organisasi, atau role
pengguna.

## 4. Ruang Lingkup

### 4.1 Fitur MVP

1.  **Dashboard tugas**
    -   Menampilkan daftar tugas.
    -   Menampilkan ringkasan jumlah tugas berdasarkan status.
    -   Menyediakan aksi membuat tugas baru.
2.  **CRUD tugas**
    -   Membuat tugas.
    -   Melihat detail tugas.
    -   Mengedit tugas.
    -   Menghapus tugas dengan konfirmasi.
3.  **Status tugas**
    -   `todo`
    -   `in_progress`
    -   `done`
4.  **Pencarian dan filter**
    -   Pencarian berdasarkan judul tugas.
    -   Filter berdasarkan status.
    -   Pengurutan berdasarkan tanggal dibuat atau tenggat waktu.
5.  **Form dan feedback**
    -   Validasi field wajib.
    -   Pesan sukses dan error.
    -   Loading state saat operasi berjalan.
    -   Empty state saat belum ada tugas atau tidak ada hasil pencarian.
6.  **Responsif**
    -   Layout dapat digunakan pada desktop, tablet, dan mobile.

### 4.2 Tidak termasuk MVP

-   Registrasi, login, dan manajemen akun.
-   Multi-user dan pembagian tugas.
-   Kolaborasi real-time.
-   Notifikasi email atau push.
-   Lampiran file.
-   Kalender dan tampilan Gantt.
-   Recurring tasks.
-   Integrasi pihak ketiga.

Fitur autentikasi dapat ditambahkan pada iterasi berikutnya setelah MVP
CRUD selesai. Jika aplikasi dipublikasikan dengan data yang benar-benar
tersimpan di database, jangan menganggap data otomatis privat hanya
karena fitur login belum tersedia. Gunakan akses database yang aman dan
jangan mengekspos kredensial server ke browser.

## 5. User Stories dan Kriteria Penerimaan

### US-01 --- Melihat daftar tugas

**Sebagai pengguna**, saya ingin melihat daftar tugas agar mengetahui
pekerjaan yang perlu diselesaikan.

Kriteria penerimaan: - Daftar menampilkan judul, status, dan tenggat
waktu jika tersedia. - Tugas ditampilkan dalam keadaan loading saat data
sedang dimuat. - Jika belum ada tugas, tampil empty state dengan tombol
untuk membuat tugas. - Jika terjadi kegagalan memuat data, tampil pesan
error dan opsi mencoba lagi.

### US-02 --- Membuat tugas

**Sebagai pengguna**, saya ingin membuat tugas baru agar pekerjaan dapat
dicatat.

Kriteria penerimaan: - Form berisi judul, deskripsi opsional, status,
prioritas, dan tenggat waktu opsional. - Judul wajib diisi dan tidak
boleh hanya berisi spasi. - Kesalahan validasi ditampilkan dekat field
terkait. - Setelah berhasil, tugas baru muncul pada daftar. - Tombol
submit menunjukkan loading dan mencegah submit berulang selama request
berlangsung.

### US-03 --- Mengedit tugas

**Sebagai pengguna**, saya ingin mengubah detail tugas agar data tetap
akurat.

Kriteria penerimaan: - Form edit terisi dengan data tugas saat ini. -
Perubahan dapat disimpan. - Validasi yang sama dengan form pembuatan
diterapkan. - Setelah berhasil, daftar menampilkan data terbaru.

### US-04 --- Mengubah status

**Sebagai pengguna**, saya ingin mengubah status tugas agar progres
pekerjaan dapat dipantau.

Kriteria penerimaan: - Status dapat diubah dari daftar atau form edit. -
Status yang tersedia hanya `todo`, `in_progress`, dan `done`. -
Perubahan status tersimpan dan tercermin di UI.

### US-05 --- Menghapus tugas

**Sebagai pengguna**, saya ingin menghapus tugas yang tidak diperlukan
lagi.

Kriteria penerimaan: - Aplikasi meminta konfirmasi sebelum menghapus. -
Pembatalan konfirmasi tidak mengubah data. - Setelah berhasil dihapus,
tugas tidak lagi muncul di daftar. - Jika gagal, data tidak boleh
dihapus dari UI seolah-olah operasi berhasil.

### US-06 --- Mencari dan memfilter tugas

**Sebagai pengguna**, saya ingin mencari tugas berdasarkan judul dan
memfilter status.

Kriteria penerimaan: - Pencarian tidak membedakan huruf besar dan
kecil. - Filter status dapat dikombinasikan dengan pencarian. - Terdapat
tampilan khusus jika tidak ada hasil. - Kontrol filter dapat digunakan
pada layar mobile.

## 6. Model Data

Tabel MVP: `tasks`.

  -----------------------------------------------------------------------
  Kolom                   Tipe PostgreSQL         Aturan
  ----------------------- ----------------------- -----------------------
  `id`                    `uuid`                  Primary key, default
                                                  UUID

  `title`                 `varchar(160)`          Wajib, tidak kosong

  `description`           `text`                  Opsional

  `status`                `varchar` / enum        `todo`, `in_progress`,
                                                  `done`; default `todo`

  `priority`              `varchar` / enum        `low`, `medium`,
                                                  `high`; default
                                                  `medium`

  `due_date`              `timestamptz`           Opsional

  `created_at`            `timestamptz`           Waktu pembuatan

  `updated_at`            `timestamptz`           Waktu pembaruan
  -----------------------------------------------------------------------

Catatan implementasi: - Pilih PostgreSQL enum atau string dengan
constraint yang konsisten; hindari menerima status arbitrer. - Validasi
input dilakukan di server meskipun validasi frontend sudah ada. -
`updated_at` perlu diperbarui saat record berubah. - Untuk MVP tanpa
autentikasi, tentukan strategi akses yang aman sebelum deployment
publik. Pilihan yang disarankan adalah menyelesaikan integrasi
autentikasi sebelum aplikasi menyimpan data pengguna nyata. Alternatif
demo tanpa login harus menggunakan data demo yang tidak sensitif dan
akses server yang dibatasi. - Drizzle schema dan migration menjadi
sumber perubahan struktur database. Jangan mengandalkan perubahan manual
di dashboard Supabase tanpa mencatatnya dalam migration.

## 7. Arsitektur Teknis

### Frontend

-   **TanStack Start:** routing dan integrasi server/client.
-   **Tailwind CSS:** layout, spacing, warna, responsive behavior.
-   **shadcn/ui:** Button, Input, Textarea, Select, Badge, Card, Dialog,
    Dropdown Menu, Table, Skeleton, Alert, dan Sonner/toast bila
    diperlukan.
-   **Validasi form:** gunakan library schema validation yang kompatibel
    dengan project, misalnya Zod.

### Server dan database

-   **TanStack Start server functions:** operasi baca dan tulis data
    yang berjalan di server.
-   **Drizzle ORM:** schema, query, dan migration.
-   **Supabase PostgreSQL:** database utama.
-   Kredensial database hanya berada di environment server.
-   Jangan mengirim secret key, connection string, atau service role key
    ke client bundle.

### Pola data

-   Komponen UI tidak mengakses database secara langsung.
-   Pisahkan validasi dan fungsi akses data agar mudah diuji.
-   Semua input dari client dianggap tidak tepercaya.
-   Tangani error database dengan pesan yang aman dan tidak membocorkan
    detail internal.

## 8. Halaman dan Navigasi

### 8.1 `/` --- Dashboard

Elemen: - Header aplikasi dan nama produk. - Ringkasan total tugas,
tugas berjalan, dan tugas selesai. - Search input. - Filter status. -
Pilihan sorting. - Tombol `Tambah Tugas`. - Daftar tugas. - Empty,
loading, dan error state.

### 8.2 `/tasks/new` --- Buat tugas

Elemen: - Breadcrumb atau tombol kembali. - Form judul, deskripsi,
status, prioritas, dan tenggat waktu. - Tombol simpan dan batal. -
Validasi field dan loading state.

### 8.3 `/tasks/$taskId` --- Detail tugas

Elemen: - Judul, deskripsi, status, prioritas, tenggat waktu. - Tombol
edit dan hapus. - Tampilan jika ID tidak ditemukan.

### 8.4 `/tasks/$taskId/edit` --- Edit tugas

Elemen: - Form yang terisi data tugas. - Tombol simpan perubahan dan
batal. - Validasi dan feedback operasi.

Catatan: struktur route dapat disesuaikan dengan konvensi TanStack Start
yang digunakan saat implementasi.

## 9. Alur Pengerjaan: Frontend Terlebih Dahulu

Pengembangan wajib dilakukan secara bertahap. Jangan menghubungkan
database sebelum alur UI utama dapat didemonstrasikan dengan data mock.

### Fase 0 --- Setup dan perencanaan

1.  Buat repository Git.
2.  Inisialisasi project TanStack Start dengan TypeScript.
3.  Konfigurasi Tailwind CSS dan shadcn/ui.
4.  Buat struktur folder awal.
5.  Siapkan file `.env.example` tanpa kredensial nyata.
6.  Buat README awal berisi tujuan proyek dan instruksi setup.

**Output:** aplikasi berjalan secara lokal dengan halaman awal.

**Selesai jika:** project dapat dijalankan, struktur dasar jelas, dan
perubahan awal sudah masuk Git.

### Fase 1 --- UI foundation

1.  Tentukan gaya visual: warna, typography, spacing, radius, dan ukuran
    konten.
2.  Buat layout utama dengan header dan area konten.
3.  Tambahkan komponen shadcn/ui yang dibutuhkan.
4.  Buat komponen reusable:
    -   `AppHeader`
    -   `TaskList`
    -   `TaskCard` atau `TaskRow`
    -   `TaskStatusBadge`
    -   `TaskForm`
    -   `TaskFilters`
    -   `EmptyState`
    -   `ConfirmDeleteDialog`
5.  Pastikan layout nyaman digunakan pada layar kecil.

**Output:** kerangka visual aplikasi tanpa integrasi backend.

**Selesai jika:** semua komponen utama dapat dirender dan layout
responsif.

### Fase 2 --- Implementasi halaman dengan data mock

1.  Buat fixture data tugas statis.
2.  Implementasikan dashboard dengan beberapa contoh tugas.
3.  Implementasikan halaman pembuatan tugas.
4.  Implementasikan halaman detail dan edit.
5.  Buat navigasi antarhalaman menggunakan routing TanStack Start.
6.  Pastikan tampilan status, prioritas, dan tenggat waktu konsisten.

**Output:** seluruh halaman utama dapat didemonstrasikan menggunakan
data mock.

**Selesai jika:** pengguna dapat berpindah halaman dan melihat UI sesuai
spesifikasi tanpa membutuhkan database.

### Fase 3 --- Interaksi frontend dan state lokal

1.  Implementasikan form state dan validasi di client.
2.  Buat tambah, edit, dan hapus tugas sementara di state lokal.
3.  Implementasikan perubahan status.
4.  Implementasikan pencarian, filter, dan sorting.
5.  Tambahkan dialog konfirmasi hapus.
6.  Tambahkan toast atau inline feedback.
7.  Implementasikan loading, empty, error, dan no-results state.
8.  Cegah submit berulang dan tangani interaksi yang tidak valid.

Pada fase ini, perubahan data belum harus bertahan setelah halaman
di-refresh.

**Output:** prototipe interaktif yang berfungsi sepenuhnya di browser
dengan data lokal.

**Selesai jika:** alur CRUD dan filter dapat diuji tanpa database.

### Fase 4 --- Review frontend

1.  Uji seluruh alur pengguna berdasarkan user stories.
2.  Uji layout pada viewport mobile, tablet, dan desktop.
3.  Uji input kosong, judul terlalu panjang, dan tanggal tidak valid.
4.  Pastikan tombol, dialog, dan kontrol form memiliki label yang jelas.
5.  Periksa aksesibilitas keyboard dan focus state.
6.  Rapikan komponen duplikat dan tipe TypeScript.
7.  Buat screenshot untuk dokumentasi.

**Output:** frontend MVP yang stabil dan siap diintegrasikan.

**Selesai jika:** tidak ada alur utama yang terputus dan semua state UI
penting tersedia.

### Fase 5 --- Desain database dan integrasi Drizzle

1.  Buat project Supabase dan database PostgreSQL.
2.  Simpan connection string hanya di environment server.
3.  Konfigurasi Drizzle ORM.
4.  Definisikan schema `tasks`.
5.  Buat dan jalankan migration.
6.  Verifikasi tabel, kolom, default value, dan constraint.
7.  Buat modul akses database terpisah dari komponen UI.
8.  Tambahkan beberapa seed data non-sensitif untuk development bila
    dibutuhkan.

**Output:** schema database yang dapat direproduksi melalui migration.

**Selesai jika:** migration berjalan dengan benar dan aplikasi server
dapat terhubung ke database.

### Fase 6 --- Integrasi server dan CRUD

1.  Buat server function untuk mengambil daftar tugas.
2.  Buat server function untuk mengambil detail berdasarkan ID.
3.  Buat operasi pembuatan tugas.
4.  Buat operasi update tugas dan status.
5.  Buat operasi penghapusan tugas.
6.  Validasi input di server, bukan hanya di frontend.
7.  Tangani record yang tidak ditemukan dan error database.
8.  Ganti fixture mock dengan data dari server.
9.  Hubungkan form dan tombol UI ke operasi server.
10. Pastikan daftar diperbarui setelah mutasi berhasil.

**Output:** aplikasi full-stack dengan data persisten.

**Selesai jika:** tugas tetap tersimpan setelah refresh dan seluruh
operasi CRUD bekerja melalui server.

### Fase 7 --- Pengujian dan keamanan

1.  Uji validasi server untuk semua operasi tulis.
2.  Uji status dan prioritas yang tidak valid.
3.  Uji ID tugas yang tidak ditemukan.
4.  Uji error koneksi dan kegagalan query.
5.  Pastikan kredensial tidak masuk ke bundle client atau repository.
6.  Pastikan akses database tidak terbuka secara tidak sengaja.
7.  Sebelum deployment publik dengan data pengguna, implementasikan
    autentikasi dan otorisasi yang sesuai atau batasi aplikasi menjadi
    demo aman.
8.  Tambahkan unit test untuk validasi dan integration test untuk
    operasi CRUD penting.

**Output:** MVP yang lebih aman dan memiliki cakupan pengujian dasar.

**Selesai jika:** skenario normal dan skenario gagal telah diuji dan
tidak ada rahasia yang terekspos.

### Fase 8 --- Deployment dan dokumentasi

1.  Siapkan environment production.
2.  Jalankan migration pada database production dengan prosedur yang
    terkontrol.
3.  Deploy aplikasi ke hosting yang mendukung runtime TanStack Start.
4.  Konfigurasikan domain dan environment variables.
5.  Uji alur CRUD di environment production.
6.  Tambahkan README yang berisi:
    -   Deskripsi dan fitur.
    -   Screenshot.
    -   Tech stack.
    -   Cara instalasi dan menjalankan project.
    -   Environment variables yang diperlukan, tanpa nilai rahasia.
    -   Penjelasan schema atau ERD.
    -   Keputusan arsitektur dan keterbatasan yang diketahui.
    -   Link demo dan repository.
7.  Buat tag rilis `v1.0.0` setelah MVP diverifikasi.

**Output:** proyek yang dapat dibuka, diuji, dan dipahami reviewer
portofolio.

**Selesai jika:** demo online berfungsi dan orang lain dapat menjalankan
project mengikuti README.

## 10. Urutan Prioritas Implementasi

  Prioritas   Pekerjaan                                            Ketergantungan
  ----------- ---------------------------------------------------- ---------------------
  P0          Setup project dan design foundation                  Tidak ada
  P0          Dashboard dan komponen tugas dengan mock data        Setup
  P0          Form create/edit dan dialog delete                   Komponen UI
  P0          CRUD state lokal, filter, dan sorting                Halaman utama
  P1          Schema Drizzle dan migration                         UI MVP stabil
  P1          Server functions dan CRUD database                   Schema
  P1          Integrasi UI dengan server                           CRUD server
  P1          Error handling dan validasi server                   Integrasi
  P1          Review keamanan dan testing                          Fitur utama selesai
  P1          Deployment dan README                                Testing selesai
  P2          Auth, akun pengguna, dan data privat                 MVP CRUD
  P2          Pagination, keyboard shortcuts, dan fitur tambahan   MVP stabil

## 11. Non-Functional Requirements

### Performa

-   Daftar tugas tidak memuat data berulang kali tanpa alasan.
-   Query mengambil kolom yang dibutuhkan saja.
-   Tambahkan pagination ketika volume data mulai membutuhkannya.
-   Hindari update seluruh halaman jika hanya satu tugas yang berubah.

### Aksesibilitas

-   Semua input memiliki label.
-   Dialog dapat digunakan dengan keyboard.
-   Status tidak dibedakan hanya melalui warna.
-   Focus state terlihat jelas.
-   Kontras teks dan background memadai.

### Keamanan

-   Validasi dilakukan di server.
-   Kredensial database dan secret key tidak boleh dikirim ke client.
-   Error yang ditampilkan kepada pengguna tidak membocorkan stack trace
    atau detail internal.
-   Aplikasi publik tidak boleh memberikan akses tulis database tanpa
    kontrol yang sesuai.
-   Jika autentikasi ditambahkan, akses setiap tugas harus diverifikasi
    di server dan/atau database policy yang sesuai.

### Maintainability

-   Schema database dan migration tersimpan di repository.
-   Komponen UI reusable untuk pola yang berulang.
-   Logika database dipisahkan dari presentasi.
-   TypeScript digunakan untuk data dan hasil operasi.
-   README menjelaskan setup dan keputusan teknis utama.

## 12. Definition of Done

MVP dianggap selesai jika: - \[ \] Dashboard menampilkan daftar dan
ringkasan tugas. - \[ \] Pengguna dapat membuat tugas dengan validasi. -
\[ \] Pengguna dapat melihat detail dan mengedit tugas. - \[ \] Pengguna
dapat mengubah status tugas. - \[ \] Pengguna dapat menghapus tugas
setelah konfirmasi. - \[ \] Pencarian, filter, dan sorting bekerja. - \[
\] Loading, empty, error, dan no-results state tersedia. - \[ \] Data
tersimpan di Supabase PostgreSQL melalui server dan Drizzle ORM. - \[ \]
Schema dan migration terdokumentasi. - \[ \] Layout diuji pada mobile
dan desktop. - \[ \] Tidak ada secret di client bundle atau
repository. - \[ \] Deployment dapat digunakan dan README lengkap. - \[
\] Batasan keamanan untuk versi tanpa autentikasi dijelaskan atau
autentikasi telah ditambahkan.

## 13. Risiko dan Mitigasi

  -----------------------------------------------------------------------
  Risiko                              Mitigasi
  ----------------------------------- -----------------------------------
  Terlalu banyak fitur sebelum CRUD   Pertahankan ruang lingkup MVP
  selesai                             

  UI berubah besar setelah database   Selesaikan prototipe frontend
  terintegrasi                        dengan mock data terlebih dahulu

  Validasi hanya ada di browser       Ulangi validasi pada server

  Kredensial terekspos                Gunakan environment server dan
                                      periksa bundle/repository

  Perubahan schema tidak konsisten    Gunakan migration Drizzle

  Error backend menghasilkan UI yang  Definisikan error state dan pesan
  membingungkan                       yang jelas

  Data demo dapat diubah oleh publik  Batasi akses atau tambahkan auth
                                      sebelum deployment publik
  -----------------------------------------------------------------------

## 14. Rencana Milestone

Estimasi untuk satu developer yang mengerjakan proyek sambil belajar:

  Milestone                               Estimasi
  --------------------------------------- ----------------------
  Setup dan UI foundation                 1--2 hari
  Halaman dengan mock data                1--2 hari
  Interaksi frontend dan review UI        2--3 hari
  Schema Drizzle dan integrasi database   1--2 hari
  Server CRUD dan integrasi frontend      2--4 hari
  Testing, keamanan, dan perbaikan        1--3 hari
  Deployment dan dokumentasi              1--2 hari
  **Total perkiraan**                     **9--18 hari kerja**

Estimasi bukan tenggat mutlak; sesuaikan dengan pengalaman, kendala
teknis, dan waktu belajar.

## 15. Kriteria Keberhasilan Portofolio

Proyek berhasil sebagai portofolio jika reviewer dapat: 1. Membuka demo
atau menjalankan aplikasi secara lokal. 2. Memahami fungsi aplikasi
dalam waktu singkat. 3. Menguji alur CRUD utama. 4. Melihat penggunaan
TanStack Start, Tailwind CSS, shadcn/ui, Drizzle, dan Supabase secara
nyata. 5. Membaca README untuk memahami arsitektur, schema, dan setup.
6. Melihat bahwa validasi, error handling, dan keamanan dasar
dipertimbangkan.

**Prinsip pengerjaan:** selesaikan UI dengan mock data terlebih dahulu,
validasi pengalaman pengguna, baru tambahkan database dan server logic.
Hindari menambahkan fitur baru sebelum alur inti stabil.
