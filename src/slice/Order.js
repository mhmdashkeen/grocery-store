import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase-config";
import { collection, getDocs, where, query } from "@firebase/firestore";

const initialState = [];
const orderRef = collection(db, "orders");

export const getOrders = createAsyncThunk(
    "order/getOrders",
    async () => {
        const user = JSON.parse(sessionStorage.getItem("userData"));
        const q = query(orderRef, where('userId', '==', user.id));
        const res = await getDocs(q);
        return res.docs.map((elem) => ({ ...elem.data(), id: elem.id }));
    }
)

const orderSlice = createSlice({
    name: "order",
    initialState,
    extraReducers(builder) {
        builder
            .addCase(getOrders.fulfilled, (state, action) => {
                return action.payload
            })
    }
})

export default orderSlice.reducer;