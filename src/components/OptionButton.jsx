import React from "react";

const OptionButton = ({ index, option, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: isSelected ? "#3498db" : "#fff",
        color: isSelected ? "#fff" : "#3498db",
      }}
    >
      {option}
    </button>
  );
};

export default OptionButton;