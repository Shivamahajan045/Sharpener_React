import { createContext, useContext, useState } from "react";
import { useMedicine } from "./MedicineContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const { decreaseQty, increaseQty } = useMedicine();

  const addToCart = (medicine) => {
    if (medicine.qty <= 0) return;
    decreaseQty(medicine.id);
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === medicine.id);
      if (existing)
        return prev.map((i) =>
          i.id === medicine.id ? { ...i, qty: i.qty + 1 } : i,
        );
      return [
        ...prev,
        { id: medicine.id, name: medicine.name, price: medicine.price, qty: 1 },
      ];
    });
  };

  const increaseCartItem = (id, currentMedicineQty) => {
    if (currentMedicineQty <= 0) return;
    decreaseQty(id);
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)),
    );
  };

  const decreaseCartItem = (id) => {
    increaseQty(id);
    setCartItems((prev) => {
      const item = prev.find((i) => i.id === id);
      if (!item) return prev;
      if (item.qty === 1) return prev.filter((i) => i.id !== id);
      return prev.map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i));
    });
  };

  const removeFromCart = (id, itemQty) => {
    increaseQty(id, itemQty);
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => {
    cartItems.forEach((item) => increaseQty(item.id, item.qty));
    setCartItems([]);
  };

  const placeOrder = () => setCartItems([]);

  const totalItems = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const totalAmount = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseCartItem,
        decreaseCartItem,
        removeFromCart,
        clearCart,
        placeOrder,
        totalItems,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
