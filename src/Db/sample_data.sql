-- Insert sample data into highest_scores table
INSERT INTO highest_scores (username, level, highest_score, time_taken) VALUES 
('player1', 1, 10, 100),
('player1', 2, 8, 120),
('player2', 1, 7, 110),
('player2', 2, 9, 105),
('player3', 1, 6, 130),
('player3', 2, 10, 95),
('player4', 1, 5, 140),
('player4', 2, 8, 125);

-- Insert sample data into leaderboard table
INSERT INTO leaderboard (username, level, score, time_taken) VALUES 
('player1', 1, 9, 110),
('player1', 2, 7, 130),
('player2', 1, 6, 100),
('player2', 2, 8, 120),
('player3', 1, 5, 90),
('player3', 2, 9, 115),
('player4', 1, 4, 105),
('player4', 2, 7, 140);