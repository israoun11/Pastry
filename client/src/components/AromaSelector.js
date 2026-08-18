import React from "react";
import { AROMA_NOTES } from "../data/tastingRoomData";
import useScrollReveal from "./useScrollReveal";
import "./AromaSelector.css";

const AromaSelector = ({ selectedId, onSelect }) => {
  const [ref, visible] = useScrollReveal(0.2);
  const selected = AROMA_NOTES.find((note) => note.id === selectedId);

  return (
    <section
      className={`aroma-selector ${visible ? "aroma-selector--visible" : ""}`}
      ref={ref}
    >
      <div className="aroma-selector__header">
        <span className="aroma-selector__number">02 — Aroma</span>
        <p className="aroma-selector__lead">
          Every creation begins with a delicate balance of notes.
        </p>
      </div>

      <div className="aroma-selector__notes">
        {AROMA_NOTES.map((note) => (
          <button
            type="button"
            key={note.id}
            className={`aroma-selector__note ${
              selectedId === note.id ? "aroma-selector__note--active" : ""
            }`}
            onClick={() => onSelect(note.id)}
          >
            {note.label}
          </button>
        ))}
      </div>

      <div className="aroma-selector__panel" key={selected?.id || "empty"}>
        {selected ? (
          <>
            <div className="aroma-selector__glow" aria-hidden="true" />
            <div className="aroma-selector__row">
              <span>Primary Note</span>
              <p>{selected.primary}</p>
            </div>
            <div className="aroma-selector__row">
              <span>Secondary</span>
              <p>{selected.secondary}</p>
            </div>
            <div className="aroma-selector__row">
              <span>Character</span>
              <p>{selected.character.join(" · ")}</p>
            </div>
          </>
        ) : (
          <p className="aroma-selector__placeholder">Select a note to reveal its profile.</p>
        )}
      </div>
    </section>
  );
};

export default AromaSelector;