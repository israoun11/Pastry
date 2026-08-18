import React from "react";
import useScrollReveal from "./useScrollReveal";
import "./TheFinish.css";

const WORDS = ["Lingering", "Balanced", "Elegant", "Memorable"];

const TheFinish = () => {
  const [ref, visible] = useScrollReveal(0.35);

  return (
    <section className="the-finish" ref={ref}>
      <span className="the-finish__number">05 — The Finish</span>
      <p className="the-finish__lead">The final note is the one that remains.</p>

      <div className="the-finish__words">
        {WORDS.map((word, index) => (
          <span
            key={word}
            className={`the-finish__word ${visible ? "the-finish__word--visible" : ""}`}
            style={{ transitionDelay: `${index * 0.25}s` }}
          >
            {word}
          </span>
        ))}
      </div>
    </section>
  );
};

export default TheFinish;