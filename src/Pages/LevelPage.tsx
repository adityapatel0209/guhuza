import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/LevelPage.css";
import Analytics from "../Components/Analytics";
import axios from "axios";

interface HighestScore {
  level: number;
  highest_score: number;
  time_taken: number;
}

export default function LevelPage() {
  const navigate = useNavigate();
  const levels = Array.from({ length: 50 }, (_, i) => i + 1);
  const [highestScores, setHighestScores] = useState<HighestScore[]>([]);

  useEffect(() => {
    const fetchHighestScores = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/highest-scores');
        setHighestScores(response.data.data);
      } catch (error) {
        console.error("Error fetching highest scores:", error);
      }
    };

    fetchHighestScores();
  }, []);

  const handleLevelClick = (level: number) => {
    navigate(`/quiz/${level}`);
  };

  const getStars = (score: number) => {
    const starCount = Math.round(score / 2);
    return [...Array(5)].map((_, i) => (
      <span key={i} className={i < starCount ? "star-filled" : "star-empty"}>
        ★
      </span>
    ));
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'green';
    if (score >= 6) return 'yellow';
    return 'red';
  };

  return (
    <div className="level-page">
      <Analytics />
      <h1>Select Level</h1>
      <div className="levels-grid">
        {levels.map((level) => {
          const highestScore = highestScores.find(score => score.level === level);
          return (
            <div key={level} className="level-card">
              <button
                className="level-button"
                onClick={() => handleLevelClick(level)}
              >
                <div className="level-number">{level}</div>
                {highestScore && (
                  <div 
                    className="score-text" 
                    data-score-color={getScoreColor(highestScore.highest_score)}
                  >
                    {highestScore.highest_score} / 10
                  </div>
                )}
              </button>
              {highestScore && (
                <>
                  <div className="stars-container">
                    {getStars(highestScore.highest_score)}
                  </div>
                  <div className="time-taken">
                    <span className="time-icon">⏱</span>
                    {highestScore.time_taken}s
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}