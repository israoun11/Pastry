import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeCart,
  incrementItem,
  decrementItem,
  removeItem,
  selectCartItems,
  selectCartSubtotal,
} from "../JS/cartSlice";
import { isStoreOpen, getClosedBannerMessage, formatPickupDate } from "../utils/storeHours";
import "./CartDrawer.css";

const CartDrawer = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.cart.isOpen);
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);

  const storeOpen = isStoreOpen();
  const closedMessage = getClosedBannerMessage();

  return (
    <>
      <div
        className={`cart-drawer-overlay ${isOpen ? "cart-drawer-overlay--visible" : ""}`}
        onClick={() => dispatch(closeCart())}
        aria-hidden={!isOpen}
      />

      <aside
        className={`cart-drawer ${isOpen ? "cart-drawer--open" : ""}`}
        aria-hidden={!isOpen}
        aria-label="Shopping cart"
      >
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">Your Selection</h2>
          <button
            type="button"
            className="cart-drawer__close"
            onClick={() => dispatch(closeCart())}
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-drawer__empty">
            <p>Your bag is currently empty.</p>
            <span>Discover our seasonal creations and add your favourites.</span>
          </div>
        ) : (
          <div className="cart-drawer__items">
            {items.map((item) => (
              <div className="cart-drawer__item" key={item.cartItemId}>
                <div className="cart-drawer__item-image-wrap">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="cart-drawer__item-body">
                  <p className="cart-drawer__item-name">{item.name}</p>
                  <p className="cart-drawer__item-date">
                    Pickup: {formatPickupDate(item.pickupDate)}
                  </p>

                  <div className="cart-drawer__item-footer">
                    <div className="cart-drawer__quantity">
                      <button
                        type="button"
                        onClick={() => dispatch(decrementItem(item.cartItemId))}
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => dispatch(incrementItem(item.cartItemId))}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <span className="cart-drawer__item-price">
                      €{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="cart-drawer__remove"
                  onClick={() => dispatch(removeItem(item.cartItemId))}
                  aria-label={`Remove ${item.name}`}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="cart-drawer__footer">
          {!storeOpen && items.length > 0 && (
            <p className="cart-drawer__closed-note">{closedMessage}</p>
          )}

          <div className="cart-drawer__subtotal">
            <span>Subtotal</span>
            <span>€{subtotal.toFixed(2)}</span>
          </div>

          <div className="cart-drawer__checkout-wrap">
            <button
              type="button"
              className="cart-drawer__checkout"
              disabled={items.length === 0 || !storeOpen}
            >
              Proceed to Checkout
            </button>

            {!storeOpen && items.length > 0 && (
              <div className="cart-drawer__checkout-overlay">
                Checkout resumes when our lab reopens
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default CartDrawer;