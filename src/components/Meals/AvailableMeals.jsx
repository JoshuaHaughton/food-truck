import React from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Italian Sausage with the works",
    description:
      "Sausages made from organic, healthily raised pigs that are processed in the most humane ways available.",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Corn on the Cob",
    description:
      "Juicy, mouth-watering Corn on the Cob made same day and picked by your Canadian farmers.",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Double-Decker Grilled Cheese Burger",
    description:
      "2 juicy 6oz patties between 2 grilled cheese sandwhiches instead of buns.",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Soup",
    description: "Mixture of al the organic vegetables we could find... Yum!",
    price: 18.99,
  },
];

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => {
    return <li key={meal.id}>{meal.name}</li>;
  });

  return (
    <section className={classes.meal}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
