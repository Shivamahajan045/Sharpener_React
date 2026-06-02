import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";

function CartModal({ isOpen, onClose }) {
  const { cartItems, removeFromCart, totalPrice, updateQuantity } = useCart();

  const handleDecrease = (item) => {
    updateQuantity(item.id, item.quantity - 1);
  };

  const handleIncrease = (item) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="cart-modal" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <div className="cart-modal__backdrop" onClick={onClose} />
      <div className="cart-modal__panel">
        <div className="cart-modal__header">
          <h2 id="cart-title">Your Cart</h2>
          <button className="cart-modal__close" type="button" onClick={onClose}>
            Close
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-modal__empty">
            <p>Your cart is empty right now.</p>
            <p>Add a few items from the store to see them here.</p>
          </div>
        ) : (
          <>
            <div className="cart-list">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img
                    className="cart-item__image"
                    src={item.imageUrl}
                    alt={item.title}
                  />
                  <div className="cart-item__details">
                    <strong>{item.title}</strong>
                    <span>{formatPrice(item.price)}</span>
                  </div>
                  <div className="cart-item__actions">
                    <div className="quantity-control">
                      <button
                        className="quantity-control__button"
                        type="button"
                        aria-label={`Decrease quantity for ${item.title}`}
                        disabled={item.quantity <= 1}
                        onClick={() => handleDecrease(item)}
                      >
                        -
                      </button>
                      <input
                        className="quantity-control__input"
                        aria-label={`Quantity for ${item.title}`}
                        min="1"
                        type="number"
                        value={item.quantity}
                        onChange={(event) =>
                          updateQuantity(item.id, event.target.value)
                        }
                      />
                      <button
                        className="quantity-control__button"
                        type="button"
                        aria-label={`Increase quantity for ${item.title}`}
                        onClick={() => handleIncrease(item)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="button button--danger"
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-modal__footer">
              <div className="cart-modal__total">
                <span>Total</span>
                <strong>{formatPrice(totalPrice)}</strong>
              </div>
              <button className="button button--accent" type="button">
                Purchase
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartModal;
