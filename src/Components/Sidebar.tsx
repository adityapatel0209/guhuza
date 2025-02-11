import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Sidebar.css'; // Import the Sidebar styles
import checksvg from"../asset/other/check.svg"

interface SidebarProps {
  levels: string[];
  currentLevel: string;
  questions: { question: string }[];
  attemptedQuestions: number[];
  currentQuestionIndex: number;
  onLevelChange: (level: string) => void;
  onQuestionChange: (index: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  levels,
  currentLevel,
  questions,
  attemptedQuestions,
  currentQuestionIndex,
  onLevelChange,
  onQuestionChange,
}) => {
  const [isVisible, setIsVisible] = useState(false); // State to control sidebar visibility
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
    navigate('/levels');
  };

  const cancelLevelChange = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      {/* Toggle Button */}

      <button
        className="sidebar-toggle-button"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? '◄' : '►'}
      </button>

      {/* Sidebar */}

      <div className={`sidebar ${isVisible ? 'visible' : ''}`}>
        <div className="sidebar-content">

          {/* Level Box at the Top */}

          <div className="level-box">
            <h2>Level: {currentLevel}</h2>
          </div>

          {/* Questions List */}

          <h3>Questions</h3>
          <ul className="questions-list">
            {questions.map((question, index) => (
              <li
                key={index}
                className={`question-item ${
                  index === currentQuestionIndex ? 'active' : ''
                }`}
                onClick={() => onQuestionChange(index)}
              >
                <span className="question">Q{index + 1}: {question.question}</span>
                {attemptedQuestions.includes(index) && (
                  <span className="attempted"><svg width="2rem" height="2rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="st0" d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#fff" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round" />
              </svg></span>
                )}
              </li>
            ))}
          </ul>

          {/* Select Level Button */}
          
          <button
            className="select-level-button"
            onClick={() => handleLevelChange(currentLevel)}
          >
            Select Level
          </button>
        </div>

        {/* Confirmation Popup */}
        {showConfirmation && (
          <div className="confirmation-popup">
            <p>Are you sure you want to change the level? All progress will be lost.</p>
            <button onClick={confirmLevelChange}>Yes</button>
            <button onClick={cancelLevelChange}>No</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;