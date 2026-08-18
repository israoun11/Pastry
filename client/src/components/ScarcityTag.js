import React from "react";
import "./ScarcityTag.css";

const ScarcityTag = ({ text = "Freshly baked in small batches today" }) => (
  <p className="scarcity-tag">
    <span className="scarcity-tag__dot" />
    {text}
  </p>
);

export default ScarcityTag;