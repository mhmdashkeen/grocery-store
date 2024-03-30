import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db, auth } from "../firebase-config";
import { collection, addDoc, getDocs } from "@firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";

const initialState = null;
const usersRef = collection(db, "users");

export const getUser = createAsyncThunk(
    "user/getUser",
    async (user) => {
        const localUser = JSON.parse(sessionStorage.getItem("userData"));
        if(localUser){
            return localUser;
        }else{
            const res = await getDocs(usersRef);
            const userObj = res.docs.map((elem) => ({ ...elem.data(), id: elem.id }))
            .filter(doc => doc.email === user.email);
            return userObj[0];
        }  
    }
)

export const signup = createAsyncThunk(
    "user/Signup",
    async (data) => {
        await createUserWithEmailAndPassword(auth, data.email, data.password);
        await addDoc(usersRef, {name: data.name, email: data.email});
        return {name: data.name, email: data.email};
    }
)

export const signin = createAsyncThunk(
    "user/Signin",
    async (data) => {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        const res = await getDocs(usersRef);
        const user = res.docs.map((elem) => ({ ...elem.data(), id: elem.id }))
        .filter(doc => doc.email === data.email);
        return user[0];
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
            .addCase(getUser.fulfilled, (state, action) => {
                return action.payload;
            })
    }
})

export default userSlice.reducer;