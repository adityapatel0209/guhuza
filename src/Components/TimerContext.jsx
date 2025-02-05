import React, { createContext, useState, useEffect, useCallback } from "react";

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [totalTime, setTotalTime] = useState(() => {
    const savedTotalTime = localStorage.getItem("totalTime");
    return savedTotalTime ? parseInt(savedTotalTime, 10) : 0;
  });
  const [levelTimers, setLevelTimers] = useState(() => {
    const savedLevelTimers = localStorage.getItem("levelTimers");
    return savedLevelTimers ? JSON.parse(savedLevelTimers) : {};
  });
  const [currentLevel, setCurrentLevel] = useState(() => {
    const savedCurrentLevel = localStorage.getItem("currentLevel");
    return savedCurrentLevel ? parseInt(savedCurrentLevel, 10) : 1;
  });
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  useEffect(() => {
    localStorage.setItem("totalTime", totalTime);
  }, [totalTime]);

  useEffect(() => {
    localStorage.setItem("levelTimers", JSON.stringify(levelTimers));
  }, [levelTimers]);

  useEffect(() => {
    localStorage.setItem("currentLevel", currentLevel);
  }, [currentLevel]);

  useEffect(() => {
    let totalTimer;
    if (isTimerRunning) {
      totalTimer = setInterval(() => {
        setTotalTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(totalTimer);
  }, [isTimerRunning]);

  useEffect(() => {
    let levelTimer;
    if (isTimerRunning && currentLevel) {
      levelTimer = setInterval(() => {
        setLevelTimers((prevTimers) => ({
          ...prevTimers,
          [currentLevel]: (prevTimers[currentLevel] || 0) + 1,
        }));
      }, 1000);
    }
    return () => {
      if (levelTimer) clearInterval(levelTimer);
    };
  }, [isTimerRunning, currentLevel]);

  const updateCurrentLevel = useCallback((level) => {
    setCurrentLevel(level);
  }, []);

  const stopTimer = useCallback(() => {
    setIsTimerRunning(false);
  }, []);

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

export default TimerContext;