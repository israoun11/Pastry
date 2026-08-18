import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import BackButton from "./BackButton";
import "./ProductGrid.css";

const CATEGORY_CONFIG = {
  drinks: {
    url: "http://localhost:5000/api/drinks",
    dataKey: "drinks",
    label: "Drinks",
    subtitle: "Artisanal Cold Brews, Ceremonial Matcha & Tonics",
  },
  pastries: {
    url: "http://localhost:5000/api/pastries",
    dataKey: "pastries",
    label: "Pastries & Savories",
    subtitle: "Permanent Gourmet Pastries, Tarts & Bites",
  },
};

const ProductGrid = ({ category, onBack }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const config = CATEGORY_CONFIG[category];

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(config.url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to load ${config.label.toLowerCase()}`);
        }

        const data = await response.json();
        setProducts(data[config.dataKey] || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, [category, config.url, config.dataKey, config.label]);

  return (
    <section className="product-view">
      <BackButton onClick={onBack} />

      <div className="product-view__header">
        <h2 className="product-view__title">{config.label}</h2>
        <p className="product-view__subtitle">{config.subtitle}</p>
      </div>

      {loading && (
        <div className="product-view__state">
          <p>Preparing your selection…</p>
        </div>
      )}

      {!loading && error && (
        <div className="product-view__state product-view__state--error">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="product-view__state">
          <p>No items are available in this category right now.</p>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="product-grid-layout">
          {products.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductGrid;