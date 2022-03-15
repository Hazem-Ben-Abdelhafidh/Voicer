import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

export const login = createAsyncThunk("users/login", async (user, thunkAPI) => {
  try {
    const res = await axios.post("/users/login", user, {
      withCredentials: true,
    });
    if (res.status === 201) {
      localStorage.setItem("username", res.data.data.user.name);
      console.log(res.data.data.user);
      return res.data;
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
        localStorage.setItem("username", user.name);
        return res.data;
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
    username: localStorage.getItem("username")
      ? localStorage.getItem("username")
      : "",
    email: "",
    accessToken:"",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    logout: (state) => {
      state.name = "";
      localStorage.deleteName("username");
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.email = payload.data.user.email;
      state.accessToken=payload.accessToken;
      state.username = localStorage.getItem("username");
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
    state.email = payload.data.newUser.email;
    state.accessToken= payload.accessToken;
    state.username = localStorage.getItem("username");
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
