import React from "react";
import { useQuiz } from "../../../hooks/useQuiz";
import Card from "../common/Card";
import Button from "../common/Button";
import { Trophy, Clock, CheckCircle, XCircle } from "lucide-react";

const QuizResult = () => {
  const { score, answers, questions, resetQuiz, startNewQuiz } = useQuiz();

  const totalQuestions = questions.length;
  const correctAnswers = answers.filter((answer) => answer.isCorrect).length;
  const wrongAnswers = totalQuestions - correctAnswers;
  const accuracy = ((correctAnswers / totalQuestions) * 100).toFixed(1);
  const averageTime =
    answers.length > 0
      ? (
          answers.reduce((acc, curr) => acc + (curr.timeTaken || 0), 0) /
          answers.length
        ).toFixed(1)
      : "0";
  const getPerformanceMessage = () => {
    if (accuracy >= 90) return "Outstanding! You're a quiz master! 🏆";
    if (accuracy >= 70) return "Great job! Keep it up! 👏";
    if (accuracy >= 50) return "Good effort! Room for improvement! 💪";
    return "Keep practicing! You'll get better! 📚";
  };

  return (
    <div className="space-y-6">
      {/* Score Overview Card */}
      <Card className="text-center">
        <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Quiz Completed!
        </h1>
        <p className="text-gray-600 mb-6">{getPerformanceMessage()}</p>

        <div className="text-5xl font-bold text-blue-500 mb-2">
          {score}
          <span className="text-lg text-gray-500 ml-1">pts</span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-green-600 font-semibold">
                {correctAnswers}
              </span>
            </div>
            <p className="text-sm text-green-600">Correct</p>
          </div>

          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex items-center justify-center space-x-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-600 font-semibold">{wrongAnswers}</span>
            </div>
            <p className="text-sm text-red-600">Wrong</p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-blue-600 font-semibold">{accuracy}%</div>
            <p className="text-sm text-blue-600">Accuracy</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center justify-center space-x-2">
              <Clock className="w-5 h-5 text-purple-500" />
              <span className="text-purple-600 font-semibold">
                {averageTime}s
              </span>
            </div>
            <p className="text-sm text-purple-600">Avg Time</p>
          </div>
        </div>
      </Card>

      {/* Detailed Review */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Questions Review
        </h2>
        <div className="space-y-4">
          {questions.map((question, index) => {
            const userAnswer = answers[index];
            // We already get the description here
            const correctAnswer = question?.answers?.find?.(
              (ans) => ans.is_correct
            )?.description;

            return (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  userAnswer?.isCorrect
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }`}
              >
                <p className="font-medium text-gray-800 mb-2">
                  Question {index + 1}
                </p>
                <p className="text-gray-600 mb-4">{question.description}</p>

                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-gray-500">Your Answer: </span>
                    <span
                      className={
                        userAnswer?.isCorrect
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {userAnswer?.userAnswer || "No answer provided"}
                    </span>
                  </div>

                  {!userAnswer?.isCorrect && correctAnswer && (
                    <div className="text-sm">
                      <span className="text-gray-500">Correct Answer: </span>
                      <span className="text-green-600">
                        {correctAnswer}
                      </span>{" "}
                    </div>
                  )}

                  <div className="text-sm">
                    <span className="text-gray-500">Time Taken: </span>
                    <span className="text-gray-600">
                      {userAnswer?.timeTaken || 0}s
                    </span>
                  </div>

                  <div className="text-sm">
                    <span className="text-blue-500 font-medium">
                      {userAnswer?.isCorrect ? "+10" : "+0"} pts
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Button variant="primary" className="flex-1" onClick={resetQuiz}>
          Try Again
        </Button>
        <Button variant="secondary" className="flex-1" onClick={startNewQuiz}>
          New Quiz
        </Button>
      </div>
    </div>
  );
};

export default QuizResult;
