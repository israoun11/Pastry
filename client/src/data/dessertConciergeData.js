// Questions + a rules-based recommendation engine for the Dessert Concierge.
// All logic runs client-side against a small curated catalog.

export const QUESTIONS = [
  {
    id: "occasion",
    title: "What are you celebrating?",
    options: [
      { id: "wedding", label: "Wedding" },
      { id: "birthday", label: "Birthday" },
      { id: "anniversary", label: "Anniversary" },
      { id: "corporate", label: "Corporate Event" },
      { id: "dinner", label: "Dinner" },
      { id: "gift", label: "Gift" },
      { id: "personal", label: "A Personal Moment" },
    ],
  },
  {
    id: "guests",
    title: "How many guests?",
    options: [
      { id: "2-6", label: "2–6", guestCount: 4 },
      { id: "7-15", label: "7–15", guestCount: 11 },
      { id: "16-30", label: "16–30", guestCount: 23 },
      { id: "31-60", label: "31–60", guestCount: 45 },
      { id: "60+", label: "60+", guestCount: 80 },
    ],
  },
  {
    id: "taste",
    title: "What is your taste?",
    options: [
      { id: "chocolatey", label: "Rich & Chocolatey" },
      { id: "fruity", label: "Fresh & Fruity" },
      { id: "nutty", label: "Nutty & Delicate" },
      { id: "elegant", label: "Light & Elegant" },
      { id: "classic", label: "Classic & Comforting" },
    ],
  },
  {
    id: "style",
    title: "What is your style?",
    options: [
      { id: "minimal", label: "Minimal" },
      { id: "romantic", label: "Romantic" },
      { id: "modern", label: "Modern" },
      { id: "classic", label: "Classic" },
      { id: "dramatic", label: "Dramatic" },
    ],
  },
  {
    id: "budget",
    title: "What is your budget?",
    options: [
      { id: "modest", label: "€30 – €80" },
      { id: "considered", label: "€80 – €200" },
      { id: "elevated", label: "€200 – €450" },
      { id: "unrestrained", label: "€450+" },
    ],
  },
  {
    id: "experience",
    title: "What kind of experience do you want?",
    options: [
      { id: "signature-cake", label: "One Signature Cake" },
      { id: "dessert-table", label: "Dessert Table" },
      { id: "individual", label: "Individual Pastries" },
      { id: "gift", label: "Luxury Gift" },
      { id: "collection", label: "Complete Celebration Collection" },
    ],
  },
];

// Curated catalog. Each item is tagged so the engine can score fit.
const CATALOG = [
  {
    id: "grand-tiered",
    name: "The Grand Ivory Tiered Cake",
    type: "cake",
    basePrice: 480,
    tags: {
      occasion: ["wedding", "anniversary"],
      guests: ["31-60", "60+"],
      taste: ["classic", "elegant"],
      style: ["classic", "romantic", "dramatic"],
      budget: ["elevated", "unrestrained"],
      experience: ["signature-cake", "collection"],
    },
    reasonTemplate: "chosen for its grand presence and timeless elegance — ideal for a wedding-scale celebration",
    complementary: ["Petit fours trio", "Hand-tied floral accents", "Champagne macarons"],
    upgrade: "Add a hand-painted gold monogram (+€45)",
  },
  {
    id: "curated-pastry-box",
    name: "The Curated Pastry Box",
    type: "box",
    perUnitPrice: 68,
    piecesPerBox: 6,
    tags: {
      occasion: ["corporate", "gift"],
      guests: ["7-15", "16-30"],
      taste: ["classic", "nutty", "elegant"],
      style: ["minimal", "modern"],
      budget: ["considered", "modest"],
      experience: ["gift", "individual", "dessert-table"],
    },
    reasonTemplate: "chosen for its polished presentation and effortless sharing — ideal for a professional or gifting occasion",
    complementary: ["Personalized ribbon and card", "Espresso pairing notes"],
    upgrade: "Upgrade to a champagne-lined presentation box (+€18)",
  },
  {
    id: "pistachio-raspberry-entremet",
    name: "Pistachio & Raspberry Entremet",
    type: "individual",
    perUnitPrice: 12,
    tags: {
      occasion: ["dinner", "personal", "birthday", "anniversary"],
      guests: ["2-6", "7-15"],
      taste: ["nutty", "fruity", "elegant"],
      style: ["minimal", "romantic"],
      budget: ["modest", "considered"],
      experience: ["individual", "signature-cake"],
    },
    reasonTemplate: "chosen for its balance of delicate pistachio, bright raspberry and a refined finish — ideal for an intimate, elegant moment",
    complementary: ["Yuzu madeleines", "Single-origin chocolate mendiants"],
    upgrade: "Add a personalized dessert plate presentation (+€8 per guest)",
  },
  {
    id: "sculptural-chocolate",
    name: "Dark Chocolate Sculptural Cake",
    type: "cake",
    basePrice: 210,
    tags: {
      occasion: ["birthday", "corporate", "personal"],
      guests: ["16-30", "31-60"],
      taste: ["chocolatey"],
      style: ["dramatic", "modern"],
      budget: ["considered", "elevated"],
      experience: ["signature-cake", "collection"],
    },
    reasonTemplate: "chosen for its bold, architectural silhouette and intense single-origin chocolate — ideal for a dramatic centerpiece",
    complementary: ["Cocoa nib florentines", "Salted caramel bonbons"],
    upgrade: "Add a mirror-glaze finish for a striking reflective surface (+€30)",
  },
  {
    id: "classic-celebration-cake",
    name: "The Classic Celebration Cake",
    type: "cake",
    basePrice: 95,
    tags: {
      occasion: ["birthday", "anniversary", "personal", "dinner"],
      guests: ["2-6", "7-15", "16-30"],
      taste: ["classic", "elegant"],
      style: ["classic", "minimal"],
      budget: ["modest", "considered"],
      experience: ["signature-cake"],
    },
    reasonTemplate: "chosen for its comforting familiarity and refined simplicity — a dependable centerpiece for any gathering",
    complementary: ["Shortbread sablés", "Seasonal fruit compote jar"],
    upgrade: "Add fresh seasonal flowers to the base (+€25)",
  },
  {
    id: "dessert-table-collection",
    name: "The Complete Dessert Table Collection",
    type: "box",
    perUnitPrice: 14,
    piecesPerBox: 1,
    tags: {
      occasion: ["wedding", "corporate", "celebration"],
      guests: ["31-60", "60+"],
      taste: ["fruity", "nutty", "chocolatey", "elegant"],
      style: ["modern", "dramatic", "romantic"],
      budget: ["elevated", "unrestrained"],
      experience: ["dessert-table", "collection"],
    },
    reasonTemplate: "chosen for its variety and visual abundance — ideal for a larger celebration that calls for a full spread",
    complementary: ["Assorted mini entremets", "Chocolate fountain station"],
    upgrade: "Add a live pastry-finishing station (+€150)",
  },
];

