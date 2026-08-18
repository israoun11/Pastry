import React, { useState } from "react";
import TastingHero from "./TastingHero";
import FirstImpression from "./FirstImpression";
import AromaSelector from "./AromaSelector";
import TextureSelector from "./TextureSelector";
import FlavorSpectrum from "./FlavorSpectrum";
import TheFinish from "./TheFinish";
import TastingCard from "./TastingCard";
import FinalStatement from "./FinalStatement";
import "./TastingRoom.css";

const DEFAULT_SPECTRUM_POSITION = 50;

const TastingRoom = () => {
  const [aromaId, setAromaId] = useState(null);
  const [textureId, setTextureId] = useState(null);
  const [spectrumPosition, setSpectrumPosition] = useState(DEFAULT_SPECTRUM_POSITION);

  const handleEnter = () => {
    document.getElementById("first-impression")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleReset = () => {
    setAromaId(null);
    setTextureId(null);
    setSpectrumPosition(DEFAULT_SPECTRUM_POSITION);
  };

  return (
    <main className="tasting-room">
      <TastingHero onEnter={handleEnter} />
      <FirstImpression />
      <AromaSelector selectedId={aromaId} onSelect={setAromaId} />
      <TextureSelector selectedId={textureId} onSelect={setTextureId} />
      <FlavorSpectrum position={spectrumPosition} onChange={setSpectrumPosition} />
      <TheFinish />
      <TastingCard
        aromaId={aromaId}
        textureId={textureId}
        spectrumPosition={spectrumPosition}
        onReset={handleReset}
      />
      <FinalStatement />
    </main>
  );
};

export default TastingRoom;