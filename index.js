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
        console.log('Fetched Data:', response.data);
        res.json(response.data); // Send fetched data as response
      } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
      36
    });

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
