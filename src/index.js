import React, { useState, useEffect } from 'react';
import { fetchQuizData } from '../../services/api';
import QuizStart from './QuizStart';
import QuizQuestion from './QuizQuestion';
import QuizResult from './QuizResult';

const Quiz = () => {
  const [quizState, setQuizState] = useState('loading');
  const [quizData, setQuizData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        setQuizState('loading');
        const data = await fetchQuizData();
        setQuizData(data);
        setQuizState('ready');
      } catch (err) {
        setError(err.message);
        setQuizState('error');
      }
    };

    loadQuizData();
  }, []);

  if (quizState === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading quiz questions...</p>
        </div>
      </div>
    );
  }

  if (quizState === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-4">
          <h2 className="text-red-800 font-semibold mb-2">Error Loading Quiz</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {quizState === 'ready' && <QuizStart quizData={quizData} onStart={() => setQuizState('playing')} />}
        {quizState === 'playing' && <QuizQuestion quizData={quizData} onComplete={() => setQuizState('completed')} />}
        {quizState === 'completed' && <QuizResult quizData={quizData} onRetry={() => setQuizState('ready')} />}
      </div>
    </div>
  );
};

export default Quiz;
