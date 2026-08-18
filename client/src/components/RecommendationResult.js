import React from "react";
import "./RecommendationResult.css";

const RecommendationResult = ({ recommendation, onStartAgain, onRequest, onExplore }) => {
  if (!recommendation) return null;

  const {
    name,
    reason,
    quantitySuggestion,
    estimatedPrice,
    complementary = [],
    upgrade,
  } = recommendation;

  return (
    <div className="recommendation-result">
      <span className="recommendation-result__eyebrow">Your Curated Selection</span>
      <p className="recommendation-result__lead">
        Based on your preferences, we recommend
      </p>
      <h2 className="recommendation-result__name">{name}</h2>
      <p className="recommendation-result__reason">{reason}</p>

      <div className="recommendation-result__meta">
        <div>
          <span>Suggested Quantity</span>
          <p>{quantitySuggestion}</p>
        </div>
        <div>
          <span>Estimated Price</span>
          <p>€{estimatedPrice.toFixed(2)}</p>
        </div>
      </div>

      {complementary.length > 0 && (
        <div className="recommendation-result__section">
          <h3>Complementary Additions</h3>
          <ul>
            {complementary.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {upgrade && (
        <div className="recommendation-result__section">
          <h3>Optional Upgrade</h3>
          <p>{upgrade}</p>
        </div>
      )}

      <div className="recommendation-result__actions">
        <button type="button" className="recommendation-result__explore" onClick={onExplore}>
          Explore Creation
        </button>
        <button type="button" className="recommendation-result__again" onClick={onStartAgain}>
          Start Again
        </button>
      </div>

      <button type="button" className="recommendation-result__cta" onClick={onRequest}>
        Request Your Curated Selection
      </button>
    </div>
  );
};

export default RecommendationResult;