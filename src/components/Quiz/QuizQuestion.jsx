import React, { useEffect } from "react";
import { useQuiz } from "../../../hooks/useQuiz";
import Card from "../common/Card";
import Button from "../common/Button";
import ProgressBar from "../common/ProgressBar";

const QuizQuestion = () => {
  const { questions, currentQuestionIndex, submitAnswer, quizStatus } =
    useQuiz();

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    // Debug logs to check data structure
    console.log("All questions:", questions);
    console.log("Current question object:", currentQuestion);
    console.log("Current question answers:", currentQuestion?.answers);
    console.log("Quiz status:", quizStatus);
    console.log("Question index:", currentQuestionIndex);
  }, [currentQuestion, questions, quizStatus, currentQuestionIndex]);

  if (!currentQuestion) {
    console.log("No current question available");
    return (
      <Card>
        <div className="text-center p-4">
          <p className="text-gray-600">Loading question...</p>
        </div>
      </Card>
    );
  }

  const handleAnswerSubmit = (answer) => {
    console.log("Submitting answer:", answer);
    submitAnswer(answer);
  };

  console.log("Answers property type:", typeof currentQuestion.answers);
  console.log("Answers content:", currentQuestion.answers);

  const answerOptions =
    currentQuestion.answers ||
    currentQuestion.options ||
    currentQuestion.choices ||
    [];

  console.log("Answer options:", answerOptions);

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <span className="text-gray-600">
          Question {currentQuestionIndex + 1}/{questions.length}
        </span>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {currentQuestion.description || currentQuestion.question}
        </h2>

        <div className="space-y-3">
          {Array.isArray(answerOptions) ? (
            answerOptions.map((answer, index) => (
              <Button
                key={answer.id || index}
                onClick={() => handleAnswerSubmit(answer)}
                className="w-full text-left p-4 hover:bg-blue-50 transition-colors"
                variant="secondary"
              >
                {answer.description || answer.text || answer}
              </Button>
            ))
          ) : (
            <p className="text-red-500">No answer options available</p>
          )}
        </div>
      </div>

      <ProgressBar
        progress={currentQuestionIndex + 1}
        total={questions.length}
      />
    </Card>
  );
};

export default QuizQuestion;
