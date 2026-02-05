import CartContext from "./cart-context";
const CartProvider = (props) => {
  const addItemstoCartHandler = (item) => {};
  const removeItemsfromCartHandler = (id) => {};
  const cartContext = {
    items: [],
    totalAmount: [],
    addItem: addItemstoCartHandler,
    removeItem: removeItemsfromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
