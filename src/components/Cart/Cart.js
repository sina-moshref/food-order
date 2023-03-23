import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import CartPage1 from "./CartPage1";
import CartPage2 from "./CartPage2";
import axios from "axios";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [NextPage, setNextPage] = useState(false);
  const [formChanger, setFormChanger] = useState(false);

  const totalAmount = `$ ${cartCtx.totalAmount.toFixed(2)}`;
  const hasItem = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <li>
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        </li>
      ))}
    </ul>
  );
  const submitHandler = (
    inp1Value,
    setInp1Value,
    inp2Value,
    setInp2Value,
    formIsValid
  ) => {
    if (!formIsValid && formChanger) setFormChanger(false);
    if (!formChanger) return;

    let crtData = { ...cartCtx, userName: inp1Value, userAddress: inp2Value };

    axios
      .post("https://jsonplaceholder.typicode.com/posts", crtData)
      .then((response) => console.log(response));
    setInp1Value("");
    setInp2Value("");
    setFormChanger(false);
  };
  const orderClickHandler = (e) => {
    if (e.target.innerHTML === "Order") {
      e.target.type = "submit";
      setFormChanger(!formChanger);
      return;
    }
    e.target.type = "button";
    setNextPage(!NextPage);
  };

  return (
    <Modal onClose={props.onClose}>
      {!NextPage && <CartPage1 items={cartItems} totalAmount={totalAmount} />}
      {NextPage && (
        <CartPage2 onChng={formChanger} onFormSubmit={submitHandler} />
      )}
      <div className={classes.actions}>
        {NextPage && <button onClick={orderClickHandler}>Back</button>}
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItem && (
          <button onClick={orderClickHandler} className={classes.button}>
            {NextPage ? "Order" : "Next"}
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
