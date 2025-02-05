import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LevelPage from './Components/LevelPage';
import QuizPage from './Components/QuizPage';
import './Components/index.css';

const App: React.FC = () => {
  return (
    <div className="main">
    <Router>
      <Routes>
        <Route path="/" element={<LevelPage />} />
        <Route path="/quiz/:level" element={<QuizPage />} />
      </Routes>
    </Router>
    </div>
  );
};

// Ensure this is the default export
export default App;