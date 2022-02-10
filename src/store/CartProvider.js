import { useReducer } from "react";
import CartContext from "./cart-context";





const defaultCartState = {
  items: [],
  totalAmount: 0
}

//Shouldn't be recreated everytime the component is reevaluated, so we put outside of Component
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    //New total amount
    const updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount);

    const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id)

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;
    
    // if item already exists in cart
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      }
      //update that item and the items in Context,
      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex] = updatedItem
    } else {
      //else, just add it to the array
      updatedItems = state.items.concat(action.item)
    }


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
