import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    isLoading: false,
    token,
  },
  reducers: {
    addUser: (state, action) => {
      return { ...state, userInfo: action.payload, isLoading: false };
    },
    removeUser: (state) => {
      return { ...state, userInfo: null };
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
