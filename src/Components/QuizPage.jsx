import React, { useState, useContext, useEffect } from "react";
import { quizData } from "../data"; // Import your data
import TimerContext from "./TimerContext.jsx";
import QuestionPage from "./QuestionPage";
import Sidebar from "./Sidebar";
import Leaderboard from "./Leaderboard"; // Import Leaderboard component

export default function QuizPage() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false); // New state for leaderboard

  const { updateCurrentLevel, totalTime, levelTimers, stopTimer, resetTimer } = useContext(TimerContext);

  const currentLevelQuestions = quizData.questions.filter((q) => q.level === currentLevel);

  useEffect(() => {
    updateCurrentLevel(currentLevel);
  }, [currentLevel, updateCurrentLevel]);

  const toggleSidebar = () => {
    setIsSidebarHidden((prev) => !prev);
  };

  const handleOptionClick = (index) => {
    if (!isSubmitted) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const currentQuestion = currentLevelQuestions[currentQuestionIndex];
    currentQuestion.attempted = true;
    currentQuestion.correct = selectedAnswer === currentQuestion.correctAnswerIndex;
    if (currentQuestionIndex === currentLevelQuestions.length - 1 && currentLevel === quizData.levels.length) {
      setShowLeaderboard(true); // Show leaderboard if it's the last question of the last level
      stopTimer(); // Stop the timer when the quiz ends
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsSubmitted(false);

    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex + 1 < currentLevelQuestions.length) {
        return prevIndex + 1;
      } else {
        setCurrentLevel((prevLevel) => {
          const nextLevel = prevLevel + 1;
          updateCurrentLevel(nextLevel);
          return nextLevel;
        });
        return 0;
      }
    });
  };

  const handleRetry = () => {
    setShowLeaderboard(false);
    setCurrentLevel(1);
    setCurrentQuestionIndex(0);
    setIsSubmitted(false);
    setSelectedAnswer(null);
    resetTimer(); // Reset the timer when retrying the quiz
  };

  const handleSubmitQuiz = () => {
    setShowLeaderboard(true);
    stopTimer(); // Stop the timer when the quiz ends
  };

  return (
    <div className="quiz-container">
      {showLeaderboard ? (
        <Leaderboard
          correctAnswers={quizData.questions.filter((q) => q.attempted && q.correct).length}
          totalQuestions={quizData.questions.length}
          totalTime={totalTime}
          levelTimes={levelTimers}
          onRetry={handleRetry}
          onShare={() => alert("Share functionality coming soon!")}
        />
      ) : (
        <>
          <Sidebar
            questions={quizData.questions}
            currentQuestionIndex={currentQuestionIndex}
            onQuestionClick={setCurrentQuestionIndex}
            onLevelClick={setCurrentLevel}
            toggleSidebar={toggleSidebar}
            currentLevel={currentLevel}
            attemptedQuestions={quizData.questions
              .filter((q) => q.attempted)
              .map((q) => q.id)}
            isSidebarHidden={isSidebarHidden}
            onSubmitQuiz={handleSubmitQuiz} // Pass handleSubmitQuiz to Sidebar
          />

          {currentLevelQuestions.length > 0 ? (
            <QuestionPage
              question={currentLevelQuestions[currentQuestionIndex].question}
              options={currentLevelQuestions[currentQuestionIndex].options}
              selectedAnswer={selectedAnswer}
              onOptionClick={handleOptionClick}
              onSubmit={handleSubmit}
              onNext={handleNext}
              isNextDisabled={!isSubmitted}
              correctAnswerIndex={currentLevelQuestions[currentQuestionIndex].correctAnswerIndex}
              isSubmitted={isSubmitted}
              currentLevel={currentLevel}
            />
          ) : (
            <div>No questions available for this level.</div>
          )}
        </>
      )}
    </div>
  );
}