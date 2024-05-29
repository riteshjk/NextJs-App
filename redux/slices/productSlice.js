import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: null,
    page: 1,
  },
  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex(product => product.id === action.payload.id);
      state.items[index] = action.payload;
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(product => product.id !== action.payload);
    },
  },
  // extraReducers: {
  //   [fetchProducts.pending]: (state) => {
  //     state.status = 'loading';
  //   },
  //   [fetchProducts.fulfilled]: (state, action) => {
  //     state.items = [...state.items, ...action.payload];
  //     state.status = 'succeeded';
  //     state.page += 1;
  //   },
  //   [fetchProducts.rejected]: (state) => {
  //     state.status = 'failed';
  //   },
  // },
});

export const { addProduct, updateProduct, deleteProduct } = productSlice.actions;

export default productSlice.reducer;
