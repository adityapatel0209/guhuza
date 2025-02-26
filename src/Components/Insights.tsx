import React from "react";
import "../Styles/Insights.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface HighestScore {
  level: number;
  highest_score: number;
  time_taken: number;
}

interface InsightsProps {
  top5LowestScores: HighestScore[];
  totalScore: number;
  totalTime: number;
  averageScore: string;
  levelsCompleted: number;
  handleLevelClick: (level: number) => void;
  getScoreColor: (score: number) => string;
  getStars: (score: number) => JSX.Element[];
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${seconds}s`;
};

export default function Insights({
  top5LowestScores,
  totalScore,
  totalTime,
  averageScore,
  levelsCompleted,
  handleLevelClick,
  getScoreColor,
  getStars,
}: InsightsProps) {
  // Chart options for the improvement chart (if needed)
  const improvementRequiredData = {
    labels: top5LowestScores.map((score) => `Level ${score.level}`),
    datasets: [
      {
        label: "Improvement Required",
        data: top5LowestScores.map((score) => score.highest_score * 10),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Improvement Required" },
      tooltip: { enabled: false },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };

  // New metric: Average Time per Level
  const averageTimePerLevel = levelsCompleted > 0 ? totalTime / levelsCompleted : 0;
  
  const firstname = localStorage.getItem("firstname") || "User";

  return (
    <div className="bento-grid">
      {/* Row 1: Total Score and Firstname */}
      <div className="bento-card insight-card total-score-card">
        <div className="total-score-container">
          <p className="firstname-text">{firstname}</p>
          <div className="total-score-content">
            <h3 className="insight-heading">Total Score</h3>
            <p className="total-score-text">{totalScore} / 5000</p>
            <div className="stars-container">{getStars(totalScore / 500)}</div>
          </div>
        </div>
      </div>

      {/* Row 2: Levels Information */}
      <div className="bento-row">
        {/* Levels Needing Improvement */}
        <div className="bento-card insight-card levels-card">
          <div className="card-title">Top 5 Levels Needing Improvement</div>
          <div className="insight-list">
            {top5LowestScores.map((score) => (
              <div
                key={score.level}
                className="improvement-card"
                onClick={() => handleLevelClick(score.level)}
              >
                <div className="level-info">
                  <span className="level-text">Level {score.level}</span>
                  <div className="score-container">
                    {score.highest_score} / 10
                  </div>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${score.highest_score * 10}%`,
                      backgroundColor: getScoreColor(score.highest_score),
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Card: Average Time per Level */}
        <div className="bento-card insight-card levels-card">
          <div className="card-title">Average Time per Level</div>
          <div className="insight-list">
            <div className="insight-level">
              <div className="level-info">
                <span className="level-text">Avg Time</span>
                <div className="score-container">{formatTime(averageTimePerLevel)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partition Section */}
      <h2 className="section-heading">Performance Overview</h2>

      {/* Row 3: Overall Insights */}
      <div className="bento-row">
        <div className="bento-card insight-card small-card">
          <h3 className="insight-heading">Average Score</h3>
          <p className="centered-text">{averageScore} / 10</p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${(parseFloat(averageScore) / 10) * 100}%`,
                backgroundColor: "#FFD166",
              }}
            ></div>
          </div>
        </div>

        <div className="bento-card insight-card small-card">
          <h3 className="insight-heading">Total Time Spent</h3>
          <p className="centered-text">{formatTime(totalTime)}</p>
        </div>

        <div className="bento-card insight-card small-card">
          <h3 className="insight-heading">Levels Completed</h3>
          <p className="centered-text">{levelsCompleted} / 50</p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${(levelsCompleted / 50) * 100}%`,
                backgroundColor: "#06D6A0",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}