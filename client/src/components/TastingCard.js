import React from "react";
import { useNavigate } from "react-router-dom";
import { AROMA_NOTES, TEXTURES, getFlavorMetrics, getFinishDescriptor } from "../data/tastingRoomData";
import useScrollReveal from "./useScrollReveal";
import "./TastingCard.css";

const TastingCard = ({ aromaId, textureId, spectrumPosition, onReset }) => {
  const [ref, visible] = useScrollReveal(0.25);
  const navigate = useNavigate();

  const aroma = AROMA_NOTES.find((a) => a.id === aromaId);
  const texture = TEXTURES.find((t) => t.id === textureId);
  const metrics = getFlavorMetrics(spectrumPosition);
  const finish = getFinishDescriptor(metrics);

  const aromaLabel = aroma
    ? `${aroma.label} + ${aroma.secondary.split(" ").slice(-1)[0]}`
    : "Awaiting Selection";

  const handleExplore = () => navigate("/click-and-collect");

  const handleReset = () => {
    onReset();
    document.getElementById("first-impression")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className={`tasting-card ${visible ? "tasting-card--visible" : ""}`}
      ref={ref}
    >
      <div className="tasting-card__panel">
        <span className="tasting-card__eyebrow">Your Tasting Profile</span>

        <div className="tasting-card__rows">
          <div className="tasting-card__row">
            <span>Aroma</span>
            <p>{aromaLabel}</p>
          </div>
          <div className="tasting-card__row">
            <span>Texture</span>
            <p>{texture ? texture.label : "—"}</p>
          </div>
          <div className="tasting-card__row">
            <span>Intensity</span>
            <p>{metrics.intensity}%</p>
          </div>
          <div className="tasting-card__row">
            <span>Sweetness</span>
            <p>{metrics.sweetness}%</p>
          </div>
          <div className="tasting-card__row">
            <span>Richness</span>
            <p>{metrics.richness}%</p>
          </div>
          <div className="tasting-card__row">
            <span>Finish</span>
            <p>{finish}</p>
          </div>
        </div>

        <div className="tasting-card__actions">
          <button type="button" className="tasting-card__explore" onClick={handleExplore}>
            Explore Our Creations
          </button>
          <button type="button" className="tasting-card__again" onClick={handleReset}>
            Start the Experience Again
          </button>
        </div>
      </div>
    </section>
  );
};

export default TastingCard;