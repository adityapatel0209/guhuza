import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Sidebar.css"; // Import the Sidebar styles
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
    if (index === currentQuestionIndex) return "active";

    if (attemptedQuestions.includes(index)) {
      const result = attemptedResult(index) ? "goodResult" : "badResult";

      return `completed ${result}`;
    }
    return "";
  };

  return (
    <>
      {/* Toggle Button */}
      <div className="sidebar-container">
        {/* Sidebar */}

        <div className={`sidebar ${isVisible ? "visible" : "small"}`}>
          <button
            className="sidebar-toggle-button"
            onClick={() => {
              setIsVisible(!isVisible);
              console.log(attemptedQuestionsData);
              console.log(attemptedQuestions);
            }}
          >
            {isVisible ? (
              <svg
                width="1rem"
                height="1rem"
                viewBox="0 0 512 512"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  id="Page-1"
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <g
                    id="drop"
                    fill="#fff"
                    transform="translate(32, 42.666667)  rotate(-90, 256, 256)"
                  >
                    <path className="tg1"
                      d="M246.312928,5.62892705 C252.927596,9.40873724 258.409564,14.8907053 262.189374,21.5053731 L444.667042,340.84129 C456.358134,361.300701 449.250007,387.363834 428.790595,399.054926 C422.34376,402.738832 415.04715,404.676552 407.622001,404.676552 L42.6666667,404.676552 C19.1025173,404.676552 7.10542736e-15,385.574034 7.10542736e-15,362.009885 C7.10542736e-15,354.584736 1.93772021,347.288125 5.62162594,340.84129 L188.099293,21.5053731 C199.790385,1.04596203 225.853517,-6.06216498 246.312928,5.62892705 Z"
                      id="Combined-Shape"
                    ></path>
                  </g>
                </g>
              </svg>
            ) : (
              <svg
                width="1rem"
                height="1rem"
                viewBox="0 0 512 512"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  id="Page-1"
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <g
                    id="drop"
                    fill="#fff"
                    transform="translate(32, 42.666667) rotate(90, 256, 256)"
                  >
                    <path className="tg2"
                      d="M246.312928,5.62892705 C252.927596,9.40873724 258.409564,14.8907053 262.189374,21.5053731 L444.667042,340.84129 C456.358134,361.300701 449.250007,387.363834 428.790595,399.054926 C422.34376,402.738832 415.04715,404.676552 407.622001,404.676552 L42.6666667,404.676552 C19.1025173,404.676552 7.10542736e-15,385.574034 7.10542736e-15,362.009885 C7.10542736e-15,354.584736 1.93772021,347.288125 5.62162594,340.84129 L188.099293,21.5053731 C199.790385,1.04596203 225.853517,-6.06216498 246.312928,5.62892705 Z"
                      id="Combined-Shape"
                    ></path>
                  </g>
                </g>
              </svg>
            )}
          </button>

          <div className="sidebar-content">
            <div className="level-box">
              <h2>Level: {currentLevel}</h2>
              <div className="level-box-small">
                <h1>L</h1>
                <p>{currentLevel}</p>
              </div>
            </div>

            {/* Questions List */}
            {/* <div className="question-title">
              <h3>Questions</h3>
            </div> */}

            <ul className="questions-list">
              {questions.map((question, index) => (
                <li
                  key={index}
                  className={`question-item ${questionItemClass(index)}`}
                  onClick={() => onQuestionChange(index)}
                >
                  <span className="question">
                    <span className="question-no">Q{index + 1}</span>
                    <span className="question-content">
                      . {question.question}
                    </span>
                  </span>

                  <span className="attempted">
                    {attemptedQuestions.includes(index) ? (
                      attemptedResult(index) ? (
                        <svg
                          width="2rem"
                          height="2rem"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            className="st0"
                            d="M4 12.6111L8.92308 17.5L20 6.5"
                            stroke="#06be31"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="2rem"
                          height="2rem"
                          viewBox="0 0 24 24"
                          fill="#b80214"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            className="st1"
                            d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"
                          />
                        </svg>
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </li>
              ))}
            </ul>

            {/* Select Level Button */}

            <button
              className="select-level-button"
              onClick={() => handleLevelChange(currentLevel)}
            >
              Next Level
            </button>
          </div>

          {/* Confirmation Popup */}
          {showConfirmation && (
            <div className="confirmation-popup">
              <p>
                Are you sure you want to change the level? All progress will be
                lost.
              </p>
              <button onClick={confirmLevelChange}>Yes</button>
              <button onClick={cancelLevelChange}>No</button>
            </div>
          )}
          <div className="bottom-logo">
            <img className="guhuzalogo1" src={guhuza} alt="" />
            <img className="guhuzalogo2" src={guhuzag} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
