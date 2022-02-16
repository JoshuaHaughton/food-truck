import React, { useRef } from "react";
import useInput from "../hooks/use-input";
import classes from "./Checkout.module.css";
const Checkout = (props) => {

  

  const {
    value: enteredName,
    hasError: nameInputHasError,
    isValid: enteredNameIsValid,
    reset: resetNameInput,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredCity,
    hasError: cityInputHasError,
    isValid: enteredCityIsValid,
    reset: resetCityInput,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredStreet,
    hasError: streetInputHasError,
    isValid: enteredStreetIsValid,
    reset: resetStreetInput,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredPostal,
    hasError: postalInputHasError,
    isValid: enteredPostalIsValid,
    reset: resetPostalInput,
    valueChangeHandler: postalChangeHandler,
    inputBlurHandler: postalBlurHandler,
  } = useInput((value) => value.trim() !== '' && value.trim().length <= 7);

  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredStreetIsValid &&
    enteredPostalIsValid &&
    enteredCityIsValid
  ) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();


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
    resetNameInput();
    resetCityInput();
    resetStreetInput();
    resetPostalInput();
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
