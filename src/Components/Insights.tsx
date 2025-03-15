import React from "react";
import "../Styles/Insights.css";

interface InsightsProps {
  totalScore: number;
  totalTime: number;
  averageScore: string;
  levelsCompleted: number;
  getStars: (score: number) => JSX.Element[];
}

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  }
  return minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`;
};

const calculateProgress = (current: number, total: number) => {
  return ((current / total) * 100).toFixed(1);
};

const calculateEfficiency = (score: number, time: number) => {
  return ((score / time) * 100).toFixed(2);
};

export default function Insights({
  totalScore,
  totalTime,
  averageScore,
  levelsCompleted,
  getStars,
}: InsightsProps) {
  const firstname = localStorage.getItem("firstname") || "User";
  const averageTimePerLevel = levelsCompleted > 0 ? totalTime / levelsCompleted : 0;
  const completionRate = calculateProgress(levelsCompleted, 50);
  const efficiency = calculateEfficiency(totalScore, totalTime);

  return (
    <div className="bento-grid">
      {/* Header Section */}
      <div className="bento-card total-score-card">
        <p className="firstname-text">Welcome back, {firstname}!</p>
        <h3 className="insight-heading" style={{ color: '#ffffff' }}>Total Progress</h3>
        <p className="total-score-text">{totalScore} / 5000</p>
        <div className="stars-container">{getStars(totalScore / 500)}</div>
        
        <div className="stat-grid">
          <div className="stat-item">
            <div className="stat-value">{completionRate}%</div>
            <div className="stat-label">Completion</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{efficiency}</div>
            <div className="stat-label">Efficiency Score</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{formatTime(totalTime)}</div>
            <div className="stat-label">Total Time</div>
          </div>
        </div>
      </div>
    </div>
  );
}