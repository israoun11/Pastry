import React from "react";
import "./SelectionCard.css";

/**
 * Reusable visual selection card used across BespokeStudio and DessertConcierge.
 * Supports either a photo (image prop) or a flat color swatch (color prop).
 */
const SelectionCard = ({
  title,
  description,
  image,
  color,
  selected,
  onSelect,
  multi = false,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect();
    }
  };

  return (
    <div
      className={`selection-card ${selected ? "selection-card--selected" : ""}`}
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      aria-pressed={selected}
    >
      <div className="selection-card__visual">
        {image ? (
          <img src={image} alt="" className="selection-card__image" loading="lazy" />
        ) : (
          <div
            className="selection-card__swatch"
            style={{ backgroundColor: color || "#f7f5f0" }}
          />
        )}

        <div
          className={`selection-card__mark ${
            multi ? "selection-card__mark--square" : ""
          }`}
        >
          {selected && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M4 12.5 9.5 18 20 6" />
            </svg>
          )}
        </div>
      </div>

      <div className="selection-card__body">
        <h4 className="selection-card__title">{title}</h4>
        {description && (
          <p className="selection-card__description">{description}</p>
        )}
      </div>
    </div>
  );
};

export default SelectionCard;