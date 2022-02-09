import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  //This component will be reevaluated by React whenever the context changes
  const cartCtx = useContext(CartContext)
  
  
  const cartLength = cartCtx.items.reduce((prev, item) => {
    return prev + item.amount;
  }, 0)
  
  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartLength}</span>
    </button>
  );
};

export default HeaderCartButton;
