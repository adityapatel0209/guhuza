import React from "react";
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
 // correctAnswers = 10;
  const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
  const averageTimePerQuestion = (totalTime / totalQuestions).toFixed(2);
  const fastestTime = Math.min(...levelTimes);
  const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);

  // Calculate stars based on score percentage
  const stars = Math.round((scorePercentage / 100) * 5);

  const mascotMessage = ([] = [
    { image:  mascot_good , message: "Prefect!" },
    { image:  mascot_mid , message: "Good job" },
    { image:  mascot_bad , message: "You can do better" },
  ]);

  const handleMascotMesage = (item:number) => {
    return (
      <>
          <div className="speechbubble-container">
              <img src={speechbubble} className="sb" alt="speechbubble" />
              <p className="speech-text">{mascotMessage[item].message}</p>
            </div>
            <div className="guhuza-mascot">
              <img className="mascot-svg" src={mascotMessage[item].image} alt="mascot" />
            </div>
      
      </>
    )
  }

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
            <div className="stat-card">
              <h3>Correct Answers</h3>
              <p>
                {correctAnswers}/{totalQuestions}
              </p>
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
          <div className="guhuza-mascot-container">
          
            {correctAnswers >= 8 ? handleMascotMesage(0) : correctAnswers >= 5 ? handleMascotMesage(1) : handleMascotMesage(2)}

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
