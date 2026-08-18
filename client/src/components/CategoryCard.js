import React from "react";
import "./CategoryCard.css";

const CategoryCard = ({ title, subtitle, image, onSelect }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect();
    }
  };

  return (
    <div
      className="category-card"
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      aria-label={`View ${title} selection`}
    >
      <div className="category-card__image-wrap">
        <img
          src={image}
          alt={title}
          className="category-card__image"
          loading="lazy"
        />
        <div className="category-card__overlay" />
      </div>

      <div className="category-card__content">
        <h2 className="category-card__title">{title}</h2>
        <p className="category-card__subtitle">{subtitle}</p>
        <span className="category-card__cta">
          Explore
          <span className="category-card__arrow">→</span>
        </span>
      </div>
    </div>
  );
};

export default CategoryCard;