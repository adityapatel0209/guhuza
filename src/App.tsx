import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LevelPage from './Pages/LevelPage.tsx';
import QuizPage from './Pages/QuizPage.tsx';
import Navbar from "./Components/Nav.tsx";
import Leaderboard from "./Pages/Leaderboardpage.tsx";
import Homepage from './Pages/Homepage.tsx';
import LoginPage from './Pages/LoginPage.tsx';
import SignupPage from './Pages/SignupPage.tsx';
import "../src/style.css";

const App: React.FC = () => {
  return (
    <div className="main">
      <Navbar />
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/play" element={<LevelPage />} />
        <Route path="/quiz/:level" element={<QuizPage />} />
        <Route path="/lb" element={<Leaderboard />} />
      </Routes>
    </div>
  );
};

export default App;