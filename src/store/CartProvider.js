import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

//Shouldn't be recreated everytime the component is reevaluated, so we put outside of Component
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    //New total amount
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id,
    );

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    // if item already exists in cart
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      //update that item and the items in Context,
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      //else, just add it to the array
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "MINUS") {
    const existingIndex = state.items.findIndex(
      (item) => item.id === action.id,
    );
    const existingItem = state.items[existingIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    // If there's 1 item left
    if (existingItem.amount === 1) {
      //Remove it from the items arrat
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      //Else minus the amount by 1
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }


  if (action.type === "REMOVE") {
    const existingIndex = state.items.findIndex(
      (item) => item.id === action.id,
    );
    const existingItem = state.items[existingIndex];
    const updatedTotalAmount = state.totalAmount - (existingItem.price * existingItem.amount);

    

      //Remove it from the items array
      const updatedItems = state.items.filter((item) => item.id !== action.id);


    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCartState;
};

//Allows for wrapping of any components that need to get access to this context
const CartProvider = (props) => {
  //Using useReducer instead of useState because state is complex in this component
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState,
  );

  const addCartItem = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const minusCartItem = (id) => {
    dispatchCartAction({ type: "MINUS", id });
  };

  const removeCartItem = (id) => {
    dispatchCartAction({ type: "REMOVE", id });
  }



  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addCartItem,
    minusItem: minusCartItem,
    removeItem: removeCartItem
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
