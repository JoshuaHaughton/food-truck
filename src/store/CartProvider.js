import { useReducer } from "react";
import CartContext from "./cart-context";





const defaultCartState = {
  items: [],
  totalAmount: 0
}

//Shouldn't be recreated everytime the component is reevaluated, so we put outside of Component
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    //Concat returns a new array instead of mutating the current one like push
    const updatedItems = state.items.concat(action.item);
    //existing??
    const updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount);
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }
  return defaultCartState
}

//Allows for wrapping of any components that need to get access to this context
const CartProvider = (props) => {
  //Using useReducer instead of useState because state is complex in this component
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);


  const addCartItem = item => {
    dispatchCartAction({type: 'ADD', item: item});
  }

  

  const removeCartItem = id => {}



  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
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
