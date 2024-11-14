// src/components/Quiz.jsx

import React, { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";
import Result from "./Result";
import Loader from "./Loader";
import Timer from "./Timer";
import ProgressBar from "./ProgressBar";
import { questions } from "../data/questions";

const Quiz = () => {
  const { state, dispatch } = useQuiz();

  // کنترل تایمر
  useEffect(() => {
    if (state.timer > 0 && !state.isQuizFinished) {
      const timerId = setInterval(() => {
        dispatch({ type: "TICK" });
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [state.timer, state.isQuizFinished]);

  // تغییر سوال به سوال بعدی پس از انتخاب گزینه
  useEffect(() => {
    if (state.selectedOption !== null) {
      const timerId = setTimeout(() => {
        dispatch({ type: "NEXT_QUESTION" });
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [state.selectedOption]);

  // کنترل پایان مسابقه
  useEffect(() => {
    if (state.currentQuestionIndex >= questions.length || state.timer <= 0) {
      dispatch({ type: "FINISH_QUIZ" });
    }
  }, [state.currentQuestionIndex, state.timer]);

  const currentQuestion = questions[state.currentQuestionIndex];

  if (state.isQuizFinished) {
    return (
      <Result
        score={state.score}
        answers={state.answers}
        onRestart={() => dispatch({ type: "RESTART_QUIZ" })}
      />
    );
  }

  if (!currentQuestion) {
    return <Loader />;
  }

  // تابع برای مدیریت انتخاب گزینه
  const handleOptionClick = (index) => {
    if (state.selectedOption === null) { // جلوگیری از کلیک دوباره پس از انتخاب
      dispatch({ type: "SELECT_OPTION", payload: index });

      // بررسی اینکه آیا پاسخ صحیح است یا خیر
      const isCorrect = index === currentQuestion.correctOption;
      if (isCorrect) {
        dispatch({ type: "INCREMENT_SCORE", payload: currentQuestion.points });
      }

      // ثبت پاسخ به آرایه پاسخ‌ها
      dispatch({
        type: "SAVE_ANSWER",
        payload: {
          question: currentQuestion.question,
          selectedOption: index,
          correctOption: currentQuestion.correctOption,
          options: currentQuestion.options,
        },
      });
      
    }
  };

  return (
    <div className="quiz-container">
      <Timer time={state.timer} />
      <ProgressBar
        currentQuestionIndex={state.currentQuestionIndex}
        totalQuestions={questions.length}
      />
      <h2>{currentQuestion.question}</h2>
      <div className="options">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index)}
            className={`option-button ${
              state.selectedOption === index ? "selected" : ""
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
