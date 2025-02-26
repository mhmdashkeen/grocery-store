import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase-config";
import { collection, addDoc } from "@firebase/firestore";

const initialState = [];

const orderRef = collection(db, "orders");

export const updateUserWithCart = createAsyncThunk(
    "products/updateUserCart",
    async (data) => {
        const user = JSON.parse(sessionStorage.getItem('userData'));
        console.log("DATA", data, "USER", user.uid);
        await addDoc(orderRef, {...data, uid: user.uid});
    }
)

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
            if(existingProduct){
                return state.map((p) => p.id === action.payload.id ? { ...p, quantity: p.quantity + 1} : p);
            }
            return [...state, { ...action.payload, quantity: 1}];
        },
        updateCart: (state, action) => {
            const cartList = JSON.parse(localStorage.getItem("carts"));
            const indexCart = cartList.findIndex(cart => cart.id === action.payload.id);
            cartList.splice(indexCart, 1, action.payload);
            localStorage.setItem("carts", JSON.stringify(cartList));
            state.splice(indexCart, 1, action.payload);
        },
        removeCart: (state, action) => {
            const cartList = JSON.parse(localStorage.getItem("carts"));
            const indexCart = cartList.findIndex(cart => cart.id === action.payload);
            cartList.splice(indexCart, 1);
            localStorage.setItem("carts", JSON.stringify(cartList));
            state.splice(indexCart, 1);
        }
    }
})

export const { clearCart, addtocart, removeCart, updateCart, getCart } = cartSlice.actions;

export default cartSlice.reducer;
