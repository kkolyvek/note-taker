// =======
// IMPORTS
// =======
const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

// =========
// VARIABLES
// =========
const PORT = process.env.PORT || 3001;
const app = express();

// ==========
// MIDDLEWARE
// ==========
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/notes', api);
app.use(express.static('public'));

// ======
// ROUTES
// ======

// Notes Page
app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Main Page
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// ===========
// BOOT SERVER
// ===========
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);