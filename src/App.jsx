// App.jsx
import React from "react";

import { Route,Routes} from "react-router-dom";

import QuizPage from "./Components/QuizPage.jsx";
import { TimerProvider } from "./Components/TimerContext.jsx"; // Import TimerProvider
import Navbar from "./Components/Nav.jsx";
import Leaderboard from "./delete_testfolder/Delete_TestPage.tsx";
function App() {
  return (
    <TimerProvider> {/* Wrap your app with TimerProvider */}
      

      <Navbar />
      
      <Routes>
        <Route index element={<QuizPage />} />
        <Route path="/play" element={<QuizPage />} />
        <Route path="/lb" element={<Leaderboard/>}/>
      </Routes>
    </TimerProvider>
  );
}

export default App;