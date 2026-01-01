import React from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import "./AddUser.css";
import { useState } from "react";

const AddUser = () => {
  const [userData, setUserData] = useState({ userName: "", age: "" });

  const addUserHandler = (event) => {
    event.preventDefault();
    console.log(userData.userName, userData.age);

    setUserData({ userName: "", age: "" });
  };

  return (
    <Card className="input">
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="userName"
          type="text"
          value={userData.userName}
          onChange={(e) =>
            setUserData({ ...userData, [e.target.name]: e.target.value })
          }
        />
        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          name="age"
          onChange={(e) =>
            setUserData({ ...userData, [e.target.name]: e.target.value })
          }
          value={userData.age}
        />
        <Button type="submit">Add User</Button>
      </form>
    </Card>
  );
};

export default AddUser;
