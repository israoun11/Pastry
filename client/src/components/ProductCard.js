import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../JS/cartSlice";
import Badge from "./Badge";
import ScarcityTag from "./ScarcityTag";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const [justAdded, setJustAdded] = useState(false);
  const dispatch = useDispatch();

  const {
    id,
    _id,
    name,
    description,
    price,
    image,
    stock,
    badges,
    dailyLimit,
    noticeHours,
  } = product;

  const inStock = Number(stock) > 0;

  const handleAddToCart = () => {
    if (!inStock) return;

    // Dispatch item to Redux store
    dispatch(
      addToCart({
        product: {
          id: id || _id,
          name,
          price,
          image,
          noticeHours,
        },
        quantity: 1,
      })
    );

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <div className="product-card-item">
      <div className="product-card-item__image-wrap">
        <img
          src={image}
          alt={name}
          className="product-card-item__image"
          loading="lazy"
        />

        {/* Badges & Scarcity Overlay */}
        {badges && badges.length > 0 && (
          <div className="product-card__badges">
            {badges.map((b, i) => (
              <Badge key={i} text={b} />
            ))}
          </div>
        )}

        {dailyLimit && <ScarcityTag limit={dailyLimit} />}

        {/* Stock Badge */}
        <span
          className={`product-card-item__stock ${
            inStock
              ? "product-card-item__stock--in"
              : "product-card-item__stock--out"
          }`}
        >
          <span className="product-card-item__stock-dot" />
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      <div className="product-card-item__body">
        <h3 className="product-card-item__name">{name}</h3>
        <p className="product-card-item__description">{description}</p>

        <div className="product-card-item__footer">
          <span className="product-card-item__price">
            €{Number(price).toFixed(2)}
          </span>

          <button
            type="button"
            className={`product-card-item__btn ${
              justAdded ? "product-card-item__btn--added" : ""
            }`}
            onClick={handleAddToCart}
            disabled={!inStock}
          >
            {!inStock
              ? "Unavailable"
              : justAdded
              ? "Added ✓"
              : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;