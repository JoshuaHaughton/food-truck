import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from './Checkout'

const Cart = (props) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const cartCtx = useContext(CartContext);

  //Total price in cart
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  //True if cart isn't empty
  const hasItems = cartCtx.items.length > 0;

  const minusCartItem = (id) => {
    cartCtx.minusItem(id);
  };

  const addCartItem = (item) => {
    cartCtx.addItem({...item, amount: 1})
  };

  const removeCartItem = (id) => {
    cartCtx.removeItem(id)
  };

  const orderHandler = event => {
    setIsCheckingOut(true)
  }

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onMinus={minusCartItem.bind(null, item.id)}
          onAdd={addCartItem.bind(null, item)}
          onRemove={removeCartItem.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const modalActions = <div className={classes.actions}>
  <button className={classes["button--alt"]} onClick={props.closeCart}>
    Close
  </button>
  {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
</div>

  return (
    <Modal closeCart={props.closeCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckingOut && <Checkout closeCart={props.closeCart}/>}
      {!isCheckingOut && modalActions}
    </Modal>
  );
};

export default Cart;
