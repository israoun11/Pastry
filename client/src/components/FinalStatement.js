import React from "react";
import { useNavigate } from "react-router-dom";
import useScrollReveal from "./useScrollReveal";
import "./FinalStatement.css";

const FinalStatement = () => {
  const [ref, visible] = useScrollReveal(0.4);
  const navigate = useNavigate();

  return (
    <section
      className={`final-statement ${visible ? "final-statement--visible" : ""}`}
      ref={ref}
    >
      <span className="final-statement__eyebrow">The Maison</span>
      <h2 className="final-statement__statement">
        Great pastry is not simply tasted.
        <br />
        It is remembered.
      </h2>
      <button
        type="button"
        className="final-statement__cta"
        onClick={() => navigate("/click-and-collect")}
      >
        Discover the Collection <span>→</span>
      </button>
    </section>
  );
};

export default FinalStatement;