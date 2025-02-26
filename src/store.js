import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slice/Product';
import cartReducer from './slice/Cart';
import userReducer from './slice/User';
import orderReducer from './slice/Order';
import categoryReducer from './slice/Category';
import snackbarReducer from './slice/Snackbar';


export const store = configureStore({
  reducer: {
      products: productsReducer,
      cart: cartReducer,
      loggedInUser: userReducer,
      orders: orderReducer,
      category: categoryReducer,
      snackbar: snackbarReducer
  },
})