import React from 'react';
import classes from './MealSummary.module.css';

const MealsSummary = () => {

  return (
    <section className={classes.summary}>
      <h2>All your favourite Food Trucks on demand!</h2>
      <p>
        Choose your favorite meals from our broad selection of food truck delicacies and enjoy a delicious lunch or dinner at home.
      </p>
      <p>
        All our meals are cooked with high-quality, organic ingredients, fresh to order!
      </p>
    </section>
  )
}

export default MealsSummary;
