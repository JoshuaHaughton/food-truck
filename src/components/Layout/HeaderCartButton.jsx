import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  //This component will be reevaluated by React whenever the context changes
  const cartCtx = useContext(CartContext)
  const [btnAnimation, setBtnAnimation] = useState(false);
  
  const { items } = cartCtx;
  
  const cartLength = items.reduce((prev, item) => {
    return prev + item.amount;
  }, 0)


  const btnClasses = `${classes.button} ${btnAnimation ? classes.bump : ''}`

  useEffect(() => {
    if (items.length === 0) {
      return
    }
    setBtnAnimation(true)

    const timer = setTimeout(() => {
      setBtnAnimation(false)
    }, 300);

    //Cleanup timer so it isn't set again before the old timer expires
    return () => {
      clearTimeout(timer);
    }

  }, [items])
  
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartLength}</span>
    </button>
  );
};

export default HeaderCartButton;
