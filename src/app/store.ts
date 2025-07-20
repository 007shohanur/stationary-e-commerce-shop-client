import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productsReducer from '../features/products/productsSlice';
import { productsApi } from '../features/products/productsApi'
import ordersReducer from '../features/orders/orderSlice';
import { orderApi } from '../features/orders/orderApi';
import { authApi } from '../features/auth/authApi';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from '@/features/cart/cartSlice';

const persistConfig = {
  key: 'auth',
  storage, // default is localStorage
  whitelist: ['user', 'token', 'isAuthenticated'], // These parts of the state will be persisted
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const persistCartConfig = {
  key: 'cart', // Key for cart state persistence
  storage, // Use localStorage
};

const persistedCartReducer = persistReducer(persistCartConfig, cartReducer);


export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    products: productsReducer,
    orders: ordersReducer,
    cart: persistedCartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, orderApi.middleware, productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
