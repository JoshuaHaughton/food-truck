import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  minusItem: (id) => {},
  removeItem: () => {},
  clearCart: () => {}
});

export default CartContext;
