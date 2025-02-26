import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function initializeDb() {
  const db = await open({
    filename: './src/Db/quiz_database.db',
    driver: sqlite3.Database,
  });

  // Set busy timeout to 5 seconds (5000 milliseconds)
  await db.exec('PRAGMA busy_timeout = 5000;');

  // Drop the users table if it exists
  await db.exec('DROP TABLE IF EXISTS users;');

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS highest_scores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      level INTEGER CHECK(level BETWEEN 1 AND 50),
      highest_score INTEGER CHECK(highest_score BETWEEN 0 AND 10),
      time_taken INTEGER,
      UNIQUE(username, level)
    );

    CREATE TABLE IF NOT EXISTS leaderboard (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      score INTEGER CHECK(score BETWEEN 0 AND 10)
    );
  `);

  // Insert initial entries with plain text passwords
  await db.run("INSERT OR IGNORE INTO users (firstName, lastName, email, username, password) VALUES (?, ?, ?, ?, ?)", ['John', 'Doe', 'john@example.com', 'john', 'password123']);
  await db.run("INSERT OR IGNORE INTO users (firstName, lastName, email, username, password) VALUES (?, ?, ?, ?, ?)", ['Jane', 'Smith', 'jane@example.com', 'jane', 'password123']);
  await db.run("INSERT OR IGNORE INTO users (firstName, lastName, email, username, password) VALUES (?, ?, ?, ?, ?)", ['Alice', 'Johnson', 'alice@example.com', 'alice', 'password123']);

  console.log("Database initialized with initial entries.");
}

initializeDb().catch(err => {
  console.error("Error initializing database:", err);
});