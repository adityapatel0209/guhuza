import React from "react";
import "../Styles/Insights.css";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface HighestScore {
  level: number;
  highest_score: number;
  time_taken: number;
}

interface InsightsProps {
  top5LowestScores: HighestScore[];
  top5BestScores: HighestScore[];
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
  top5BestScores,
  totalScore,
  totalTime,
  averageScore,
  levelsCompleted,
  handleLevelClick,
  getScoreColor,
  getStars,
}: InsightsProps) {
  const improvementRequiredData = {
    labels: top5LowestScores.map(score => `Level ${score.level}`),
    datasets: [
      {
        label: 'Improvement Required',
        data: top5LowestScores.map(score => score.highest_score * 10),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      title: {
        display: true, // Show title
        text: 'Improvement Required',
      },
      tooltip: {
        enabled: false, // Disable tooltips
      },
    },
    scales: {
      x: {
        display: false, // Hide x-axis
      },
      y: {
        display: false, // Hide y-axis
      },
    },
  };

  return (
    <div className="bento-grid">
      {/* Row 1: Total Score */}
      <div className="bento-card insight-card total-score-card">
        <h3 className="insight-heading">Total Score</h3>
        <p className="total-score-text">{totalScore} / 5000</p>
        <div className="stars-container">
          {getStars(totalScore / 500)}
        </div>
      </div>

      {/* Row 2: Levels Needing Improvement, Best Levels, and Graph */}
      <div className="bento-row">
        <div className="bento-card insight-card levels-card">
          <div className="card-title">Top 5 Levels Needing Improvement</div>
          <div className="insight-list">
            {top5LowestScores.map(score => (
              <div
                key={score.level}
                className="insight-level"
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
                    style={{ width: `${score.highest_score * 10}%`, backgroundColor: getScoreColor(score.highest_score) }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bento-card insight-card levels-card">
          <div className="card-title">Top 5 Best Levels</div>
          <div className="insight-list">
            {top5BestScores.map(score => (
              <div
                key={score.level}
                className="insight-level"
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
                    style={{ width: `${score.highest_score * 10}%`, backgroundColor: getScoreColor(score.highest_score) }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bento-card insight-card graph-card">
          <div className="card-title">Graph</div>
          <div className="graph-container">
            <Bar data={improvementRequiredData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Row 3: Average Score, Total Time, Levels Completed */}
      <div className="bento-row">
        <div className="bento-card insight-card small-card">
          <h3 className="insight-heading">Average Score</h3>
          <p className="centered-text">{averageScore} / 10</p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(parseFloat(averageScore) / 10) * 100}%`, backgroundColor: '#FFD166' }}
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
              style={{ width: `${(levelsCompleted / 50) * 100}%`, backgroundColor: '#06D6A0' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}