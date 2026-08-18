import React from "react";
import "./TastingHero.css";

const TastingHero = ({ onEnter }) => {
  return (
    <section className="tasting-hero">
      <div className="tasting-hero__content">
        <span className="tasting-hero__eyebrow">The Maison</span>
        <h1 className="tasting-hero__title">The Tasting Room</h1>
        <p className="tasting-hero__subtitle">
          An exploration of flavor, texture and sensation.
        </p>
      </div>

      <button
        type="button"
        className="tasting-hero__enter"
        onClick={onEnter}
        aria-label="Enter the experience"
      >
        <span>Enter the Experience</span>
        <span className="tasting-hero__enter-line" />
      </button>
    </section>
  );
};

export default TastingHero;