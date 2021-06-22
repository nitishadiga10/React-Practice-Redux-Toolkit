import "./App.css";
import InputForm from "./InputForm";
import Users from "./Users";
import ErrorModal from "./ErrorModal";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userAction } from "./store/Store";

let isItFirstTime = true;

function App() {
  console.log(isItFirstTime);

  const error = useSelector((state) => state.error.error);
  const userList = useSelector((state) => state.user.userList);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const getData = async () => {
        const response = await fetch(
          "https://react-practice-project-facea-default-rtdb.asia-southeast1.firebasedatabase.app/userList.json"
        );
        const data = await response.json();
        if (data) {
          dispatch(userAction.addUser(data));
          console.log("recieved from database" + JSON.stringify(data));
        }
      };
      getData();
    } catch (e) {
      console.log(e);
    }
  }, [dispatch]);

  useEffect(() => {
    try {
      const sendData = async () => {
        const response = await fetch(
          "https://react-practice-project-facea-default-rtdb.asia-southeast1.firebasedatabase.app/userList.json",
          { method: "PUT", body: JSON.stringify(userList) }
        );
        const data = await response.json();
        console.log("sent to database" + JSON.stringify(userList));
      };

      if (isItFirstTime) {
        isItFirstTime = false;
        return;
      }
      sendData();
    } catch (e) {
      console.log(e);
    }
  }, [userList]);

  return (
    <div>
      {error && <ErrorModal></ErrorModal>}
      <InputForm></InputForm>
      <Users></Users>
    </div>
  );
}

export default App;
