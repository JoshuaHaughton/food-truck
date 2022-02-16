import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [orderError, setOrderError] = useState(false);
  const cartCtx = useContext(CartContext);

  //Total price in cart
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  //True if cart isn't empty
  const hasItems = cartCtx.items.length > 0;

  const minusCartItem = (id) => {
    cartCtx.minusItem(id);
  };

  const addCartItem = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const removeCartItem = (id) => {
    cartCtx.removeItem(id);
  };

  const orderHandler = (event) => {
    setIsCheckingOut(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    try {

    const response = await fetch(
      "https://react-http-41b17-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      },
    );

    console.log(response);
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    // Show loading long enough so the user sees that the screen is loading and not just being jumpy after submission
    setTimeout(() => {
      setIsSubmitting(false);
    }, 300)

    setDidSubmit(true);
    cartCtx.clearCart();

    } catch (error) {
      console.log(error.message);
      setOrderError(error.message)
      setIsSubmitting(false);
    }

  };

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

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.closeCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckingOut && (
        <Checkout onConfirm={submitOrderHandler} closeCart={props.closeCart} />
      )}
      {!isCheckingOut && modalActions}
    </>
  );

  const didSubmitModalContent = <><p>Successfully sent the order to the firebase backend! This is a portfolio project so I can't actually send anything to you 😅
    <br/>
    <br/>
    Have a great day though!</p>
    <div className={classes.actions}>
      <button className={classes.button} onClick={props.closeCart}>
        Close
      </button>
    </div>
    </>

  const isSubmittingModalContent = <p>Sending order data...</p>

  return (
    <Modal closeCart={props.closeCart}>
      {orderError && <p className={classes.errorText}>{orderError}</p>}
      {(!isSubmitting && !didSubmit && !orderError) && cartModalContent}
      {(isSubmitting && !orderError) && isSubmittingModalContent}
      {(didSubmit && !isSubmitting && !orderError) && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
