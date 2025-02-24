import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import LevelPage from './Pages/LevelPage.tsx';
import QuizPage from './Pages/QuizPage.tsx'
import Navbar from "./Components/Nav.tsx";
import Leaderboard from "./Pages/Leaderboardpage.tsx";
import Homepage from './Pages/Homepage.tsx';
import TestComponent from './Pages/TestPage.tsx';

import Footer from './Components/Footer.tsx';
import "../src/style.css"

const App: React.FC = () => {
  return (
    <div className="main">
       <Navbar />
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/" element={<Homepage/>}/>
        <Route path="/play" element={<LevelPage />} />
        <Route path="/quiz/:level" element={<QuizPage />} />
        <Route path="/lb" element={<Leaderboard />} />
        <Route path="/test" element={<TestComponent/>}/>
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;