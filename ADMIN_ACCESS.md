# 🔐 Admin Panel Access Guide

## Cara Mengakses Admin Panel

### **Metode 1: Tap Rahasia (Recommended)**
1. Buka Mini App di Telegram
2. Tap area kecil di pojok kiri atas (•••) sebanyak **5 kali**
3. Modal akan muncul untuk akses admin
4. Klik "Access Admin" jika Anda admin

### **Metode 2: URL Langsung**
- `/admin` - URL standar
- `/admin-panel` - URL alternatif
- `/a` - URL singkat

### **Metode 3: Browser Developer Tools**
1. Buka Mini App di browser
2. Buka Developer Tools (F12)
3. Di Console, ketik: `window.location.href = '/admin'`

## 🔒 Keamanan

- **Admin Whitelist**: Hanya user dengan ID Telegram yang terdaftar yang bisa akses
- **ID Admin Saat Ini**: `7609121993`
- **Autentikasi**: Berdasarkan Telegram User ID
- **Access Control**: Non-admin akan melihat "Akses Ditolak"

## 📱 Fitur Admin Panel

### **Tab Requests**
- Melihat semua deposit/withdraw requests
- Approve/Reject requests
- Status tracking

### **Tab Users**
- Daftar semua user yang join
- Info balance, total earned, referrals
- Join date & user details

### **Tab Stats**
- Total users, requests, pending requests
- Total deposits & withdrawals
- Financial summary

## 🛠️ Menambah Admin Baru

Edit file `src/App.tsx` dan tambahkan ID Telegram ke array `ADMIN_WHITELIST`:

```javascript
const ADMIN_WHITELIST = [
  7609121993, // Admin saat ini
  1234567890, // ID admin baru
  // Tambahkan ID lain di sini
];
```

## 🚀 Deployment

Setelah push ke GitHub, admin panel akan otomatis tersedia di:
- **Frontend**: https://your-netlify-url.netlify.app/admin
- **Backend**: https://your-railway-url.railway.app/api/users

## 📞 Support

Jika ada masalah dengan akses admin, pastikan:
1. ID Telegram sudah benar
2. Mini App dibuka dari Telegram Mobile/Desktop
3. Backend server sudah running 