import React, { createContext, useContext, useReducer } from "react";

const QuizContext = createContext();

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  answers: [],
  quizStatus: "loading",
  loading: true,
  error: null,
};

function quizReducer(state, action) {
  console.log("Current state:", state);
  console.log("Action:", action);

  switch (action.type) {
    case "SET_QUESTIONS":
      return {
        ...state,
        questions: action.payload,
        loading: false,
        quizStatus: "ready",
      };

    case "START_QUIZ":
      return {
        ...state,
        quizStatus: "active",
        currentQuestionIndex: 0,
        score: 0,
        answers: [],
      };
    case "START_NEW_QUIZ":
      return {
        ...initialState,
        loading: true,
        quizStatus: "loading",
      };
    case "SUBMIT_ANSWER": {
      const { answer } = action.payload;
      const currentQuestion = state.questions[state.currentQuestionIndex];

      console.log("Submitting answer:", answer);
      console.log("Current question:", currentQuestion);

      if (!answer || !currentQuestion) {
        console.error("Invalid answer or question");
        return state;
      }

      const isCorrect = answer.is_correct || false;
      const points = isCorrect ? 10 : 0;

      const isLastQuestion =
        state.currentQuestionIndex === state.questions.length - 1;

      return {
        ...state,
        score: state.score + points,
        answers: [
          ...state.answers,
          {
            questionId: currentQuestion.id,
            userAnswer: answer.description,
            isCorrect,
            points,
          },
        ],
        currentQuestionIndex: isLastQuestion
          ? state.currentQuestionIndex
          : state.currentQuestionIndex + 1,
        quizStatus: isLastQuestion ? "completed" : "active",
      };
    }

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case "RESET_QUIZ":
      return {
        ...initialState,
        questions: state.questions,
        loading: false,
        quizStatus: "ready",
      };

    default:
      console.warn("Unknown action    type:", action.type);
      return state;
  }
}

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuizContext() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuizContext must be used within a QuizProvider");
  }
  return context;
}
