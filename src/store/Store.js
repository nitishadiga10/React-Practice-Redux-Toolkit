import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialErrorState = { error: null };
const initialUserState = { userList: [] };

const userSlice = createSlice({
  name: "User",
  initialState: initialUserState,
  reducers: {
    addUser(state, action) {
      state.userList = [...state.userList, ...action.payload];
      console.log("user store" + JSON.stringify(state.userList));
    },
    deleteUser(state, action) {
      state.userList = state.userList.filter(
        (user) => user.key !== action.payload
      );
    },
  },
});

const errorSlice = createSlice({
  name: "Error",
  initialState: initialErrorState,
  reducers: {
    addError(state, action) {
      state.error = action.payload;
    },
    cancel(state) {
      state.error = null;
    },
  },
});

const store = configureStore({
  reducer: { user: userSlice.reducer, error: errorSlice.reducer },
});

// const store = configureStore({
//   reducer: userSlice.reducer,
// });

// const store = createStore(userSlice.reducer);

export const userAction = userSlice.actions;
export const errorAction = errorSlice.actions;

export default store;
