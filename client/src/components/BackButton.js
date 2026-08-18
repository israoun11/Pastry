import React from "react";
import "./BackButton.css";

const BackButton = ({ onClick, label = "Back to Categories" }) => {
  return (
    <button type="button" className="back-button" onClick={onClick}>
      <span className="back-button__arrow">←</span>
      {label}
    </button>
  );
};

export default BackButton;