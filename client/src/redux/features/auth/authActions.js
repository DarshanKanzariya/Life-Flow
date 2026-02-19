import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import { toast } from "react-toastify";

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/login", { role, email, password });
      //store token
      if (data.success) {
        localStorage.setItem("token", data.token);
        toast.success(data.message);
      }
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

//register
export const userRegister = createAsyncThunk(
  "auth/register",
  async (
    { role, email, password, name, hospitalName, donorName, phone },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await API.post("/auth/register", {
        role,
        email,
        password,
        name,
        hospitalName,
        donorName,
        phone,
      });
      if (data.success) {
        toast.success(data.message);
        window.location.replace("/login");
      }
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

//current user
export const currentUser = createAsyncThunk(
  "auth/currentUser",
  async ({ rejectWithValue }) => {
    try {      const res = await API.get("/auth/current-user");
      if (res?.data){
        return res?.data;
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

//logout user
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
  toast.success("Logged out successfully");
  window.location.replace("/login");
});