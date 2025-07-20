import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../types/types';

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
  userEmail: string | null; 
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
  userEmail: null, // Default email is null
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    fetchOrdersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchOrdersSuccess(state, action: PayloadAction<Order[]>) {
      state.loading = false;
      state.orders = action.payload;
    },
    fetchOrdersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.push(action.payload);
    },
    updateOrder(state, action: PayloadAction<Order>) {
      const index = state.orders.findIndex(order => order._id === action.payload._id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    },
    deleteOrder(state, action: PayloadAction<string>) {
      state.orders = state.orders.filter(order => order._id !== action.payload);
    }
  },
});

export const {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  addOrder,
  updateOrder,
  deleteOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
