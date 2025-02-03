import React, { useContext } from "react";
import TimerContext from "./TimerContext.jsx"; // Import TimerContext

export default function QuestionPage({
  question,
  options,
  selectedAnswer,
  onOptionClick,
  onSubmit,
  onNext,
  isNextDisabled,
  correctAnswerIndex,
  isSubmitted,
  currentLevel,
}) {
  const { totalTime, levelTimers } = useContext(TimerContext); // Access timer context

  const handleOptionClick = (index) => {
    if (!isSubmitted) {
      onOptionClick(index); // Allow selection only if not submitted
    }
  };

  return (
    <main className="main-content">
      <div className="question-card">
        <div className="timer-container">
          <div className="timer">Total Time: {totalTime}</div>
          <div className="level-timer">Level Time: {levelTimers[currentLevel] || 0}</div>
        </div>
        <div className="question-text">{question}</div>
        <div className="options-grid">
        {options.map((option, index) => (
  <button
    key={index}
    className={`option-button 
      ${selectedAnswer === index ? "selected" : ""} 
      ${isSubmitted && selectedAnswer === index ? (selectedAnswer === correctAnswerIndex ? "correct" : "wrong") : ""}
      ${isSubmitted && index === correctAnswerIndex ? "correct" : ""}
    `}
    data-option={index}
    onClick={() => handleOptionClick(index)}
    disabled={isSubmitted} // Disable the button after submission
  >
    {option}
  </button>
))}
        </div>
        <div className="buttons-container">
          <button className="submit-button" onClick={onSubmit} disabled={isSubmitted}>
            Submit
          </button>
          <button className="next-button" onClick={onNext} disabled={isNextDisabled}>
            Next Question
          </button>
        </div>
      </div>
    </main>
  );
}