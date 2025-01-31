import React from "react";
import { QuizProvider } from "../context/QuizContext";
import QuizStart from "./components/Quiz/QuizStart";
import QuizQuestion from "./components/Quiz/QuizQuestion";
import QuizResult from "./components/Quiz/QuizResult";
import { useQuiz } from "../hooks/useQuiz";

function QuizApp() {
  const { quizStatus } = useQuiz();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {quizStatus === "ready" && <QuizStart />}
        {quizStatus === "active" && <QuizQuestion />}
        {quizStatus === "completed" && <QuizResult />}
      </div>
    </div>
  );
}

function App() {
  return (
    <QuizProvider>
      <QuizApp />
    </QuizProvider>
  );
}

export default App;
