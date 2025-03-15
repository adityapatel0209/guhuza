// In App.tsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LevelPage from './Pages/LevelPage.tsx';
import QuizPage from './Pages/QuizPage.tsx';
import Navbar from "./Components/Nav.tsx";
import LeaderboardPage from "./Pages/Leaderboardpage.tsx"; // Updated import
import Homepage from './Pages/Homepage.tsx';
import LoginPage from './Pages/LoginPage.tsx';
import SignupPage from './Pages/SignupPage.tsx';
import Authenticate from './Components/Authenticate.tsx';
import BackgroundBoxesDemo from './Pages/TestPage.tsx';

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
        <Route path="/play" element={<Authenticate><LevelPage /></Authenticate>} />
        <Route path="/quiz/:level" element={<Authenticate><QuizPage /></Authenticate>} />
        <Route path="/lb" element={<LeaderboardPage />} /> {/* Updated component name */}
        <Route path="/test" element={<BackgroundBoxesDemo/>} />
      </Routes>
    </div>
  );
};

export default App;