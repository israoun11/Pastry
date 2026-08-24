import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openCart } from "../JS/cartSlice";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Click & Collect", to: "/click-and-collect" },
  { label: "The Tasting Room", to: "/tasting-room" },
  { label: "Dessert Concierge", to: "/dessert-concierge" },
  { label: "Contact Us", to: "/contact-us" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const { user } = useSelector((state) => state.user);
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const handleAccountClick = () => {
    setMenuOpen(false);
    navigate(user ? "/account" : "/login");
  };

  const handleCartClick = () => {
    setMenuOpen(false);
    dispatch(openCart());
  };

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
          Maison D&rsquo;Isra
        </Link>

        <nav className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="navbar__link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="navbar__actions">
          <button
            className="navbar__icon-btn"
            onClick={handleAccountClick}
            aria-label={user ? "My account" : "Sign in"}
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" />
            </svg>
            {user && <span className="navbar__dot" />}
          </button>

          {/* Now opens the CartDrawer instead of navigating to a page */}
          <button
            type="button"
            className="navbar_icon-btn navbar_cart"
            onClick={handleCartClick}
            aria-label="Open cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M6 8h12l-1.2 11.2a1.5 1.5 0 0 1-1.5 1.3H8.7a1.5 1.5 0 0 1-1.5-1.3L6 8Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            {cartCount > 0 && <span className="navbar__badge">{cartCount}</span>}
          </button>

          <button
            className="navbar__burger"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            type="button"
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;