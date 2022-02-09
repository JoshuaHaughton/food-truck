import React from 'react'
import classes from './Cart.module.css'


const Cart = (props) => {
  const cartItems = <ul>{[{id: 'c1', name: "sushi", amount: 2, price: 12.99}].map(item => <li>{item.name}</li>)}</ul>
  return (
    <div>
      {cartItems}
      <div>
        <span className={classes.total}>Total Amount</span>
        <span>35.62</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']}>Close</button>
        <button className={classes.button}>Order</button>
      </div>
    </div>
  )
}

export default Cart
