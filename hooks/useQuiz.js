import { useEffect, useCallback } from 'react';
import { useQuizContext } from '../context/QuizContext';
import { fetchQuizData } from '../service/api';

export function useQuiz() {
  const { state, dispatch } = useQuizContext();

  const loadQuizData = useCallback(async () => {
    try {
      const data = await fetchQuizData();
      dispatch({ type: 'SET_QUESTIONS', payload: data.questions });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, [dispatch]);

  useEffect(() => {
    if (state.questions.length === 0 || state.quizStatus === 'loading') {
      loadQuizData();
    }
  }, [loadQuizData, state.questions.length, state.quizStatus]);

  const startNewQuiz = useCallback(async () => {
    dispatch({ type: 'START_NEW_QUIZ' });
    await loadQuizData();
  }, [dispatch, loadQuizData]);

  return {
    ...state,
    startNewQuiz,
    startQuiz: () => dispatch({ type: 'START_QUIZ' }),
    submitAnswer: (answer) => dispatch({ 
      type: 'SUBMIT_ANSWER', 
      payload: { answer } 
    }),
    resetQuiz: () => dispatch({ type: 'RESET_QUIZ' })
  };
}