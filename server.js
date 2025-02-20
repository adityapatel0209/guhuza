import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
const port = 3001;
const secretKey = 1547 ; // Use a secure key in production

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
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const db = await dbPromise;
    await db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);
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
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Middleware to authenticate user
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

// Fetch highest scores
app.get("/api/highest-scores", authenticate, async (req, res) => {
  try {
    const db = await dbPromise;
    const rows = await db.all("SELECT * FROM highest_scores WHERE username = ?", [req.user.username]);
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