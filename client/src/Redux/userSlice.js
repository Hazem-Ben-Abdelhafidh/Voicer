import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

export const login = createAsyncThunk("users/login", async (user, thunkAPI) => {
  try {
    const res = await axios.post("/users/login", user, {
      withCredentials: true,
    });
    if (res.status === 201) {
      localStorage.setItem("userName", user.name);
      console.log(res);
      return res.data.data.user;
    } else {
      return thunkAPI.rejectWithValue(res.status);
    }
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const signup = createAsyncThunk(
  "users/signup",
  async (user, thunkAPI) => {
    try {
      const res = await axios.post("/users/signup", user, {
        withCredentials: true,
      });
      if (res.status === 201) {
        localStorage.setItem("userName", user.name);
        console.log(res);
        return res.data.data.user;
      } else {
        return thunkAPI.rejectWithValue(res.status);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: localStorage.getItem("userName")
      ? localStorage.getItem("userName")
      : "",
    email: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    logout: (state) => {
      state.name = "";
      localStorage.deleteName("userName");
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.email = payload.email;
      state.username = localStorage.getItem("userName");
    },
    [login.pending]: (state) => {
      state.isFetching = true;
    },
    [login.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
    },
  },
  [signup.fulfilled]: (state, { payload }) => {
    state.isFetching = false;
    state.isSuccess = true;
    state.email = payload.email;
    state.username = localStorage.getItem("userName");
  },
  [signup.pending]: (state) => {
    state.isFetching = true;
  },
  [signup.rejected]: (state, { payload }) => {
    state.isFetching = false;
    state.isError = true;
  },
});

export const userSelector = (state) => state.user;
