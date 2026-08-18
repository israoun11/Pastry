import React, { useState } from "react";
import "./InquiryModal.css";

/**
 * Generic luxury inquiry modal used by both BespokeStudio and DessertConcierge.
 * summaryLines: [{ label, value }]  — rendered as a receipt-style recap
 */
const InquiryModal = ({ open, title, summaryLines = [], estimatedPrice, onClose }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend yet — replace with your contact/email mechanism when available
    console.log("Inquiry submitted:", { ...form, summaryLines, estimatedPrice });
    setSubmitted(true);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="inquiry-modal-overlay" onClick={handleOverlayClick}>
      <div className="inquiry-modal" role="dialog" aria-modal="true" aria-label={title}>
        <button
          type="button"
          className="inquiry-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        {submitted ? (
          <div className="inquiry-modal__success">
            <span className="inquiry-modal__success-mark">✓</span>
            <h3>Your Request Has Been Received</h3>
            <p>
              Thank you, {form.name || "there"}. Our atelier team will reach
              out shortly to refine every detail with you.
            </p>
            <button type="button" className="inquiry-modal__done-btn" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <span className="inquiry-modal__eyebrow">Maison D&rsquo;Isra Atelier</span>
            <h3 className="inquiry-modal__title">{title}</h3>

            {summaryLines.length > 0 && (
              <div className="inquiry-modal__summary">
                {summaryLines.map((line) => (
                  <div className="inquiry-modal__summary-row" key={line.label}>
                    <span>{line.label}</span>
                    <span>{line.value}</span>
                  </div>
                ))}
                {estimatedPrice !== undefined && (
                  <div className="inquiry-modal_summary-row inquiry-modal_summary-row--total">
                    <span>Estimated Price</span>
                    <span>€{estimatedPrice.toFixed(2)}</span>
                  </div>
                )}
              </div>
            )}

            <form className="inquiry-modal__form" onSubmit={handleSubmit}>
              <div className="inquiry-modal__row">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="notes"
                placeholder="Anything else we should know?"
                rows={3}
                value={form.notes}
                onChange={handleChange}
              />

              <button type="submit" className="inquiry-modal__submit">
                Submit Request
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default InquiryModal;