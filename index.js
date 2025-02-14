import express from 'express'
import axios from 'axios';
import cors from 'cors';  // Import cors

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/users', async (req, res) => {
  const level = req.query.level;
  if (!level) {
    return res.status(400).json({ message: 'Level is required' });
  }

  try {
    const response = await axios.get(
      `https://api-ghz-v2.azurewebsites.net/api/v2/quiz?level=${level}`
    );
    // console.log('Fetched Data:', response.data);
   
    console.log(`GET: ${level}`)
   
    res.json(response.data); // Send fetched data as response
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/api/update-highest-score', async (req, res) => {
  const { username, level, highest_score, time_taken } = req.body;

  try {
    const db = await dbPromise;
    const result = await db.run(
      `INSERT INTO highest_scores (username, level, highest_score, time_taken)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(username, level)
       DO UPDATE SET highest_score = excluded.highest_score, time_taken = excluded.time_taken
       WHERE excluded.highest_score > highest_scores.highest_score`,
      [username, level, highest_score, time_taken]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
