// App.jsx
import React from "react";
import QuizPage from "./Components/QuizPage.jsx";
import { TimerProvider } from "./Components/TimerContext.jsx"; // Import TimerProvider

function App() {
  return (
    <TimerProvider> {/* Wrap your app with TimerProvider */}
      <QuizPage />
    </TimerProvider>
  );
}

export default App;