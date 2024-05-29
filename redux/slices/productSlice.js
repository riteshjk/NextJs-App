import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://65d5af42f6967ba8e3bc35a3.mockapi.io/blogs/v1/articles';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (page = 1) => {
    const response = await axios.get(`${API_URL}?page=${page}&limit=10`);
    return { data: response.data, page };
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: null,
    page: 1,
    hasMore: true,
    loadingMore: false, 
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = state.items.length === 0 ? 'loading' : state.status;
        state.loadingMore = state.items.length > 0; 
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (action.payload.data.length < 10) {
          state.hasMore = false;
        }
        state.items = [...state.items, ...action.payload.data];
        state.status = 'succeeded';
        state.page = action.payload.page + 1;
        state.loadingMore = false; 
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
        state.loadingMore = false; 
      });
  },
});

export const { addProduct, updateProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
