import React, { useState, useEffect } from "react";
import classes from "./UserDataForm.module.css";

const CartPage2 = (props) => {
  const [inp1Value, setInp1Value] = useState("");
  const [inp1Touched, setInp1Touched] = useState(false);
  const [inp2Value, setInp2Value] = useState("");
  const [inp2Touched, setInp2Touched] = useState(false);

  const nameInputIsValid = inp1Value.trim() !== "";
  const entedNameIsInvalid = !nameInputIsValid && inp1Touched;

  const addressInputIsValid = inp2Value.trim() !== "";
  const enteredAddressIsInvalid = !addressInputIsValid && inp2Touched;

  let formIsValid2 = entedNameIsInvalid || enteredAddressIsInvalid;

  let formIsValid = false;

  if (nameInputIsValid && addressInputIsValid) {
    formIsValid = true;
  }

  useEffect(() => {
    if (!formIsValid && props.onChng) {
      setInp1Touched(true);
      setInp2Touched(true);
      return;
    }

    props.onFormSubmit(
      inp1Value,
      setInp1Value,
      inp2Value,
      setInp2Value,
      formIsValid
    );
    setInp1Touched(false);
    setInp2Touched(false);
  }, [props.onChng]);
  const changeNameinputHandler = (e) => {
    setInp1Value(e.target.value);
  };

  const blurNameInputHandler = () => {
    setInp1Touched(true);
  };

  const changeAddressinputHandler = (e) => {
    setInp2Value(e.target.value);
  };

  const blurAddressInputHandler = () => {
    setInp2Touched(true);
  };

  return (
    <div>
      <form className={classes.mb}>
        <div>
          <label className={classes.label} htmlFor="nameInput">
            Name
          </label>
          <input
            onChange={changeNameinputHandler}
            onBlur={blurNameInputHandler}
            value={inp1Value}
            className={classes.input}
            type="text"
            placeholder="inter your name"
            id="nameInput"
          />
        </div>
        <div>
          <label className={classes.label} htmlFor="addressInput">
            address
          </label>
          <input
            onChange={changeAddressinputHandler}
            onBlur={blurAddressInputHandler}
            value={inp2Value}
            className={classes.input}
            type="text"
            placeholder="inter your address"
            id="addressInput"
          />
        </div>
        {formIsValid2 && (
          <h3 className={classes.error}>form data in not Valid</h3>
        )}
      </form>
    </div>
  );
};

export default CartPage2;
