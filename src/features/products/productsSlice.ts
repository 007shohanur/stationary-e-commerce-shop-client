import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/types';
import { productsApi } from './productsApi';

interface ProductsState {
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  searchQuery: string; // Add search query state
}

const initialState: ProductsState = {
  products: [],
  status: 'idle',
  error: null,
  searchQuery: '', // Initialize the search query state
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload; // Update search query state
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        productsApi.endpoints.getProducts.matchPending,
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        productsApi.endpoints.getProducts.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded';
          state.products = action.payload.data;
        }
      )
      .addMatcher(
        productsApi.endpoints.getProducts.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message ?? 'Failed to load products';
        }
      );
  },
});

export const { setProducts, setSearchQuery } = productsSlice.actions;
export default productsSlice.reducer;
