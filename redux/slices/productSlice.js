import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://65d5af42f6967ba8e3bc35a3.mockapi.io/blogs/v1/articles';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (page) => {
  console.log(`Fetching products for page: ${page}`);
  const response = await axios.get(`${API_URL}?page=${page}&limit=5`);
  console.log('Response data:', response.data);
  return { data: response.data, page };
});

export const updateProductAsync = createAsyncThunk('products/updateProduct', async (product) => {
  const response = await axios.put(`${API_URL}/${product.id}`, product);
  return response.data; 
});

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
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(product => product.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        console.log('Fetch products pending');
        state.loadingMore = true;
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log('Fetch products fulfilled', action.payload);
        if (action.payload.page === 1) {
          state.items = action.payload.data;
        } else {
          state.items = [...state.items, ...action.payload.data];
        }
        state.status = 'succeeded';
        state.loadingMore = false;
        state.page = action.payload.page;  // Set the page to the current fetched page
        state.hasMore = action.payload.data.length > 0;
      })
      .addCase(fetchProducts.rejected, (state) => {
        console.log('Fetch products rejected');
        state.status = 'failed';
        state.loadingMore = false;
      });
  },
});

export const { addProduct, updateProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
