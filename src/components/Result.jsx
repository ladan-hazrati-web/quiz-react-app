
import React from "react";
const Result = ({ score, answers, onRestart }) => {
    return (
      <div className="result-container">
        <h2>Quiz Finished!</h2>
        <p>Your score: {score}</p>
        <h3>Answers:</h3>
        <ul>
          {answers.map((answer, index) => (
            <li
              key={index}
              className={`answer ${
                answer.selectedOption === answer.correctOption
                  ? "correct"
                  : "incorrect"
              }`}
            >
              <p>
                <strong>Q:</strong> {answer.question}
              </p>
              <p>
                <strong>Your Answer:</strong> {answer.options[answer.selectedOption]}
              </p>
              <p>
                <strong>Correct Answer:</strong> {answer.options[answer.correctOption]}
              </p>
            </li>
          ))}
        </ul>
        <button className="restart-button" onClick={onRestart}>
          Restart Quiz
        </button>
      </div>
    );
  };
  
  export default Result;
  
