const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/trips', require('./routes/trips'));
app.use('/api/chat', require('./routes/chat'));

// Serve frontend
app.use(express.static(path.join(__dirname, '../public')));

// Catch-all
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5001;
const HOST = '0.0.0.0';

function validateEnv() {
  const required = ['MONGODB_URI', 'JWT_SECRET'];
  const missing = required.filter((key) => !process.env[key]?.trim());
  if (missing.length) {
    console.error(`Missing required environment variables: ${missing.join(', ')}`);
    console.error('Set them in the Render dashboard under Environment.');
    process.exit(1);
  }

  const uri = process.env.MONGODB_URI;
  if (process.env.RENDER && /localhost|127\.0\.0\.1/.test(uri)) {
    console.error('MONGODB_URI points to localhost, which does not work on Render.');
    console.error('Create a free MongoDB Atlas cluster and set MONGODB_URI to your Atlas connection string.');
    process.exit(1);
  }
}

validateEnv();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, HOST, () => console.log(`Server running on http://${HOST}:${PORT}`));
  })
  .catch((err) => {
    console.error('DB Error:', err.message);
    if (process.env.RENDER) {
      console.error('Check MONGODB_URI in Render Environment (use MongoDB Atlas, not 127.0.0.1).');
    }
    process.exit(1);
  });
