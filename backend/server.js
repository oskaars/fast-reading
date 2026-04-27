
// backend/server.js
const express = require('express');
const multer = require('multer'); // Do obsługi plików
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Brak pliku.');
  }

  const text = req.file.buffer.toString('utf-8');
  
  const words = text
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ');

  res.json({ words, count: words.length });
});

app.listen(port, () => {
  console.log(`serwer dziala na http://localhost:${port}`);
});