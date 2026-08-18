import React from "react";
import AnimatedNumber from "./AnimatedNumber";
import { getFlavorMetrics, getSpectrumLabel } from "../data/tastingRoomData";
import useScrollReveal from "./useScrollReveal";
import "./FlavorSpectrum.css";

const METRIC_LABELS = [
  { key: "sweetness", label: "Sweetness" },
  { key: "intensity", label: "Intensity" },
  { key: "acidity", label: "Acidity" },
  { key: "bitterness", label: "Bitterness" },
  { key: "richness", label: "Richness" },
];

const FlavorSpectrum = ({ position, onChange }) => {
  const [ref, visible] = useScrollReveal(0.2);
  const metrics = getFlavorMetrics(position);
  const label = getSpectrumLabel(position);

  return (
    <section
      className={`flavor-spectrum ${visible ? "flavor-spectrum--visible" : ""}`}
      ref={ref}
    >
      <div className="flavor-spectrum__header">
        <span className="flavor-spectrum__number">04 — Flavor</span>
        <p className="flavor-spectrum__lead">
          Move the indicator to shape the profile of your tasting.
        </p>
      </div>

      <div className="flavor-spectrum__slider-wrap">
        <div className="flavor-spectrum__track-labels">
          <span>Light</span>
          <span>Balanced</span>
          <span>Intense</span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flavor-spectrum__slider"
          aria-label="Flavor intensity spectrum"
        />

        <span className="flavor-spectrum__current-label">{label}</span>
      </div>

      <div className="flavor-spectrum__metrics">
        {METRIC_LABELS.map((metric) => (
          <div className="flavor-spectrum__metric" key={metric.key}>
            <div className="flavor-spectrum__metric-header">
              <span>{metric.label}</span>
              <span className="flavor-spectrum__metric-value">
                <AnimatedNumber value={metrics[metric.key]} />
              </span>
            </div>
            <div className="flavor-spectrum__bar-track">
              <div
                className="flavor-spectrum__bar-fill"
                style={{ width: `${metrics[metric.key]}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FlavorSpectrum;