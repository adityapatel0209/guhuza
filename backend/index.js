require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());
app.use(require('cors')());

// Create MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Sample route to store user attempts
app.post('/attempts', (req, res) => {
  const { userId, score } = req.body;
  const sql = 'INSERT INTO attempts (user_id, score) VALUES (?, ?)';
  db.query(sql, [userId, score], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: 'Attempt saved', id: result.insertId });
  });
});

// Sample route to get analytics
app.get('/analytics', (req, res) => {
  const sql = 'SELECT user_id, AVG(score) as average_score FROM attempts GROUP BY user_id';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));