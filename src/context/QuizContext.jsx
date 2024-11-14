import { createContext, useContext, useReducer } from "react";
import { questions } from "../data/questions"; // مسیر صحیح را مطمئن شوید

const QuizContext = createContext();

const quizReducer = (state, action) => {
  switch (action.type) {
    case "TICK":
      return { ...state, timer: state.timer - 1 };
    case "NEXT_QUESTION":
      const nextQuestionIndex = state.currentQuestionIndex + 1;
      const isFinished = nextQuestionIndex >= questions.length;
      return {
        ...state,
        currentQuestionIndex: nextQuestionIndex,
        selectedOption: null,
        isQuizFinished: isFinished,
        timer: isFinished ? state.timer : 30,
      };
    case "FINISH_QUIZ":
      return { ...state, isQuizFinished: true };
    case "SELECT_OPTION":
      return { ...state, selectedOption: action.payload };
    case "INCREMENT_SCORE":
      return { ...state, score: state.score + action.payload };
    case "SAVE_ANSWER":
      return { ...state, answers: [...state.answers, action.payload] };
    case "RESTART_QUIZ":
      return {
        currentQuestionIndex: 0,
        selectedOption: null,
        score: 0,
        isQuizFinished: false,
        timer: 30,
        answers: [],
      };
    default:
      return state;
  }
};

export const QuizProvider = ({ children }) => {
  const initialState = {
    currentQuestionIndex: 0,
    selectedOption: null,
    score: 0,
    isQuizFinished: false,
    timer: 30,
    answers: [],
  };

  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
