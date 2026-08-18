import React from "react";
import "./StepProgress.css";

/**
 * steps: [{ id, label }]
 * currentStep: 1-indexed
 */
const StepProgress = ({ steps, currentStep }) => {
  return (
    <div className="step-progress" role="list" aria-label="Progress">
      {steps.map((step, index) => {
        const isComplete = step.id < currentStep;
        const isActive = step.id === currentStep;

        return (
          <div
            className={`step-progress__item ${
              isActive ? "step-progress__item--active" : ""
            } ${isComplete ? "step-progress__item--complete" : ""}`}
            role="listitem"
            key={step.id}
          >
            <span className="step-progress__number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="step-progress__label">{step.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default StepProgress;