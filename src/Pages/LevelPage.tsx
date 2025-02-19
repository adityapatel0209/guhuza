import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/LevelPage.css";
import axios from "axios";
import Insights from "../Components/Insights.tsx";

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

  const totalScore = highestScores.reduce((acc, score) => acc + score.highest_score * 10, 0);
  const totalTime = highestScores.reduce((acc, score) => acc + score.time_taken, 0);
  const averageScore = (totalScore / highestScores.length).toFixed(2);
  const levelsCompleted = highestScores.length;

  const sortedScores = [...highestScores].sort((a, b) => a.highest_score - b.highest_score);
  const top5LowestScores = sortedScores.slice(0, 5);
  const top5BestScores = sortedScores.slice(-5).reverse();

  return (
    <div className="level-page">
      {/* Banner Section */}
      <div className="banner">
        <h1 className="main-heading">Select Level</h1>
        <p className="page-description">
          Welcome to the Level Selection page! Here, you can choose from 50 levels to test your skills.
          Track your progress, improve your scores, and aim for the top. Use the insights below to
          identify areas for improvement and celebrate your best performances.
        </p>
      </div>

      {/* Container for Layout */}
      <div className="container">
        {/* Insights Component */}
        <Insights
          top5LowestScores={top5LowestScores}
          top5BestScores={top5BestScores}
          totalScore={totalScore}
          totalTime={totalTime}
          averageScore={averageScore}
          levelsCompleted={levelsCompleted}
          handleLevelClick={handleLevelClick}
          getScoreColor={getScoreColor}
          getStars={getStars}
        />

        {/* Levels Grid */}
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
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${highestScore.highest_score * 10}%`, backgroundColor: getScoreColor(highestScore.highest_score) }}
                      ></div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}