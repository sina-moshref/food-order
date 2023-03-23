import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
// import Meals from "./Meals";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import axios from "axios";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("https://api-generator.retool.com/ahMmjN/meals")
      .then((res) => {
        setMeals(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <section className={classes.meals}>
      <Card>
        {meals ? (
          <ul>
            {meals.map((meal) => {
              return (
                <MealItem
                  key={meal.id}
                  name={meal.fullName}
                  description={meal.col2}
                  price={meal.col1}
                  id={meal.id}
                />
              );
            })}
          </ul>
        ) : (
          ""
        )}
        {loading && <p>loading...</p>}
      </Card>
    </section>
  );
};

export default AvailableMeals;

// {"meals": [
//   {
//     "id": "m1",
//     "name": "Sushi",
//     "description": "Finest fish and veggies",
//     "price": "22.99",
//   },
//   {
//     "id": "m2",
//     "name": "Schnitzel",
//     "description": "A german specialty!",
//     "price": "16.5",
//   },
//   {
//     "id": "m3",
//     "name": "Barbecue Burger",
//     "description": "American, raw, meaty",
//     "price": "12.99",
//   },
//   {
//     "id": "m4",
//     "name": "Green Bowl",
//     "description": "Healthy...and green...",
//     "price": "18.99",
//   }
// ]}
// [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];
