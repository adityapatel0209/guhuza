import React from 'react';
import '../Styles/scorecard.css';

interface ScorecardProps {
  correctAnswers: number;
  totalQuestions: number;
  totalTime: number;
  levelTimes: number[];
  onRetry: () => void;
  onShare: () => void;
}

const Scorecard: React.FC<ScorecardProps> = ({
  correctAnswers,
  totalQuestions,
  totalTime,
  levelTimes,
  onRetry,
  onShare,
}) => {
  const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
  const averageTimePerQuestion = (totalTime / totalQuestions).toFixed(2);
  const fastestTime = Math.min(...levelTimes);
  const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);

  // Calculate stars based on score percentage
  const stars = Math.round((scorePercentage / 100) * 5);

  return (
    <div className="leaderboard">
      <div className="leaderboard-content">
        <h2>Quiz Results</h2>
        <div className="stars">
          {"★".repeat(stars)}{"☆".repeat(5 - stars)}
        </div>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Correct Answers</h3>
            <p>{correctAnswers}/{totalQuestions}</p>
          </div>
          <div className="stat-card">
            <h3>Total Time</h3>
            <p>{totalTime} sec</p>
          </div>
          <div className="stat-card">
            <h3>Accuracy</h3>
            <p>{accuracy}%</p>
          </div>
          <div className="stat-card">
            <h3>Fastest Answer</h3>
            <p>{fastestTime} sec</p>
          </div>
          <div className="stat-card">
            <h3>Avg. Time Per Question</h3>
            <p>{averageTimePerQuestion} sec</p>
          </div>
          <div className="stat-card">
            <h3>Score Percentage</h3>
            <p>{scorePercentage}%</p>
          </div>
        </div>
        <div className="leaderboard-buttons">
          <button className="leaderboard-button retry-button" onClick={onRetry}>
            Try Again
          </button>
          <button className="leaderboard-button share-button" onClick={onShare}>
            Share Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default Scorecard;