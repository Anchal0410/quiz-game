import React from "react";
import { useQuiz } from "../../../hooks/useQuiz";
import Card from "../common/Card";
import Button from "../common/Button";

const QuizStart = () => {
  const { startQuiz, questions } = useQuiz();

  return (
    <Card className="text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome to QuizMaster!
      </h1>

      <div className="space-y-6">
        <div className="text-gray-600">
          <p className="text-lg mb-2">Ready to test your knowledge?</p>
          <p className="text-sm">
            Complete {questions.length} questions to earn points and see how you
            rank!
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <h2 className="font-semibold text-blue-800 mb-2">Quiz Rules:</h2>
          <ul className="space-y-2 text-blue-700 text-sm">
            <li>• {questions.length} challenging questions</li>
            <li>• 30 seconds per question</li>
            <li>• Quick answers = More points</li>
            <li>• No going back to previous questions</li>
          </ul>
        </div>

        <Button onClick={startQuiz} className="w-full">
          Start Quiz
        </Button>
      </div>
    </Card>
  );
};

export default QuizStart;
