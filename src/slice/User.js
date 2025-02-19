import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../firebase-config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";
import { collection, query, getDocs, where } from "@firebase/firestore";

const initialState = null;
const usersRef = collection(db, "users");

export const signup = createAsyncThunk(
    "user/Signup",
    async (data) => {
        const current = await createUserWithEmailAndPassword(auth, data.email, data.password);
        const { uid, displayName, email, photoURL } = current.user;
        return { uid, displayName, email, photoURL }
    }
)

export const signin = createAsyncThunk(
    "user/Signin",
    async (data) => {
        const current = await signInWithEmailAndPassword(auth, data.email, data.password);
        const { uid, displayName, email, photoURL } = current.user;
        return { uid, displayName, email, photoURL }
    }
)

export const getAdminValue = createAsyncThunk(
    "user/AdminValue",
    async (data) => {
        const q = query(usersRef, where('uid', '==', data.uid));
        const res = await getDocs(q);
        const user = res.docs.map((elem) => ({ ...elem.data(), id: elem.id }));
        return user[0];
    }
)

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            return action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(signup.rejected, (state, action) => {
                return null;
            })           
            .addCase(signup.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(signin.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(getAdminValue.fulfilled, (state, action) => {
                return action.payload;
            })
    }
})

export const { addUser } = userSlice.actions;
export default userSlice.reducer;