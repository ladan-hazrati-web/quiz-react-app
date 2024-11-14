// src/App.jsx

import React from "react";
import { QuizProvider } from "./context/QuizContext";
import Quize from "./components/Quiz";
import "./index.css";

const App = () => {
  return (
   <QuizProvider>
    <div className="App">
    <h1>React Quiz Application</h1>
<Quize/>
    </div>
   </QuizProvider>
  );
};

export default App;
