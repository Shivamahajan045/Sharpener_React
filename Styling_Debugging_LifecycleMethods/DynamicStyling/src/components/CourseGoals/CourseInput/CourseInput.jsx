// Write your code at relevant places in the code below:

import React, { useState } from "react";

import Button from "../../UI/Button/Button";
import "./CourseInput.css";

const CourseInput = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  const goalInputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (enteredValue.trim().length === 0) {
      setIsValid(false);
      return;
    }
    props.onAddGoal(enteredValue);
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="form-control">
        <label
          htmlFor="goalInput"
          style={{ color: !isValid ? "red" : "black" }}
        >
          Course Goal
        </label>
        <input
          id="goalInput"
          type="text"
          onChange={goalInputChangeHandler}
          style={{
            backgroundColor: !isValid ? "lightpink" : "transparent",
            border: !isValid ? "red" : "1px solid black",
          }}
        />
      </div>
      <Button type="submit">Add Goal</Button>
    </form>
  );
};

export default CourseInput;
