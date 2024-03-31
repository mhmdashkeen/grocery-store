import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../firebase-config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";

const initialState = null;

export const signup = createAsyncThunk(
    "user/Signup",
    async (data) => {
        const current = await createUserWithEmailAndPassword(auth, data.email, data.password);
        const { uid, displayName, email, photoURL } = current.user;
        sessionStorage.setItem("userData", JSON.stringify({ uid, displayName, email, photoURL }));
        return { uid, displayName, email, photoURL }
    }
)

export const signin = createAsyncThunk(
    "user/Signin",
    async (data) => {
        const current = await signInWithEmailAndPassword(auth, data.email, data.password);
        const { uid, displayName, email, photoURL } = current.user;
        sessionStorage.setItem("userData", JSON.stringify({ uid, displayName, email, photoURL }));
        return { uid, displayName, email, photoURL }
    }
)

export const signinWithPhone = createAsyncThunk(
    "user/signinWithPhone",
    async () => {

    
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
            .addCase(signinWithPhone.fulfilled, (state, action) => {
                console.log("STATE");
            })            
            .addCase(signup.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(signin.fulfilled, (state, action) => {
                return action.payload;
            })
    }
})

export const { addUser } = userSlice.actions;
export default userSlice.reducer;