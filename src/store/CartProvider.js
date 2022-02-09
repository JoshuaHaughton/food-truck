import CartContext from "./cart-context";

//Allows for wrapping of any components that need to get access to this context
const CartProvider = (props) => {


  const addCartItem = item => {}


  const removeCartItem = id => {}

  const cartContext = {
    items: [],
    totalAmount: 0,
    addItem: addCartItem,
    removeItem: removeCartItem
  }

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
    )
};

export default CartProvider;
