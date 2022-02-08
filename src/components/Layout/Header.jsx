import React from "react";
import classes from "./Header.module.css";
import Hero from "../../assets/Food-Truck-Hero.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = () => {
  return (
    <>
      <header className={classes.header}>
        <h1>Food Truck</h1>
        <HeaderCartButton />
      </header>
      <div className={classes['main-image']}>
        <img src={Hero} alt="Buffet of Delicious Food on a table" />
      </div>
    </>
  );
};

export default Header;
