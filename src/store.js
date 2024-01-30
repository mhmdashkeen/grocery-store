import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slice/Product';


export const store = configureStore({
  reducer: {
      products: productsReducer
  },
})