// Central data + pricing logic for the Bespoke Studio experience.
// Everything runs on the frontend — no API calls involved.

export const STEPS = [
  { id: 1, label: "Occasion" },
  { id: 2, label: "Style" },
  { id: 3, label: "Shape & Size" },
  { id: 4, label: "Flavor" },
  { id: 5, label: "Filling" },
  { id: 6, label: "Finish" },
  { id: 7, label: "Details" },
  { id: 8, label: "Your Creation" },
];

export const OCCASIONS = [
  { id: "wedding", label: "Wedding", description: "A centerpiece worthy of your day.", image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=800&q=80" },
  { id: "birthday", label: "Birthday", description: "Celebration, made personal.", image: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&w=800&q=80" },
  { id: "anniversary", label: "Anniversary", description: "A quiet tribute to time shared.", image: "https://images.unsplash.com/photo-1522767131594-6b7e96e5cffc?auto=format&fit=crop&w=800&q=80" },
  { id: "corporate", label: "Corporate", description: "Refined presence for your brand.", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80" },
  { id: "celebration", label: "Celebration", description: "For milestones worth marking.", image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=800&q=80" },
  { id: "just-because", label: "Just Because", description: "No occasion required.", image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80" },
];

export const STYLES = [
  { id: "classic", label: "Classic", description: "Timeless proportions, quiet elegance.", multiplier: 1.0, image: "https://images.unsplash.com/photo-1464195244916-405fa0a82545?auto=format&fit=crop&w=800&q=80" },
  { id: "modern", label: "Modern", description: "Clean geometry, confident lines.", multiplier: 1.05, image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=800&q=80" },
  { id: "minimal", label: "Minimal", description: "Restraint as the ultimate luxury.", multiplier: 1.0, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80" },
  { id: "romantic", label: "Romantic", description: "Soft textures, delicate detailing.", multiplier: 1.1, image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=800&q=80" },
  { id: "sculptural", label: "Sculptural", description: "Architectural, sharply composed.", multiplier: 1.3, image: "https://images.unsplash.com/photo-1586985289906-406988974504?auto=format&fit=crop&w=800&q=80" },
  { id: "luxury", label: "Luxury", description: "Uncompromising, entirely bespoke.", multiplier: 1.5, image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=800&q=80" },
];

export const SHAPES = [
  { id: "round", label: "Round", description: "The classical silhouette.", tiered: false, priceMultiplier: 1.0 },
  { id: "square", label: "Square", description: "Modern and architectural.", tiered: false, priceMultiplier: 1.0 },
  { id: "heart", label: "Heart", description: "An intimate, romantic form.", tiered: false, priceMultiplier: 1.1 },
  { id: "tiered", label: "Tiered", description: "Grand presence, multiple layers.", tiered: true, priceMultiplier: 1.6 },
];

export const SIZES = [
  { id: "intimate", label: "Intimate", guests: "2–10 guests", guestCount: 8, basePrice: 65 },
  { id: "gathering", label: "Gathering", guests: "10–25 guests", guestCount: 20, basePrice: 130 },
  { id: "celebration", label: "Celebration", guests: "25–50 guests", guestCount: 40, basePrice: 220 },
  { id: "grand", label: "Grand", guests: "50–100 guests", guestCount: 75, basePrice: 360 },
];

export const FLAVORS = [
  { id: "dark-chocolate", label: "Dark Chocolate", description: "Intense 70% single-origin.", addon: 10, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80" },
  { id: "vanilla", label: "Vanilla & Madagascar Vanilla", description: "Rich, cured bourbon vanilla.", addon: 0, image: "https://images.unsplash.com/photo-1464195244916-405fa0a82545?auto=format&fit=crop&w=800&q=80" },
  { id: "pistachio-raspberry", label: "Pistachio & Raspberry", description: "Nutty depth, bright acidity.", addon: 18, image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80" },
  { id: "salted-caramel", label: "Salted Caramel", description: "Buttery caramel, sea salt finish.", addon: 12, image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80" },
  { id: "red-velvet", label: "Red Velvet", description: "Cocoa-kissed, cream-finished.", addon: 8, image: "https://images.unsplash.com/photo-1586985289906-406988974504?auto=format&fit=crop&w=800&q=80" },
  { id: "coffee-hazelnut", label: "Coffee & Hazelnut", description: "Roasted Piedmont hazelnut, espresso.", addon: 14, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80" },
];

export const FILLINGS = [
  { id: "vanilla-cream", label: "Vanilla Cream", addon: 0 },
  { id: "raspberry-compote", label: "Raspberry Compote", addon: 8 },
  { id: "chocolate-ganache", label: "Chocolate Ganache", addon: 10 },
  { id: "pistachio-cream", label: "Pistachio Cream", addon: 15 },
  { id: "salted-caramel-filling", label: "Salted Caramel", addon: 10 },
];

export const FINISHES = [
  { id: "ivory", label: "Ivory", addon: 0, color: "#f4ede1" },
  { id: "champagne", label: "Champagne", addon: 12, color: "#e8d5b5" },
  { id: "matte-black", label: "Matte Black", addon: 18, color: "#1c1a17" },
  { id: "nude", label: "Nude", addon: 0, color: "#e3cdb8" },
  { id: "deep-chocolate", label: "Deep Chocolate", addon: 10, color: "#4a2f22" },
];

export const DETAILS = [
  { id: "gold-leaf", label: "Gold Leaf", description: "Hand-applied edible gold.", addon: 32 },
  { id: "fresh-flowers", label: "Fresh Flowers", description: "Seasonal, food-safe blooms.", addon: 38 },
  { id: "chocolate-decor", label: "Chocolate Decoration", description: "Hand-tempered accents.", addon: 24 },
  { id: "minimal-lettering", label: "Minimal Lettering", description: "A single refined word.", addon: 12 },
  { id: "custom-message", label: "Custom Message", description: "Your own words, hand-piped.", addon: 15 },
];

/**
 * Calculates the live estimate as selections are made.
 * selections: { shape, size, style, flavor, filling, finish, details: [] }
 */
export const calculateEstimate = (selections) => {
  const { shape, size, style, flavor, filling, finish, details = [] } = selections;

  if (!size) return 0;

  let price = size.basePrice;

  if (shape) price *= shape.priceMultiplier;
  if (style) price *= style.multiplier;

  if (flavor) price += flavor.addon;
  if (filling) price += filling.addon;
  if (finish) price += finish.addon;

  const detailsTotal = details.reduce((sum, d) => sum + d.addon, 0);
  price += detailsTotal;

  return Math.round(price);
};