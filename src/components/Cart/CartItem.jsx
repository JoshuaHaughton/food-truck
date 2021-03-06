import React from 'react';
import classes from "./CartItem.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
          <button onClick={props.onRemove} id={classes.removeButton}>
            <FontAwesomeIcon icon="fa-solid fa-trash-can" className={classes.remove} />
          </button>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onMinus}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
