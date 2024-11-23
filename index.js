// index.js
// where your node app starts

// Initialize project and load environment variables
require('dotenv').config();
const express = require('express');
const app = express();

// Set middleware untuk menghidupkan file statis
app.use(express.static('public'));

// Aktifkan `trust proxy` untuk mendapatkan IP asli jika di belakang proxy
app.set('trust proxy', true);

// Rute default (untuk mengirimkan halaman index)
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Rute API untuk Header Parser
app.get("/api/whoami", (req, res) => {
  const ip = req.ip; // Mendapatkan IP address pengguna
  const language = req.get("Accept-Language"); // Mendapatkan bahasa dari header
  const software = req.get("User-Agent"); // Mendapatkan informasi perangkat lunak dari header

  // Mengirimkan response JSON
  res.json({
    ipaddress: ip,
    language: language,
    software: software,
  });
});

// Jalankan server pada port yang ditentukan
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`App is listening on port ${listener.address().port}`);
});
