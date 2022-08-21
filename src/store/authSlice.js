import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const initialState = {
  isAuthenticated: false,
  token: null,
  name: "",
  username: "",
  email: "",
  role: ""
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLogin: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      const decode = jwtDecode(action.payload.token);
      const { username, email, name, role } = decode;

      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        name,
        username,
        email,
        role
      };
    },

    authLogout: (state) => {
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        role: ""
      };
    },
  },
});
export const { authLogin, authLogout } = authSlice.actions;

export default authSlice.reducer;
