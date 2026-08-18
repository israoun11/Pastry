import React from "react";
import "./Badge.css";

// Extend product.badges with any of these keys, or pass a custom label
const BADGE_CONFIG = {
  limited: { label: "Limited Drop" },
  "photo-worthy": { label: "Photo-Worthy" },
  daily: { label: "Only 20 Daily" },
};

const Badge = ({ type, label }) => {
  const config = BADGE_CONFIG[type];
  if (!config && !label) return null;

  return (
    <span className={`badge badge--${type || "default"}`}>
      {label || config.label}
    </span>
  );
};

export default Badge;