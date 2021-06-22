import { useState } from "react";
import Button from "./Button";
import Card from "./Card";
import classes from "./inputForm.module.css";
import { useDispatch } from "react-redux";
import { errorAction, userAction } from "./store/Store";



const InputForm = () => {
  const dispatch = useDispatch();

  const [enteredUserName, setenteredUserName] = useState("");
  const [enteredAge, setenteredAge] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (enteredUserName.trim().length === 0 || enteredAge.trim().length === 0) {
      dispatch(
        errorAction.addError({
          title: "Wrong Name and Age!",
          message: "Enter valid Name and Age",
        })
      );
      return;
    }

    if (+enteredAge < 1) {
      dispatch(
        errorAction.addError({
          title: "Wrong Age!!",
          message: "Enter valid Age",
        })
      );
      return;
    }

    dispatch(
      userAction.addUser([{
        key: Math.random().toString(),
        name: enteredUserName,
        age: enteredAge,
      }])
    );

    setenteredUserName("");
    setenteredAge("");
  };

  const usernameHandler = (event) => {
    setenteredUserName(event.target.value);
  };
  const ageHandler = (event) => {
    setenteredAge(event.target.value);
  };
  return (
    <Card className={classes.input}>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="username">User Name</label>
        <input
          type="text"
          id="username"
          onChange={usernameHandler}
          value={enteredUserName}
          required
        ></input>
        <label htmlFor="age">Age (Years) </label>
        <input
          type="number"
          id="age"
          onChange={ageHandler}
          value={enteredAge}
          required
        ></input>
        <Button type="submit">Add user</Button>
      </form>
    </Card>
  );
};

export default InputForm;
