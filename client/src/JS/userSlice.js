import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Register
export const userRegister = createAsyncThunk("user/register", async (user, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/register", user);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Login
export const userLogin = createAsyncThunk("user/login", async (user, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/login", user);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Get Current User
export const userCurrent = createAsyncThunk("user/current", async (_, { rejectWithValue }) => {
  try {
    const opts = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const response = await axios.get("https://pastry-jyi6.vercel.app/api/auth/me", opts);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const initialState = {
  user: null,
  status: null,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(userRegister.pending, (state) => { state.status = "pending"; })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.payload;
      })
      // Login
      .addCase(userLogin.pending, (state) => { state.status = "pending"; })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.payload;
      })
      // Current User
      .addCase(userCurrent.pending, (state) => { state.status = "pending"; })
      .addCase(userCurrent.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload.user;
      })
      .addCase(userCurrent.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;