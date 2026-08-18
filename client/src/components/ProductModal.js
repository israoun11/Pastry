import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../JS/cartSlice'; 
import { getMinPickupDate, isPickupDateValid } from '../utils/storeHours';
import Badge from './Badge';
import ScarcityTag from './ScarcityTag';
import './ProductModal.css';

const ProductModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const globalPickupDate = useSelector((state) => state.cart?.pickupDate);

  if (!product) return null;

  const inStock = product.stock !== undefined ? product.stock > 0 : true;
  const noticeHours = product.noticeHours || 0;
  const minDateForProduct = getMinPickupDate(noticeHours);
  const pickupValid = isPickupDateValid(globalPickupDate, noticeHours);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < (product.stock || 99)) setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (!inStock || !pickupValid) return;
    dispatch(addToCart({ product, quantity }));
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>

        <div className="modal-content">
          <div className="modal-image-section">
            <img
              src={product.image}
              alt={product.name}
              className="modal-product-img"
            />
          </div>

          <div className="modal-details-section">
            {/* Badges & Scarcity */}
            {product.badges && product.badges.length > 0 && (
              <div className="modal-badges-wrap" style={{ marginBottom: '8px' }}>
                {product.badges.map((b, i) => (
                  <Badge key={i} text={b} />
                ))}
              </div>
            )}

            {product.dailyLimit && <ScarcityTag limit={product.dailyLimit} />}

            <h2 className="modal-title">{product.name}</h2>

            {product.description && (
              <p className="modal-description">{product.description}</p>
            )}

            {product.allergens && product.allergens.length > 0 && (
              <p className="modal-meta-info">
                <strong>Contains: </strong>
                {Array.isArray(product.allergens)
                  ? product.allergens.join(', ')
                  : product.allergens}
              </p>
            )}

            {product.mayContainTracesOf && product.mayContainTracesOf.length > 0 && (
              <p className="modal-meta-info muted">
                May contain traces of:{' '}
                {Array.isArray(product.mayContainTracesOf)
                  ? product.mayContainTracesOf.join(', ')
                  : product.mayContainTracesOf}
              </p>
            )}

            <div className="modal-action-row">
              <div className="quantity-selector">
                <button onClick={handleDecrease}>-</button>
                <span>{quantity}</span>
                <button onClick={handleIncrease}>+</button>
              </div>

              <div className="modal-price-tag">
                €{(product.price * quantity).toFixed(2)}
              </div>

              {product.noticeHours && (
                <span className="modal-notice">{product.noticeHours}</span>
              )}
            </div>

            {/* تنبيه تاريخ الاستلام */}
            {!pickupValid && (
              <p className="product-modal__notice-warning">
                {`globalPickupDate
                  ? This creation requires ${noticeHours} hours notice. Earliest available: ${minDateForProduct}.
                  : "Please select a pickup date first."`}
              </p>
            )}

            <button
              type="button"
              className="modal-add-btn"
              onClick={handleAddToCart}
              disabled={!inStock || !pickupValid}
            >
              {!inStock ? "Unavailable" : "Add to cart"}
            </button>

            {product.noticeHours && (
              <p className="modal-availability-footer">
                Product available with minimum notice of {product.noticeHours}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;