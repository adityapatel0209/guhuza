import React from "react";

export default function Sidebar({
  questions,
  currentQuestionIndex,
  onQuestionClick,
  toggleSidebar,
  attemptedQuestions,
  isSidebarHidden,
  onSubmitQuiz,
}) {
  // Filter questions based on the current level
  const currentLevelQuestions = questions;

  return (
    <aside className={`sidebar ${isSidebarHidden ? "collapsed" : ""}`}>
      {/* Toggle Button */}
      <button
        className="toggle-sidebar"
        aria-label="Toggle Sidebar"
        onClick={toggleSidebar}
      >
        <span className="arrow-icon" />
      </button>

      {/* Sidebar Content */}
      <div className="sidebar-content">
        {/* Questions Section */}
        <h2>Questions</h2>
        <div className="questions-container">
          {currentLevelQuestions.map((q, index) => (
            <div
              key={q.id}
              className={`question-item ${
                index === currentQuestionIndex ? "active" : ""
              }`}
              onClick={() => onQuestionClick(index)}
            >
              <span>Q{q.id}</span>
              {attemptedQuestions.includes(q.id) && (
                <span className="attempted-tag">Attempted</span>
              )}
            </div>
          ))}
        </div>

        {/* Submit Quiz Button */}
        <button className="submit-quiz-button" onClick={onSubmitQuiz}>
          Submit Quiz
        </button>
      </div>

      {/* Collapsed Sidebar Buttons */}
      {isSidebarHidden && (
        <div className="collapsed-buttons">
          <button
            className="collapsed-button"
            onClick={() => onQuestionClick(currentQuestionIndex)}
          >
            Q
          </button>
          <button className="collapsed-button" onClick={onSubmitQuiz}>
            S
          </button>
        </div>
      )}
    </aside>
  );
}