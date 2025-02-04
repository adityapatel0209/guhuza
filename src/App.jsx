// App.jsx
import React from "react";
import QuizPage from "./Components/QuizPage.jsx";
import { TimerProvider } from "./Components/TimerContext.jsx"; // Import TimerProvider
import Leaderboard from "./delete_testfolder/Delete_TestPage.tsx";

function App() {
  return (
    <TimerProvider> {/* Wrap your app with TimerProvider */}
      
      <Leaderboard/>
      {/* <QuizPage /> */}
    </TimerProvider>
  );
}

export default App;