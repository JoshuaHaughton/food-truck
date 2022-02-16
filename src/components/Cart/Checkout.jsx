import React, { useState } from "react";
import useInput from "../hooks/use-input";
import classes from "./Checkout.module.css";
const Checkout = (props) => {

  const [orderError, setOrderError] = useState(false);


  const {
    value: enteredName,
    hasError: nameInputHasError,
    isValid: enteredNameIsValid,
    reset: resetNameInput,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    submitHandler: nameSubmitHandler
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredCity,
    hasError: cityInputHasError,
    isValid: enteredCityIsValid,
    reset: resetCityInput,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    submitHandler: citySubmitHandler
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredStreet,
    hasError: streetInputHasError,
    isValid: enteredStreetIsValid,
    reset: resetStreetInput,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    submitHandler: streetSubmitHandler
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredPostal,
    hasError: postalInputHasError,
    isValid: enteredPostalIsValid,
    reset: resetPostalInput,
    valueChangeHandler: postalChangeHandler,
    inputBlurHandler: postalBlurHandler,
    submitHandler: postalSubmitHandler
  } = useInput((value) => value.trim() !== '' && value.trim().length <= 7 && value.trim().length >= 5);

  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredStreetIsValid &&
    enteredPostalIsValid &&
    enteredCityIsValid
  ) {
    formIsValid = true;
  }

  const confirmHandler = async (event) => {
    event.preventDefault();

    // Sets all input fields to touched on submission so an error comes up if it is invalid
    nameSubmitHandler()
    citySubmitHandler()
    streetSubmitHandler()
    postalSubmitHandler()


    //If a field is invalid
    if (
      !enteredNameIsValid ||
      !enteredStreetIsValid ||
      !enteredPostalIsValid ||
      !enteredCityIsValid
    ) {
      return;
    }

    //If everything works

    try {
      const response = props.onConfirm({
        name: enteredName,
        city: enteredCity,
        street: enteredStreet,
        postal: enteredPostal
      });

      if (!response.ok) {
        throw new Error('Something went wrong when submitting your order! Please try again later');
      }
      //If error isn't thrown and shown to user, close cart
      props.closeCart();

      //Cleanup if past order wasn't submitted successfully
      setOrderError(false)
      
    } catch (err) {
      console.log(err);
      setOrderError(err.message)
    }



    // resetNameInput();
    // resetCityInput();
    // resetStreetInput();
    // resetPostalInput();
  };

  const nameInputClasses = !nameInputHasError
    ? classes.control
    : `${classes.control} ${classes.invalid}`;

  const cityInputClasses = !cityInputHasError
    ? classes.control
    : `${classes.control} ${classes.invalid}`;

  const streetInputClasses = !streetInputHasError
    ? classes.control
    : `${classes.control} ${classes.invalid}`;

  const postalInputClasses = !postalInputHasError
    ? classes.control
    : `${classes.control} ${classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && <p className={classes.errorText}>Name can't be empty</p>}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" 
        onChange={cityChangeHandler}
        onBlur={cityBlurHandler}
        value={enteredCity}/>
        {cityInputHasError && <p className={classes.errorText}>City can't be empty</p>}
      </div>
      <div className={streetInputClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" 
        onChange={streetChangeHandler}
        onBlur={streetBlurHandler}
        value={enteredStreet}/>
        {streetInputHasError && <p className={classes.errorText}>Street can't be empty</p>}
      </div>
      <div className={postalInputClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" 
        onChange={postalChangeHandler}
        onBlur={postalBlurHandler}
        value={enteredPostal}/>
        {postalInputHasError && <p className={classes.errorText}>Please enter a valid Postal Code</p>}
      </div>
      {orderError && <p className={classes.errorText}>{orderError}</p>}
      <div className={classes.actions}>
        <button type="button" onClick={props.closeCart}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
