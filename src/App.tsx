import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import LevelPage from './Components/LevelPage';
import QuizPage from './Components/QuizPage';
import './Components/index.css';
import Navbar from "./Components/Nav.jsx";
import Leaderboard from "./Pages/Leaderboardpage.tsx";

const App: React.FC = () => {
  return (
    <div className="main">
       <Navbar />
      <Routes>
        <Route index element={<LevelPage />} />
        <Route path="/play" element={<LevelPage />} />
        <Route path="/quiz/:level" element={<QuizPage />} />
        <Route path="/lb" element={<Leaderboard/>}/>
      </Routes>
    </div>
  );
};

// Ensure this is the default export
export default App;