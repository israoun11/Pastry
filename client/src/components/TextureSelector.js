import React from "react";
import { TEXTURES } from "../data/tastingRoomData";
import useScrollReveal from "./useScrollReveal";
import "./TextureSelector.css";

const TextureSelector = ({ selectedId, onSelect }) => {
  const [ref, visible] = useScrollReveal(0.2);
  const selected = TEXTURES.find((t) => t.id === selectedId);

  return (
    <section
      className={`texture-selector ${visible ? "texture-selector--visible" : ""}`}
      ref={ref}
    >
      <div className="texture-selector__grid">
        <div className="texture-selector__visual-wrap">
          <div
            className={`texture-selector_visual texture-selector_visual--${
              selectedId || "silky"
            }`}
          />
        </div>

        <div className="texture-selector__content">
          <span className="texture-selector__number">03 — Texture</span>

          <div className="texture-selector__options">
            {TEXTURES.map((texture) => (
              <button
                type="button"
                key={texture.id}
                className={`texture-selector__option ${
                  selectedId === texture.id
                    ? "texture-selector__option--active"
                    : ""
                }`}
                onClick={() => onSelect(texture.id)}
              >
                {texture.label}
              </button>
            ))}
          </div>

          <p className="texture-selector__description" key={selected?.id || "empty"}>
            {selected ? selected.description : "Select a texture to explore its sensation."}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TextureSelector;