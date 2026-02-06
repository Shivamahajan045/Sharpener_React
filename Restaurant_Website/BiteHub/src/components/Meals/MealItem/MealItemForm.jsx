import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useContext } from "react";
import CartContext from "../../../store/cart-context";
const MealItemForm = (props) => {
  const cartCtx = useContext(CartContext);

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredAmount = document.getElementById(
      "amount_" + props.item.id,
    ).value;
    cartCtx.addItem({
      id: props.item.id,
      name: props.item.name,
      price: props.item.price,
      quantity: enteredAmount,
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        label="Amount"
        input={{
          id: "amount_" + props.item.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />

      <button>+Add</button>
    </form>
  );
};

export default MealItemForm;
