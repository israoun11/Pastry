import React, { useState } from "react";
import CategoryCard from "./CategoryCard";
import ProductGrid from "./ProductGrid";
import "./ClickAndCollect.css";

const CATEGORIES = [
  {
    id: "drinks",
    title: "Drinks",
    subtitle: "Artisanal Cold Brews, Ceremonial Matcha & Tonics",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.YydibY8e1QalCOwsl7FGHgHaNK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: "pastries",
    title: "Pastries & Savories",
    subtitle: "Permanent Gourmet Pastries, Tarts & Bites",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.jxwFwRQ0diXPq_POdSEslgAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
];

const ClickAndCollect = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <main className="click-collect">
      {!selectedCategory ? (
        <div className="click-collect__view click-collect__view--categories">
          <div className="click-collect__intro">
            <span className="click-collect__eyebrow">Maison D&rsquo;Isra</span>
            <h1 className="click-collect__title">Click &amp; Collect</h1>
            <p className="click-collect__text">
              Reserve your favourites online and collect them, freshly
              prepared, at your convenience.
            </p>
          </div>

          <div className="click-collect__categories">
            {CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.id}
                title={cat.title}
                subtitle={cat.subtitle}
                image={cat.image}
                onSelect={() => setSelectedCategory(cat.id)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="click-collect__view click-collect__view--grid">
          <ProductGrid
            category={selectedCategory}
            onBack={() => setSelectedCategory(null)}
          />
        </div>
      )}
    </main>
  );
};

export default ClickAndCollect;