const GUEST_COUNT_MAP = {
  "2-6": 4,
  "7-15": 11,
  "16-30": 23,
  "31-60": 45,
  "60+": 80,
};

/**
 * Scores each catalog item against the user's answers and returns the
 * highest-scoring match, along with a dynamically generated "why" reason
 * and calculated pricing/quantity.
 */
export const getRecommendation = (answers) => {
  const { occasion, guests, taste, style, budget, experience } = answers;

  let bestMatch = null;
  let bestScore = -1;
  const matchedAttributes = { current: [] };

  CATALOG.forEach((item) => {
    let score = 0;
    const matched = [];

    if (occasion && item.tags.occasion.includes(occasion.id)) {
      score += 3;
      matched.push("occasion");
    }
    if (experience && item.tags.experience.includes(experience.id)) {
      score += 3;
      matched.push("experience");
    }
    if (taste && item.tags.taste.includes(taste.id)) {
      score += 2;
      matched.push("taste");
    }
    if (style && item.tags.style.includes(style.id)) {
      score += 2;
      matched.push("style");
    }
    if (guests && item.tags.guests.includes(guests.id)) {
      score += 1;
      matched.push("guests");
    }
    if (budget && item.tags.budget.includes(budget.id)) {
      score += 1;
      matched.push("budget");
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
      matchedAttributes.current = matched;
    }
  });

  const guestCount = guests ? GUEST_COUNT_MAP[guests.id] : 10;

  let estimatedPrice = 0;
  let quantitySuggestion = "";

  if (bestMatch.type === "cake") {
    // Larger guest counts on the top end of a size band nudge price up slightly
    const guestAdjustment = guestCount > 50 ? 1.15 : 1;
    estimatedPrice = Math.round(bestMatch.basePrice * guestAdjustment);
    quantitySuggestion = `1 creation, serves approximately ${guestCount} guests`;
  } else if (bestMatch.type === "individual") {
    estimatedPrice = Math.round(bestMatch.perUnitPrice * guestCount);
    quantitySuggestion = `${guestCount} individual pieces`;
  } else if (bestMatch.type === "box") {
    const boxes = Math.max(1, Math.ceil(guestCount / (bestMatch.piecesPerBox || 1)));
    estimatedPrice = Math.round(bestMatch.perUnitPrice * boxes);
    quantitySuggestion =
      bestMatch.piecesPerBox > 1
        ? `${boxes} box${boxes > 1 ? "es" : ""} of ${bestMatch.piecesPerBox}`
        : `${boxes} curated piece${boxes > 1 ? "s" : ""}`;
  }

  const reason = `Chosen for its ${bestMatch.reasonTemplate}`;

  return {
    ...bestMatch,
    reason,
    quantitySuggestion,
    estimatedPrice,
    matchedOn: matchedAttributes.current,
  };
};