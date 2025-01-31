import React, { useState, useEffect } from "react";

const QuizTimer = ({ duration = 30, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  return (
    <div className="flex items-center">
      <div
        className={`font-mono text-lg ${
          timeLeft <= 10 ? "text-red-500" : "text-blue-500"
        }`}
      >
        {timeLeft}s
      </div>
      <div className="ml-2 w-20 bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-200 ${
            timeLeft <= 10 ? "bg-red-500" : "bg-blue-500"
          }`}
          style={{ width: `${(timeLeft / duration) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default QuizTimer;
