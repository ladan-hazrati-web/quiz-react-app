import React from "react";

const ProgressBar = ({ currentQuestionIndex, totalQuestions }) => {
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="progress-bar">
      <div
        className="progress-bar-fill"
        style={{ width: `${progress}%` }}
      >
        <span className="progress-bar-text">{`${currentQuestionIndex + 1}/${totalQuestions}`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;