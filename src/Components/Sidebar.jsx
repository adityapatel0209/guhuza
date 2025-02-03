import React from "react";

export default function Sidebar({
  questions,
  currentQuestionIndex,
  onQuestionClick,
  onLevelClick,
  toggleSidebar,
  currentLevel,
  attemptedQuestions,
  isSidebarHidden,
  onSubmitQuiz,
}) {
  const levels = Array.from({ length: 50 }, (_, i) => i + 1); // Levels 1 to 50

  // Filter questions based on the current level
  const currentLevelQuestions = questions.filter((q) => q.level === currentLevel);

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

        {/* Levels Section */}
        <h2>Levels</h2>
        <div className="levels-container">
          {levels.map((level) => (
            <button
              key={level}
              className={`level-button ${
                currentLevel === level ? "active" : ""
              }`}
              onClick={() => onLevelClick(level)}
            >
              {level} {/* Only show the number */}
            </button>
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
          <button className="collapsed-button" onClick={() => onLevelClick(currentLevel)}>
            L
          </button>
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