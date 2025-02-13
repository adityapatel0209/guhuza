import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors';  // Import cors

const app = express();
const port = 3001;

const dbPromise = open({
  filename: './src/Db/quiz_database.db',
  driver: sqlite3.Database // Use the correct default export
});

app.use(cors());  // Use cors middleware

app.get('/api/highest-scores', async (req, res) => {
  try {
    const db = await dbPromise;
    const rows = await db.all('SELECT * FROM highest_scores');
    res.json({ data: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});