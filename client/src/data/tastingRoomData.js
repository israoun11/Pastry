export const AROMA_NOTES = [
  {
    id: "vanilla",
    label: "Vanilla",
    primary: "Madagascar Vanilla",
    secondary: "Fresh Cream",
    character: ["Warm", "Round", "Comforting"],
  },
  {
    id: "pistachio",
    label: "Pistachio",
    primary: "Roasted Pistachio",
    secondary: "Almond Milk",
    character: ["Delicate", "Nutty", "Fresh"],
  },
  {
    id: "cocoa",
    label: "Cocoa",
    primary: "Dark Chocolate",
    secondary: "Roasted Hazelnut",
    character: ["Deep", "Warm", "Intense"],
  },
  {
    id: "coffee",
    label: "Coffee",
    primary: "Single-Origin Espresso",
    secondary: "Dark Caramel",
    character: ["Bold", "Bitter-Sweet", "Awakening"],
  },
  {
    id: "raspberry",
    label: "Raspberry",
    primary: "Wild Raspberry",
    secondary: "Rose Petal",
    character: ["Bright", "Tart", "Vivid"],
  },
  {
    id: "caramel",
    label: "Caramel",
    primary: "Salted Caramel",
    secondary: "Brown Butter",
    character: ["Buttery", "Golden", "Lingering"],
  },
];

export const TEXTURES = [
  { id: "silky", label: "Silky", description: "Smooth and delicate, melting slowly on the palate." },
  { id: "creamy", label: "Creamy", description: "Full and enveloping, softly coating every note." },
  { id: "crisp", label: "Crisp", description: "A delicate contrast designed to break the softness." },
  { id: "mousse", label: "Mousse", description: "Airy and light, dissolving with the gentlest touch." },
  { id: "melting", label: "Melting", description: "Structured at first, then yielding entirely to warmth." },
  { id: "crunchy", label: "Crunchy", description: "A sculpted fracture, precise and deliberate." },
];

/**
 * Derives the five spectrum metrics from a single 0–100 position.
 * Kept deliberately simple and readable so it's easy to retune.
 */
export const getFlavorMetrics = (position) => {
  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

  return {
    intensity: Math.round(position),
    sweetness: Math.round(clamp(95 - position * 0.35, 20, 95)),
    acidity: Math.round(clamp(75 - position * 0.55, 10, 75)),
    bitterness: Math.round(clamp(10 + position * 0.5, 10, 65)),
    richness: Math.round(clamp(35 + position * 0.6, 35, 95)),
  };
};

export const getSpectrumLabel = (position) => {
  if (position < 33) return "Light";
  if (position < 66) return "Balanced";
  return "Intense";
};

export const getFinishDescriptor = (metrics) => {
  if (metrics.intensity >= 66) return "Long & Elegant";
  if (metrics.intensity >= 33) return "Balanced & Refined";
  return "Light & Delicate";
};