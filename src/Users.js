import classes from "./Users.module.css";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "./store/Store";

const Users = () => {
  const userList = useSelector((state) => state.user.userList);
  const dispatch = useDispatch();
  const deleteUserHandler = (event) => {
    dispatch(userAction.deleteUser(event.target.id));
  };

  return (
    <ul className={userList.length ? classes.users : null}>
      {userList.map((user) => (
        <li key={user.key} id={user.key} onClick={deleteUserHandler}>
          {user.name} ({user.age} years old)
        </li>
      ))}
    </ul>
  );
};

export default Users;
