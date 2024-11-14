import React from 'react';

const Question=({question,options,selectedOption,onSelectOption})=>{
    return (
        <div className='question-container'>
          <h2>{question}</h2>
          <div className='options'>
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => onSelectOption(index)}
                className={`option-button ${selectedOption === index ? 'selected' : ''}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      );
    }
export default Question;
