import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../JS/productSlice";
import { setPickupDate } from "../JS/cartSlice";
import { getMinPickupDate } from "../utils/storeHours";
import ProductModal from "./ProductModal";
import "./Home.css";

const formatPrice = (value) => `From €${Number(value).toFixed(2).replace(".", ",")}`;

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const dispatch = useDispatch();
  const { productList, status } = useSelector((state) => state.product);
  const pickupDate = useSelector((state) => state.cart?.pickupDate);

  const minPickupDate = getMinPickupDate();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <main className="home">
      {/* Hero split */}
      <section className="hero">
        <div className="hero__left">
          <span className="hero__eyebrow">Seasonal Selection</span>
          <h1 className="hero__title">Our seasonal creations</h1>
          <p className="hero__text">
            Crafted daily by hand, in small batches, from the finest seasonal
            fruit and single-origin chocolate.
          </p>
          <div className="hero__info">
            <p className="hero__address">6 Rue de Castiglione, 75001 Paris</p>
            <p className="hero__hours">
              Open daily &middot; 8:00&nbsp;&mdash;&nbsp;19:30
            </p>
          </div>
        </div>

        <div className="hero__right">
          <div className="pickup-card">
            <p className="pickup-card__title">I will collect my order on</p>

            <label className="pickup-card__field">
              <span className="pickup-card__label">Select a date</span>
              <input
                type="date"
                className="pickup-card__input"
                value={pickupDate || ""}
                min={minPickupDate}
                onChange={(e) => dispatch(setPickupDate(e.target.value))}
              />
            </label>

            <button type="button" className="pickup-card__btn">
              Continue
            </button>
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="product-section">
        <h2 className="product-section__title">This Week&rsquo;s Creations</h2>

        <div className="product-grid">
          {status === "pending" ? (
            <p style={{ textAlign: "center", width: "100%", padding: "2rem" }}>
              Loading creations...
            </p>
          ) : (
            productList?.map((product) => (
              <div
                key={product._id || product.id}
                className="product-card"
                onClick={() => setSelectedProduct(product)}
                style={{ cursor: "pointer" }}
              >
                <div className="product-card__image-wrap">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-card__image"
                    loading="lazy"
                  />
                </div>
                <p className="product-card__name">{product.name}</p>
                <p className="product-card__price">
                  {formatPrice(product.price)}
                </p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Banner */}
      <section className="banner">
        <img
          src="https://tse3.mm.bing.net/th/id/OIP.a8BWoxjlqqe4mPZMJUuqeAHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
          alt="Artisanal pastry craftsmanship"
          className="banner__image"
        />
        <div className="banner__overlay">
          <h2 className="banner__title">
            Artisanal excellence, made visible
          </h2>
          <Link to="/contact-us" className="banner__btn">
            Contact Us
          </Link>
        </div>
      </section>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </main>
  );
};

export default Home;