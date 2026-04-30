import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useMedicine } from "../context/MedicineContext";

export default function Cart() {
  const {
    cartItems,
    increaseCartItem,
    decreaseCartItem,
    removeFromCart,
    clearCart,
    placeOrder,
    totalItems,
    totalAmount,
  } = useCart();
  const { medicines } = useMedicine();
  const [ordered, setOrdered] = useState(false);

  const handlePlaceOrder = () => {
    placeOrder();
    setOrdered(true);
    setTimeout(() => setOrdered(false), 3000);
  };

  return (
    <div className="card">
      <div className="cart-header">
        <h2 className="section-title" style={{ marginBottom: 0 }}>
          Cart
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </h2>
        {cartItems.length > 0 && (
          <button className="btn-clear" onClick={clearCart}>
            Clear all
          </button>
        )}
      </div>

      {ordered && (
        <div className="success-banner">Order placed successfully!</div>
      )}

      {cartItems.length === 0 ? (
        <p className="empty">No items in cart yet.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => {
              const med = medicines.find((m) => m.id === item.id);
              const canIncrease = med && med.qty > 0;
              return (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <span className="cart-item-name">{item.name}</span>
                    <span className="cart-item-sub">
                      ₹{item.price} each · ₹{item.price * item.qty} total
                    </span>
                  </div>
                  <div className="cart-item-controls">
                    <div className="qty-ctrl">
                      <button
                        className="qty-btn"
                        onClick={() => decreaseCartItem(item.id)}
                      >
                        −
                      </button>
                      <span className="qty-num">{item.qty}</span>
                      <button
                        className="qty-btn"
                        onClick={() => increaseCartItem(item.id, med?.qty)}
                        disabled={!canIncrease}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn-remove"
                      onClick={() => removeFromCart(item.id, item.qty)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Items ({totalItems})</span>
              <span>₹{totalAmount}</span>
            </div>
            <div className="summary-row">
              <span>Discount</span>
              <span>—</span>
            </div>
            <div className="total-row">
              <span>Total</span>
              <span className="total-amount">₹{totalAmount}</span>
            </div>
            <button className="btn-checkout" onClick={handlePlaceOrder}>
              Place Order →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
