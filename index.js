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
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
  const language = req.headers['accept-language'] || "Unknown";
  const software = req.headers['user-agent'] || "Unknown";

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
