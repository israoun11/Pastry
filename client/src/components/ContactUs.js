import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ContactUs.css";

const CONTACT_INFO = [
  {
    id: "address",
    title: "Address",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22Z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </svg>
    ),
    lines: ["24 King Street, Downtown", "New York, NY 10001"],
  },
  {
    id: "phone",
    title: "Phone",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M4 5c0-1.1.9-2 2-2h2.2c.5 0 .95.34 1.08.83l1 3.6a1.1 1.1 0 0 1-.32 1.13L8.4 10.1a12 12 0 0 0 5.5 5.5l1.54-1.56a1.1 1.1 0 0 1 1.13-.32l3.6 1a1.1 1.1 0 0 1 .83 1.08V18c0 1.1-.9 2-2 2h-1C10.6 20 4 13.4 4 5Z" />
      </svg>
    ),
    lines: ["+1 (212) 555-0148", "+1 (212) 555-0192"],
  },
  {
    id: "email",
    title: "Email",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="3" y="5" width="18" height="14" rx="1.5" />
        <path d="M3.5 6.5 12 13l8.5-6.5" />
      </svg>
    ),
    lines: ["hello@delibake.com", "orders@delibake.com"],
  },
];

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wire this up to your contact/mail API endpoint when ready
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
    setFormData({ firstName: "", lastName: "", email: "", message: "" });
  };

  return (
    <main className="contact-us">
      {/* Hero header */}
      <section className="contact-us__hero">
        <h1 className="contact-us__hero-title">Our Contact</h1>
        <nav className="contact-us__breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="contact-us__breadcrumb-link">
            Home
          </Link>
          <span className="contact-us__breadcrumb-separator">&gt;</span>
          <span className="contact-us__breadcrumb-current">Contact</span>
        </nav>
      </section>

      {/* Contact info cards */}
      <section className="contact-us__info">
        <div className="contact-us__info-grid">
          {CONTACT_INFO.map((item) => (
            <div className="contact-card" key={item.id}>
              <div className="contact-card__icon">{item.icon}</div>
              <h3 className="contact-card__title">{item.title}</h3>
              <div className="contact-card__lines">
                {item.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Send a message form */}
      <section className="contact-us__form-section">
        <div className="contact-us__form-header">
          <span className="contact-us__subtitle">Our Contact</span>
          <h2 className="contact-us__form-title">Send a Message</h2>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form__row">
            <div className="contact-form__field">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="contact-form__input"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="contact-form__field">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="contact-form__input"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="contact-form__row">
            <div className="contact-form_field contact-form_field--full">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="contact-form__input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="contact-form__row">
            <div className="contact-form_field contact-form_field--full">
              <textarea
                name="message"
                placeholder="Message"
                className="contact-form__textarea"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {submitted && (
            <p className="contact-form__success">
              Thank you — your message has been sent. We&rsquo;ll be in touch shortly.
            </p>
          )}

          <div className="contact-form__submit-wrap">
            <button type="submit" className="contact-form__submit">
              Send Message
            </button>
          </div>
        </form>
      </section>

      {/* Google Map */}
      <section className="contact-us__map">
        <iframe
          title="Delibake Bakery location"
          className="contact-us__map-iframe"
          src="https://www.google.com/maps?q=24+King+Street,+New+York,+NY+10001&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </main>
  );
};

export default ContactUs;