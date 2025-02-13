-- Create the highest_scores table (with time_taken included)
CREATE TABLE IF NOT EXISTS highest_scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    level INTEGER CHECK(level BETWEEN 1 AND 50),
    highest_score INTEGER CHECK(highest_score BETWEEN 0 AND 10),
    time_taken INTEGER,  -- Time in seconds
    UNIQUE(username, level)
);

-- Create the leaderboard table (only score column)
CREATE TABLE IF NOT EXISTS leaderboard (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    score INTEGER CHECK(score BETWEEN 0 AND 10)
);