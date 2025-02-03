import React, { createContext, useState, useEffect, useCallback } from "react";

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [totalTime, setTotalTime] = useState(0); // Total quiz time
  const [levelTimers, setLevelTimers] = useState({}); // Timers for each level
  const [currentLevel, setCurrentLevel] = useState(1); // Track the current level
  const [isTimerRunning, setIsTimerRunning] = useState(true); // Track if the timer is running

  // Total timer logic
  useEffect(() => {
    let totalTimer;
    if (isTimerRunning) {
      totalTimer = setInterval(() => {
        setTotalTime((prevTime) => prevTime + 1); // Increment total time every second
      }, 1000);
    }
    return () => clearInterval(totalTimer); // Cleanup timer on unmount
  }, [isTimerRunning]);

  // Level timer logic
  useEffect(() => {
    let levelTimer;
    if (isTimerRunning && currentLevel) {
      levelTimer = setInterval(() => {
        setLevelTimers((prevTimers) => ({
          ...prevTimers,
          [currentLevel]: (prevTimers[currentLevel] || 0) + 1, // Increment level timer every second
        }));
      }, 1000);
    }
    return () => {
      if (levelTimer) clearInterval(levelTimer); // Cleanup timer on level change or unmount
    };
  }, [isTimerRunning, currentLevel]);

  // Update the current level
  const updateCurrentLevel = useCallback((level) => {
    setCurrentLevel(level);
  }, []);

  // Stop the timer
  const stopTimer = useCallback(() => {
    setIsTimerRunning(false);
  }, []);

  // Reset the timer
  const resetTimer = useCallback(() => {
    setTotalTime(0);
    setLevelTimers({});
    setIsTimerRunning(true);
  }, []);

  return (
    <TimerContext.Provider value={{ totalTime, levelTimers, updateCurrentLevel, stopTimer, resetTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContext; // Export TimerContext