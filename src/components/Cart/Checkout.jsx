import React from 'react'
import classes from './Checkout.module.css'
const Checkout = (props) => {
  const confirmHandler = (event) => {
    event.preventDefault();
  }
  return (
    <form>
      <div className={classes.control} onSubmit={confirmHandler}>
        <label htmlFor="name">Name</label>
        <input type="text" id='name'/>
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Stret</label>
        <input type="text" id='street'/>
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id='postal'/>
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id='city'/>
      </div>
      <button type="button" onClick={props.closeCart}>Cancel</button>
      <button>Confirm</button>
    </form>
  )
}

export default Checkout