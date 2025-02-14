import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Sidebar.css";
import guhuza from "../asset/logos/guhuza.svg";
import guhuzag from "../asset/logos/guhuza_g.svg";
import { AttemptedQuestions } from "../Pages/QuizPage";

interface SidebarProps {
  levels: string[];
  currentLevel: string;
  questions: { question: string }[];
  attemptedQuestions: number[];
  attemptedQuestionsData: AttemptedQuestions[];
  currentQuestionIndex: number;
  onLevelChange: (level: string) => void;
  onQuestionChange: (index: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  levels,
  currentLevel,
  questions,
  attemptedQuestions,
  attemptedQuestionsData,
  currentQuestionIndex,
  onLevelChange,
  onQuestionChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleLevelChange = (level: string) => {
    if (attemptedQuestions.length > 0) {
      setShowConfirmation(true);
    } else {
      onLevelChange(level);
    }
  };

  const confirmLevelChange = () => {
    setShowConfirmation(false);
    onLevelChange(currentLevel);
    navigate("/levels");
  };

  const cancelLevelChange = () => {
    setShowConfirmation(false);
  };

  const attemptedResult = (index: number) => {
    return (
      attemptedQuestionsData[index].selectedChoice ===
      attemptedQuestionsData[index].correctAnswer
    );
  };

  const questionItemClass = (index: number) => {
    if (index === currentQuestionIndex) return "sidebar-active";
    if (attemptedQuestions.includes(index)) {
      return attemptedResult(index) ? "sidebar-completed sidebar-good" : "sidebar-completed sidebar-bad";
    }
    return "";
  };

  const truncateQuestion = (text: string, maxLength: number = 5) => {
    const words = text.split(' ');
    return words.slice(0, maxLength).join(' ') + (words.length > maxLength ? '...' : '');
  };

  return (
    <div className={`sidebar-container ${isExpanded ? "sidebar-expanded" : "sidebar-collapsed"}`}>
      <div className="sidebar">
        <button
          className="sidebar-toggle"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          )}
        </button>

        <div className="sidebar-content">
          {isExpanded ? (
            <>
              <div className="sidebar-header">
                <div className="sidebar-level-badge">
                  <span className="sidebar-level-icon">⚡</span>
                  Level {currentLevel}
                </div>
                <div className="sidebar-progress">
                  <div 
                    className="sidebar-progress-bar" 
                    style={{ width: `${(currentQuestionIndex + 1) / questions.length * 100}%` }}
                  />
                </div>
              </div>

              <ul className="sidebar-questions">
                {questions.map((question, index) => (
                  <li
                    key={index}
                    className={`sidebar-question-item ${questionItemClass(index)}`}
                    onClick={() => onQuestionChange(index)}
                  >
                    <div className="sidebar-status-indicator">
                      {attemptedQuestions.includes(index) ? (
                        attemptedResult(index) ? (
                          <div className="sidebar-check-bubble">✓</div>
                        ) : (
                          <div className="sidebar-cross-bubble">✕</div>
                        )
                      ) : (
                        <div className="sidebar-number-bubble">{index + 1}</div>
                      )}
                    </div>
                    <div className="sidebar-question-content">
                      <span className="sidebar-question-text">
                        {truncateQuestion(question.question)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              <button
                className="sidebar-level-button"
                onClick={() => handleLevelChange(currentLevel)}
              >
                🏆 Change Level
              </button>
            </>
          ) : (
            <div className="sidebar-collapsed-view">
              <div className="sidebar-mini-header">
                <span className="sidebar-level-pill">Lv.{currentLevel}</span>
              </div>
              <div className="sidebar-mini-list">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`sidebar-mini-item ${questionItemClass(index)}`}
                    onClick={() => onQuestionChange(index)}
                  >
                    <div className="sidebar-mini-bubble">
                      {attemptedQuestions.includes(index) ? (
                        attemptedResult(index) ? (
                          <span className="sidebar-mini-check">✓</span>
                        ) : (
                          <span className="sidebar-mini-cross">✕</span>
                        )
                      ) : (
                        index + 1
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {showConfirmation && (
          <div className="sidebar-confirmation-modal">
            <div className="sidebar-modal-content">
              <p>Are you sure you want to change levels? Current progress will be lost.</p>
              <div className="sidebar-modal-actions">
                <button className="sidebar-confirm-btn" onClick={confirmLevelChange}>
                  Confirm
                </button>
                <button className="sidebar-cancel-btn" onClick={cancelLevelChange}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="sidebar-branding">
          <img src={isExpanded ? guhuza : guhuzag} alt="Logo" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;