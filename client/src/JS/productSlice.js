import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Get All Products
export const getProducts = createAsyncThunk("product/get", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("http://localhost:5000/api/product");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const initialState = {
  productList: [],
  status: null,
  error: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.productList = action.payload.products || action.payload; 
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;