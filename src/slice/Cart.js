import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase-config";
import { collection, addDoc } from "@firebase/firestore";

const initialState = [];

const orderRef = collection(db, "orders");

export const updateUserWithCart = createAsyncThunk(
    "products/updateUserCart",
    async (data) => {
        const user = sessionStorage.getItem('token');
        await addDoc(orderRef, {...data, userId: user.id});
    }
)

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            localStorage.removeItem("carts");
            state = [];
        },
        getCart: () => {
            const cartList = JSON.parse(localStorage.getItem("carts"));
            if(cartList){
                return cartList;
            }else{
               return [];
            }
        },
        addtocart: (state, action) => {
            const carts = localStorage.getItem("carts");
            if(carts){
                const cartList = JSON.parse(localStorage.getItem("carts"));
                cartList.push(action.payload);
                state.push(action.payload);
                localStorage.setItem("carts", JSON.stringify(cartList));
            }else{
                const cartArray = [];
                cartArray.push(data);
                state.push(action.payload);
                localStorage.setItem("carts", JSON.stringify(cartArray));
            }
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
