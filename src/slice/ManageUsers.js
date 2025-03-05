import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase-config";
import { collection, getDocs } from "@firebase/firestore";

const initialState = {
    userLists: [],
    loading: false
};
const usersRef = collection(db, "users");

export const getUsers = createAsyncThunk("users/get", async () => {
    const res = await getDocs(usersRef);
    return res.docs.map((elem) => ({ ...elem.data(), id: elem.id }));
});

const ManageUserSlice = createSlice({
    name: "ManageUser",
    initialState,
    extraReducers(builder) {
        builder
            .addCase(getUsers.pending, (state, action) => {
                if (!state.loading) {
                    state.loading = true;
                }
            })           
            .addCase(getUsers.fulfilled, (state, action) => {
                if (state.loading) {
                    state.loading = false;
                }
                state.userLists = action.payload;
            })
    }
})

export default ManageUserSlice.reducer;