import React from "react";
import "./CakePreview.css";

/**
 * An elegant layered visual composition standing in for a true 3D render.
 * Combines a style-driven photo, a finish-driven color tint, tier indicators
 * for the "Tiered" shape, and small decorative markers for chosen details.
 */
const CakePreview = ({ occasion, style, shape, finish, details = [] }) => {
  const backgroundImage = style?.image || occasion?.image;
  const tintColor = finish?.color || "#f4ede1";
  const isTiered = shape?.tiered;

  return (
    <div className="cake-preview">
      <div className="cake-preview__frame">
        {backgroundImage ? (
          <img src={backgroundImage} alt="Your creation preview" className="cake-preview__image" />
        ) : (
          <div className="cake-preview__placeholder">
            <span>Begin your selection</span>
          </div>
        )}

        {finish && (
          <div
            className="cake-preview__tint"
            style={`{ background: linear-gradient(180deg, transparent 45%, ${tintColor}66 100%) }`}
          />
        )}

        {isTiered && (
          <div className="cake-preview__tiers" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        )}

        {details.length > 0 && (
          <div className="cake-preview__detail-markers">
            {details.map((detail) => (
              <span key={detail.id} className="cake-preview__marker">
                {detail.label}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="cake-preview__caption">
        <span className="cake-preview__caption-eyebrow">
          {occasion ? occasion.label : "Your Bespoke Creation"}
        </span>
        <span className="cake-preview__caption-style">
          {style ? style.label : "Awaiting your vision"}
          {shape ? ` · ${shape.label}` : ""}
        </span>
      </div>
    </div>
  );
};

export default CakePreview;