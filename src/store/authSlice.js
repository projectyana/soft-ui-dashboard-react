import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const initialState = { isAuthenticated: false, token: null };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLogin: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      const decode = jwtDecode(action.payload.token);
      const { username, email, name } = decode;

      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        name,
        username,
        email,
      };
    },

    authLogout: (state) => {
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        token: null,
      };
    },
  },
});
export const { authLogin, authLogout } = authSlice.actions;

export default authSlice.reducer;
