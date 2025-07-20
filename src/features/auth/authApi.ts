import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../../types/types';
import { RootState } from '@/app/store';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://stationary-shop-api-server.vercel.app/api/auth`,
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
    login: builder.mutation<{ user: User; token: string }, { email: string; password: string }>({
      query: (credentials) => ({
        url: '/login',  // Login endpoint matches the backend route
        method: 'POST',
        body: credentials,
      }),
    }),
    registerUser: builder.mutation<{ user: User; token: string }, { name: string; email: string; password: string }>({
      query: (newUser) => ({
        url: '/register',  // Register endpoint matches the backend route
        method: 'POST',
        body: newUser,
      }),
    }),
    updateProfile: builder.mutation<User, { name: string; email: string; phone: string; address: string; profilePic: string }>({
      query: (profileData) => ({
        url: '/updateProfile',  // Update profile route
        method: 'POST',
        body: profileData,
      }),
    }),
    getAllUsers: builder.query<{users: User[]}, void>({
      query: () => ({
        url: '/users',  // Get all users route
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterUserMutation,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
} = authApi;
