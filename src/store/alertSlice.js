
import { createSlice } from "@reduxjs/toolkit";

const initialState = { show: false, severity: "info", message: "" };

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      console.log(action);
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});
export const { setAlert } = alertSlice.actions;

export default alertSlice.reducer;
