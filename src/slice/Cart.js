import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase-config";
import { collection, addDoc } from "@firebase/firestore";

const initialState = [];

const orderRef = collection(db, "orders");

export const updateUserWithCart = createAsyncThunk(
  "products/updateUserCart",
  async (data) => {
    const user = JSON.parse(sessionStorage.getItem("userData"));
    await addDoc(orderRef, { ...data, uid: user.uid });
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: () => {
      localStorage.removeItem("carts");
      return [];
    },
    getCart: () => {
      const cartList = JSON.parse(localStorage.getItem("carts"));
      return cartList ? cartList : [];
    },
    addtocart: (state, action) => {
      const existingProduct = state.find((p) => p.id === action.payload.id);
      if (existingProduct) {
        return state.map((p) =>
          p.id === action.payload.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    },
    decreaseCartQuantity: (state, action) => {
      return state.map((p) =>
        p.id === action.payload.id ? { ...p, quantity: p.quantity - 1 } : p
      );
    },
    decreaseGram: (state, action) => {
      return state.map((p) =>
        p.id === action.payload.id ? { ...p, quantity: p.quantity - 0.25 } : p
      );
    },
    increaseGram: (state, action) => {
      const existingProduct = state.find((p) => p.id === action.payload.id);
      if (existingProduct) {
        return state.map((p) =>
          p.id === action.payload.id ? { ...p, quantity: p.quantity + 0.25 } : p
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    },
    updateCartGram: (state, action) => {
      const indexCart = state.findIndex(
        (cart) => cart.id === action.payload.id
      );
      state[indexCart].weight = action.payload.updatedWeight;
      console.log("Action", action.payload);
      console.log("State", indexCart);
      return state;
    },
    removeCart: (state, action) => {
      const indexCart = state.findIndex((cart) => cart.id === action.payload);
      state.splice(indexCart, 1);
    }
  }
});

export const {
  clearCart,
  addtocart,
  removeCart,
  decreaseCartQuantity,
  decreaseGram,
  increaseGram,
  getCart,
  updateCartGram
} = cartSlice.actions;

export default cartSlice.reducer;
