import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Order } from '../../types/types';
import { RootState } from '@/app/store';

interface FetchOrdersResponse {
  message: string;
  success: boolean;
  data: Order[]; // The 'data' field contains the array of orders
}

interface FetchUserOrdersResponse {
  message: string;
  success: boolean;
  data: Order[]; // The 'data' field contains the array of orders specific to a user
}

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
      baseUrl: `https://stationary-shop-api-server.vercel.app/api`,
      prepareHeaders: (headers, { getState }) => {
        // Access the token from Redux state
        const token = (getState() as RootState).auth.token;
  
        if (token) {
          headers.set('Authorization', `Bearer ${token}`); // Add the Authorization header
        }
  
        headers.set('Content-Type', 'application/json'); // Set Content-Type header
        return headers;
      },
    }),
  endpoints: (builder) => ({
    fetchOrders: builder.query<FetchOrdersResponse, void>({
      query: () => '/orders',
    }),
    placeOrder: builder.mutation<Order, Omit<Order, '_id'>>({
      query: (order) => ({
        url: '/orders',
        method: 'POST',
        body: order,
      }),
    }),
    orderStatus: builder.mutation<Order, Partial<Order>>({
      query: (order) => ({
        url: '/orders/order-status',
        method: 'PUT',
        body: order,
      }),
    }),
    getOrderRevenue: builder.query<number, void>({
      query: () => '/orders/revenue',
    }),
    // New endpoint to fetch user-specific orders
    fetchUserOrders: builder.query<FetchUserOrdersResponse, string>({
      query: (email) => ({
        url: '/orders/user-orders',
        method: 'GET',
        params: { email }, // Passing the email as a query parameter
      }),
    }),
  }),
});

export const { useFetchOrdersQuery, usePlaceOrderMutation, useGetOrderRevenueQuery, useFetchUserOrdersQuery, useOrderStatusMutation } = orderApi;
