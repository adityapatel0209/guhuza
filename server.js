import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import cors from "cors";

const app = express();
const port = 3001;

const dbPromise = open({
  filename: "./src/Db/quiz_database.db",
  driver: sqlite3.Database,
});

app.use(cors());
app.use(express.json()); // Enable JSON parsing

// Fetch highest scores
app.get("/api/highest-scores", async (req, res) => {
  try {
    const db = await dbPromise;
    const rows = await db.all("SELECT * FROM highest_scores");
    res.json({ data: rows });
  } catch (err) {
    console.error("Error fetching highest scores:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update highest score
app.post("/api/update-highest-score", async (req, res) => {
  try {
    const { username, level, highest_score, time_taken } = req.body;

    if (!username || !level || highest_score === undefined || time_taken === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const db = await dbPromise;

    // Check if a record exists
    const existing = await db.get("SELECT * FROM highest_scores WHERE username = ? AND level = ?", [
      username,
      level,
    ]);

    if (existing) {
      // Update only if the new score is higher
      if (highest_score > existing.highest_score) {
        await db.run(
          "UPDATE highest_scores SET highest_score = ?, time_taken = ? WHERE username = ? AND level = ?",
          [highest_score, time_taken, username, level]
        );
        return res.json({ message: "Highest score updated", status: "updated" });
      } else {
        return res.json({ message: "New score is not higher, no update made", status: "no_update" });
      }
    } else {
      // Insert new record
      await db.run("INSERT INTO highest_scores (username, level, highest_score, time_taken) VALUES (?, ?, ?, ?)", [
        username,
        level,
        highest_score,
        time_taken,
      ]);
      return res.json({ message: "New score added", status: "inserted" });
    }
  } catch (err) {
    console.error("Error updating highest score:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});