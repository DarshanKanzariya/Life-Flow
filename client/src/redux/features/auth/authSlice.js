/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "./authActions";

const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;

const initialState = {
  user: null,
  token,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userLogin.fulfilled, (state, payload) => {
      state.loading = false;
      state.user = payload.user;
      state.token = payload.token;
    });
    builder.addCase(userLogin.rejected, (state, payload) => {
      state.loading = false;
      state.error = payload;
    });
  },
});
export default authSlice;
