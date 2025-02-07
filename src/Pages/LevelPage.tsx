import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/LevelPage.css';

export default function LevelPage() {
  const navigate = useNavigate();
  const levels = Array.from({ length: 50 }, (_, i) => i + 1); // Levels 1 to 50

  const handleLevelClick = (level: number) => {
    navigate(`/quiz/${level}`);
  };

  return (
    <div className="level-page">
      <h1>Select Level</h1>
      <div className="levels-grid">
        {levels.map((level) => (
          <button
            key={level}
            className="level-button"
            onClick={() => handleLevelClick(level)}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
}