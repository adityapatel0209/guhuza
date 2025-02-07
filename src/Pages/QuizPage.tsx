import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../Styles/QuizPage.css';
import Scorecard from '../Components/scorecard';

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

const QuizPage: React.FC = () => {
  const { level } = useParams<{ level: string }>();
  const [data, setData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [endTime, setEndTime] = useState<number | null>(null);
  const [levelTimes, setLevelTimes] = useState<number[]>([]);

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
    setSelectedOption(index);
    if (index === data!.test.question[currentQuestionIndex].test_answer) {
      setScore(score + 1);
    }
    setLevelTimes([...levelTimes, Date.now() - startTime]);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setStartTime(Date.now());
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setEndTime(null);
    setLevelTimes([]);
    setStartTime(Date.now());
  };

  const handleShare = () => {
    // Implement share functionality
    alert('Share functionality not implemented yet.');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data found</div>;
  }

  if (currentQuestionIndex >= data.test.question.length) {
    const totalTime = levelTimes.reduce((acc, time) => acc + time, 0);
    return (
      <Scorecard
        correctAnswers={score}
        totalQuestions={data.test.question.length}
        totalTime={totalTime / 1000}
        levelTimes={levelTimes.map(time => time / 1000)}
        onRetry={handleRetry}
        onShare={handleShare}
      />
    );
  }

  const currentQuestion = data.test.question[currentQuestionIndex];

  return (
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
              className={`answer-button ${
                selectedOption !== null
                  ? index === currentQuestion.test_answer
                    ? 'correct'
                    : index === selectedOption
                    ? 'incorrect'
                    : ''
                  : ''
              }`}
              onClick={() => handleOptionClick(index)}
              disabled={selectedOption !== null}
            >
              {answer}
            </button>
          ))}
        </div>
        {selectedOption !== null && (
          <button className="next-button" onClick={handleNextQuestion}>
            {currentQuestionIndex + 1 >= data.test.question.length
              ? 'Finish Quiz'
              : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;