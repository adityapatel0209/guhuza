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

// Ensure the users table is created
dbPromise.then(async (db) => {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `);
}).catch((err) => {
  console.error("Error creating users table:", err);
});

// User signup
app.post("/api/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;
    if (!firstName || !lastName || !email || !username || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const db = await dbPromise;
    await db.run("INSERT INTO users (firstName, lastName, email, username, password) VALUES (?, ?, ?, ?, ?)", [firstName, lastName, email, username, password]);
    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// User login
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const db = await dbPromise;
    const user = await db.get("SELECT * FROM users WHERE username = ?", [username]);
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    res.json({ message: "Login successful", username: user.username });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Middleware to authenticate user
const authenticate = async (req, res, next) => {
  const { username, password } = req.headers;
  if (!username || !password) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const db = await dbPromise;
    const user = await db.get("SELECT * FROM users WHERE username = ?", [username]);
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Fetch highest scores for all users
app.get("/api/highest-scores", authenticate, async (req, res) => {
  try {
    const db = await dbPromise;
    const rows = await db.all("SELECT * FROM highest_scores ORDER BY highest_score DESC");
    res.json({ data: rows });
  } catch (err) {
    console.error("Error fetching highest scores:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update highest score
app.post("/api/update-highest-score", authenticate, async (req, res) => {
  try {
    const { level, highest_score, time_taken } = req.body;

    if (!level || highest_score === undefined || time_taken === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const db = await dbPromise;

    // Check if a record exists
    const existing = await db.get("SELECT * FROM highest_scores WHERE username = ? AND level = ?", [
      req.user.username,
      level,
    ]);

    if (existing) {
      // Update only if the new score is higher
      if (highest_score > existing.highest_score) {
        await db.run(
          "UPDATE highest_scores SET highest_score = ?, time_taken = ? WHERE username = ? AND level = ?",
          [highest_score, time_taken, req.user.username, level]
        );
        return res.json({ message: "Highest score updated", status: "updated" });
      } else {
        return res.json({ message: "New score is not higher, no update made", status: "no_update" });
      }
    } else {
      // Insert new record
      await db.run("INSERT INTO highest_scores (username, level, highest_score, time_taken) VALUES (?, ?, ?, ?)", [
        req.user.username,
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