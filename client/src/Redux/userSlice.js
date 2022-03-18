import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";



// <-------Login ------->

export const login = createAsyncThunk("users/login", async (user, thunkAPI) => {
  try {
    const res = await axios.post("/users/login", user, {
      withCredentials: true,
    });
    console.log(res.data);
    if (res.status === 200) {
      localStorage.setItem("username", res.data.data.user?.name);
      return res?.data?.data;
    } else {
      return thunkAPI.rejectWithValue(res.status);

    }
  } catch (e) {
    console.log('hazem error2')
    return thunkAPI.rejectWithValue(e);
    

  }
});


// <-------Signup ------->

export const signup = createAsyncThunk(
  "users/signup",
  async (user, thunkAPI) => {
    try {
      const res = await axios.post("/users/signup", user, {
        withCredentials: true,
      });
      console.log(res);
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

// <---------State---------->

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user:{},
    accessToken:"",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.deleteName("username");
    },
    getNewToken:(state, action)=>{
      state.accessToken= action.payload;
    }
  },
  extraReducers: {
    [login.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.user = payload.user;
      state.accessToken=payload.accessToken;
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
    state.email = payload.newUser;
    state.accessToken= payload.accessToken;
  },
  [signup.pending]: (state) => {
    state.isFetching = true;
  },
  [signup.rejected]: (state, { payload }) => {
    state.isFetching = false;
    state.isError = true;
  },
});
export const{getNewToken}= userSlice.actions;
export const userSelector = (state) => state.user;
