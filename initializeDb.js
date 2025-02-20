import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function initializeDb() {
  const db = await open({
    filename: './src/Db/quiz_database.db',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
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

  // Insert initial entries
  await db.run("INSERT INTO users (username, password) VALUES (?, ?)", ['aditya', '$2b$10$abcdefg...']);
  await db.run("INSERT INTO users (username, password) VALUES (?, ?)", ['user2', '$2b$10$abcdefg...']);
  await db.run("INSERT INTO users (username, password) VALUES (?, ?)", ['user3', '$2b$10$abcdefg...']);
  await db.run("INSERT INTO users (username, password) VALUES (?, ?)", ['user4', '$2b$10$abcdefg...']);
  await db.run("INSERT INTO users (username, password) VALUES (?, ?)", ['user5', '$2b$10$abcdefg...']);

  console.log("Database initialized with initial entries.");
}

initializeDb().catch(err => {
  console.error("Error initializing database:", err);
});