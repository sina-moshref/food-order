import React from "react";
import classes from "./Cart.module.css";

const CartPage1 = (props) => {
  return (
    <div>
      {props.items}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{props.totalAmount}</span>
      </div>
    </div>
  );
};

export default CartPage1;
