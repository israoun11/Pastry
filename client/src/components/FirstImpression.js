import React, { useState } from "react";
import useScrollReveal from "./useScrollReveal";
import "./FirstImpression.css";

const FirstImpression = () => {
  const [ref, visible] = useScrollReveal(0.25);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const updatePointer = (clientX, clientY, rect) => {
    const relX = ((clientX - rect.left) / rect.width - 0.5) * 2;
    const relY = ((clientY - rect.top) / rect.height - 0.5) * 2;
    setPointer({ x: relX, y: relY });
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    updatePointer(e.clientX, e.clientY, rect);
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    if (!touch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    updatePointer(touch.clientX, touch.clientY, rect);
  };

  return (
    <section
      id="first-impression"
      className={`first-impression ${visible ? "first-impression--visible" : ""}`}
      ref={ref}
    >
      <div className="first-impression__grid">
        <div
          className="first-impression__stage"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setPointer({ x: 0, y: 0 })}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => setPointer({ x: 0, y: 0 })}
        >
          <div
            className="first-impression_layer first-impression_layer--base"
            style={{ transform: `translate(${pointer.x * 8}px, ${pointer.y * 8}px)` }}
          />
          <div
            className="first-impression_layer first-impression_layer--mid"
            style={{ transform: `translate(${pointer.x * -16}px, ${pointer.y * -16}px) `}}
          />
          <div
            className="first-impression_layer first-impression_layer--accent"
            style={{ transform: `translate(${pointer.x * 24}px, ${pointer.y * 24}px)` }}
          />
          <div className="first-impression__ring" />
        </div>

        <div className="first-impression__text">
          <span className="first-impression__number">01 — The First Impression</span>
          <p className="first-impression__lead">
            Before the first taste, there is the first impression.
          </p>

          <div className="first-impression__details">
            <div className="first-impression__detail">
              <span>Appearance</span>
              <p>Glossy · Refined · Sculptural</p>
            </div>
            <div className="first-impression__detail">
              <span>Color</span>
              <p>Deep Cocoa · Ivory · Amber</p>
            </div>
            <div className="first-impression__detail">
              <span>Finish</span>
              <p>Precise · Delicate · Minimal</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstImpression;