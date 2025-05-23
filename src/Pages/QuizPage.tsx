import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/QuizPage.css";
import Scorecard from "../Components/scorecard";
import Sidebar from "../Components/Sidebar"; // Import the Sidebar component
import { CircularProgress, Box } from "@mui/material";

interface Question {
  question: string;
  answers: string[];
  test_answer: number;
}

interface QuizData {
  test: {
    question: Question[];
  };
}
export interface AttemptedQuestions {
  questionIndex: number;
  correctAnswer: number;
  selectedChoice: number | null;
  viewState: boolean | null;
}

const QuizPage: React.FC = () => {
  const { level } = useParams<{ level: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [endTime, setEndTime] = useState<number | null>(null);
  const [levelTimes, setLevelTimes] = useState<number[]>([]);
  const [attemptedQuestions, setAttemptedQuestions] = useState<number[]>([]);
  const [attemptedQuestionsData, setAttemptedQuestionsData] = useState<
    AttemptedQuestions[]
  >([]);
  const [selectState, setSelectState] = useState<boolean | null>(null);

  const levels = ["Level 1", "Level 2", "Level 3"]; // Example levels

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users?level=${level}`
        );

        setData(response.data);
        setLoading(false);
        setStartTime(Date.now());
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [level]);

  const handleOptionClick = (index: number) => {
    setSelectState(true);
    setSelectedOption(index);

    if (index === data!.test.question[currentQuestionIndex].test_answer) {
      setScore(score + 1);
    }

    setLevelTimes([...levelTimes, Date.now() - startTime]);
  };

  const handleNextQuestion = () => {
    !selectState &&
      (() => {
        setSelectState(null);
        setSelectedOption(null);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setStartTime(Date.now());
      })();
    
    selectState === true &&
      (() => {
        setAttemptedQuestions([...attemptedQuestions, currentQuestionIndex]);
        setSelectState(false);
        setAttemptedQuestionsData([
          ...attemptedQuestionsData,
          {
            questionIndex: currentQuestionIndex,
            correctAnswer: currentQuestion.test_answer,
            selectedChoice: selectedOption,
            viewState: true,
          },
        ]);
      })();
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setEndTime(null);
    setLevelTimes([]);
    setStartTime(Date.now());
    setAttemptedQuestions([]);
  };

  const handleShare = () => {
    // Implement share functionality
    alert("Share functionality not implemented yet.");
  };

  const handleLevelChange = (newLevel: string) => {
    navigate(`/quiz/${newLevel.toLowerCase().replace(" ", "-")}`);
  };

  const handleQuestionChange = (index: number) => {
    if (
      attemptedQuestions.includes(index) ||
      index === Math.max(...attemptedQuestions) + 1
    ) {
      setCurrentQuestionIndex(index);
    }
  };

  const handleNextLevel = () => {
    const nextLevel = parseInt(level || "1") + 1;
    navigate(`/quiz/${nextLevel}`);
  };

  const submitScore = async () => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (username && password) {
      try {
        await axios.post(
          "http://localhost:3001/api/update-highest-score",
          {
            level: parseInt(level || "1"),
            highest_score: score,
            time_taken: levelTimes.reduce((acc, time) => acc + time, 0) / 1000, // total time in seconds
          },
          {
            headers: { username, password },
          }
        );
      } catch (error) {
        console.error("Error submitting score:", error);
      }
    } else {
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <Box>
          <CircularProgress size="3rem" />
        </Box>
        <p>Loading</p>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data found</div>;
  }

  if (currentQuestionIndex >= data.test.question.length) {
    const totalTime = levelTimes.reduce((acc, time) => acc + time, 0);
    submitScore();
    return (
      <Scorecard
        correctAnswers={score}
        totalQuestions={data.test.question.length}
        totalTime={totalTime}
        levelTimes={levelTimes.map((time) => time / 1000)}
        onRetry={handleRetry}
        onShare={handleShare}
        onNextLevel={handleNextLevel}
        level={parseInt(level || "1")}
        username={localStorage.getItem("username") || "player1"} // Replace with dynamic username if available
      />
    );
  }

  const currentQuestion = data.test.question[currentQuestionIndex];

  const questionAttempted = attemptedQuestionsData.some(
    (d) => d.questionIndex === currentQuestionIndex
  );

  const getButtonClass = (index: number) => {
    if (!questionAttempted) {
      if (selectedOption === null) return "";

      if (selectState === null || selectState === true) {
        return index === selectedOption ? "selected" : "";
      }

      if (selectState === false) {
        if (index === currentQuestion.test_answer) return "correct withAnim";
        if (index === selectedOption) return "incorrect withAnim";
      }
    } else {
      if (index === attemptedQuestionsData[currentQuestionIndex].correctAnswer)
        return "correct";
      if (index === attemptedQuestionsData[currentQuestionIndex].selectedChoice)
        return "incorrect";
    }

    return "";
  };

  return (
    <div className="quiz-page">
      <Sidebar
        levels={levels}
        currentLevel={level || ""}
        questions={data.test.question}
        attemptedQuestions={attemptedQuestions}
        attemptedQuestionsData={attemptedQuestionsData}
        currentQuestionIndex={currentQuestionIndex}
        onLevelChange={handleLevelChange}
        onQuestionChange={handleQuestionChange}
      />
      <div className="quiz-container">
        <div className="quiz-main-container">
          <div className="question-container">
            <h2>Question {currentQuestionIndex + 1}</h2>
            <p className="question-text">{currentQuestion.question}</p>
          </div>
          <div className="answers-container">
            {currentQuestion.answers.map((answer, index) => (
              <button
                key={index}
                className={`answer-button ${getButtonClass(index)}`}
                onClick={() => {
                  handleOptionClick(index);
                }}
                disabled={selectState === false || questionAttempted}
              >
                {answer}
              </button>
            ))}
          </div>

          {selectedOption !== null && (
            <button
              className="next-button"
              onClick={handleNextQuestion}
              disabled={selectedOption === null}
            >
              {selectState === true
                ? "Check Answer"
                : selectState === false &&
                  currentQuestionIndex + 1 >= data.test.question.length
                ? "Finish Quiz"
                : "Next Question"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
