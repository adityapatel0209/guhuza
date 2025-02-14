import React, { useEffect } from "react";
import axios from "axios";
import "../Styles/scorecard.css";
import mascot_good from "../asset/mascot_svgs/Guzuha-04.svg";
import mascot_mid from "../asset/mascot_svgs/Guzuha-02.svg";
import mascot_bad from "../asset/mascot_svgs/Guzuha-01.svg";
import speechbubble from "../asset/other/speech-bubble-2.svg";

interface ScorecardProps {
  correctAnswers: number;
  totalQuestions: number;
  totalTime: number;
  levelTimes: number[];
  level: number;
  username: string;
  onRetry: () => void;
  onShare: () => void;
}

const Scorecard: React.FC<ScorecardProps> = ({
  correctAnswers,
  totalQuestions,
  totalTime,
  levelTimes,
  level,
  username,
  onRetry,
  onShare,
}) => {
  const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
  const averageTimePerQuestion = (totalTime / totalQuestions).toFixed(2);
  const fastestTime = Math.min(...levelTimes);
  const stars = Math.round((accuracy / 100) * 5);

  const mascotMessages = [
    { image: mascot_bad, message: "You can do better" },
    { image: mascot_mid, message: "Good job" },
    { image: mascot_good, message: "Perfect!" },
  ];

  const mascotIndex = correctAnswers >= 8 ? 2 : correctAnswers >= 5 ? 1 : 0;
  const mascot = mascotMessages[mascotIndex];

  useEffect(() => {
    const updateHighestScore = async () => {
      if (!username) return;
      try {
        await axios.post("http://localhost:3001/api/update-highest-score", {
          username,
          level,
          highest_score: correctAnswers,
          time_taken: totalTime,
        });
      } catch (err) {
        console.error("Failed to update highest score:", err);
      }
    };

    if (correctAnswers > 0) updateHighestScore();
  }, [correctAnswers, totalTime, level, username]);

  return (
    <div className="leaderboard">
      <div className="leaderboard-content">
        <h2>Quiz Results</h2>
        <div className="stars">
          {"★".repeat(stars)}
          {"☆".repeat(5 - stars)}
        </div>
        <div className="stats-grid-container">
          <div className="stats-grid">
            {[
              { title: "Correct Answers", value: `${correctAnswers}/${totalQuestions}` },
              { title: "Total Time", value: `${totalTime} sec` },
              { title: "Accuracy", value: `${accuracy}%` },
              { title: "Fastest Answer", value: `${fastestTime} sec` },
              { title: "Avg. Time Per Question", value: `${averageTimePerQuestion} sec` },
            ].map((stat, index) => (
              <div key={index} className="stat-card">
                <h3>{stat.title}</h3>
                <p>{stat.value}</p>
              </div>
            ))}
          </div>
          <div className="guhuza-mascot-container">
            <div className="speechbubble-container">
              <img src={speechbubble} className="sb" alt="speechbubble" />
              <p className="speech-text">{mascot.message}</p>
            </div>
            <div className="guhuza-mascot">
              <img className="mascot-svg" src={mascot.image} alt="mascot" />
            </div>
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