import React from "react";
import "../Styles/Insights.css";

interface InsightsProps {
  totalScore: number;
  totalTime: number;
  averageScore: string;
  highestLevelCompleted: number;
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

export default function Insights({
  totalScore,
  totalTime,
  averageScore,
  highestLevelCompleted,
  getStars,
}: InsightsProps) {
  const firstname = localStorage.getItem("firstname") || "User";
  const averageTimePerLevel = highestLevelCompleted > 0 ? totalTime / highestLevelCompleted : 0;

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
            <div className="stat-value">50</div>
            <div className="stat-label">Highest Level Attempted</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">7</div>
            <div className="stat-label">Average Score</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">20m30s</div>
            <div className="stat-label">Total Time</div>
          </div>
        </div>
      </div>
    </div>
  );
}