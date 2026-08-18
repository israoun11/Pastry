import React from "react";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__brand">Maison D'Isra</p>
        <p className="footer__copy">&copy; {year} Maison D'Isra. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;