import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase-config";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, where, query } from "@firebase/firestore";

const initialState = [];
const categoryRef = collection(db, "categories");


export const getCategory = createAsyncThunk(
    "category/getcategory",
    async () => {
        const res = await getDocs(categoryRef);
        return res.docs.map((elem) => ({ ...elem.data(), id: elem.id }));
    }
)

export const addCategory = createAsyncThunk(
    "category/add",
    async (cat) => {
        const res = await getDocs(categoryRef);
        const arr = res.docs.map((elem) => ({ ...elem.data(), id: elem.id }));
        const isInList = arr.filter(c => c.label === cat);
        console.log(isInList, arr, "AA");
        if(isInList.length === 0){
            console.log("ADD");
            await addDoc(categoryRef, {value: cat.toLowerCase(), label: cat});
            return {value: cat.toLowerCase(), label: cat, id: Date.now()};
        }
        return null;
    }
)

export const removeCategory = createAsyncThunk(
    "category/remove",
    async (cat) => {
        const q = query(categoryRef, where('value', '==', cat));
        const res = await getDocs(q);
        const arr = res.docs.map((elem) => ({ ...elem.data(), id: elem.id }));
        const categoryDoc = doc(db, "categories", arr[0].id);
        await deleteDoc(categoryDoc);
        return arr[0].id;
    }
)

// export const getProductsCategory = createAsyncThunk(
//     "product/categorywiseProducts",
//     async (cat) => {
//         const q = query(productsRef, where('category', '==', cat));
//         const res = await getDocs(q);
//         return res.docs.map((elem) => ({ ...elem.data(), id: elem.id }));
//     }
// )

const categorySlice = createSlice({
    name: "category",
    initialState,
    extraReducers(builder) {
        builder
            .addCase(getCategory.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                if(action.payload){
                    console.log("ACTION");
                    state.push(action.payload);
                }else{
                    console.log("State");
                    return state;
                }
            })
            .addCase(removeCategory.fulfilled, (state, action) => {
                const index = state.findIndex(cat => cat.id === action.payload);
                state.splice(index, 1);
            })
            // .addCase(getProductsCategory.fulfilled, (state, action) => {
            //     state.productsLists = action.payload;
            // })
    }
})

export default categorySlice.reducer;