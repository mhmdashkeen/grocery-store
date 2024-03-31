import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase-config";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, where, query } from "@firebase/firestore";

const initialState = {
    productsLists: [],
    singleProduct: {},
    loading: true,
}
const productsRef = collection(db, "products");

export const getProducts = createAsyncThunk(
    "products/get",
    async () => {
        const res = await getDocs(productsRef);
        return res.docs.map((elem) => ({ ...elem.data(), id: elem.id }));
    }
)

export const getProductById = createAsyncThunk(
    "products/getProductById",
    async (id) => {
        const q = query(productsRef, where('id', '==', id));
        const res = await getDocs(q);
        const product = res.docs.map((elem) => ({ ...elem.data(), id: elem.id }));
        return product[0];
    }
)

export const addProduct = createAsyncThunk(
    "products/add",
    async (data) => {
        await addDoc(productsRef, data);
        return data;
    }
)

export const editProduct = createAsyncThunk(
    "products/edit",
    async (data) => {
        const productDoc = doc(db, "products", data.id);       
        await updateDoc(productDoc, data);
        return data;
    }
)

export const deleteProducts = createAsyncThunk(
    "products/delete",
    async (id) => {
        const productDoc = doc(db, "products", id)
        await deleteDoc(productDoc);
        return id;
    }
)

export const getProductsCategory = createAsyncThunk(
    "product/categorywiseProducts",
    async (cat) => {
        const q = query(productsRef, where('category', '==', cat));
        const res = await getDocs(q);
        return res.docs.map((elem) => ({ ...elem.data(), id: elem.id }));
    }
)

const productsSlice = createSlice({
    name: "products",
    initialState,
    extraReducers(builder) {
        builder
            .addCase(getProductById.pending, (state, action) => {
                if(state.loading){
                    state.loading = false;
                }
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                if(!state.loading){
                    state.loading = true;
                }
                state.singleProduct = action.payload;
            })
            .addCase(getProducts.pending, (state, action) => {
                if(state.loading){
                    state.loading = false;
                }
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                if(!state.loading){
                    state.loading = true;
                }
                state.productsLists = action.payload;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.productsLists.push(action.payload);
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                const index = state.productsLists.findIndex(product => product.id === action.payload.id);
                state.productsLists[index] = action.payload;
            })
            .addCase(getProductsCategory.fulfilled, (state, action) => {
                state.productsLists = action.payload;
            })
            .addCase(deleteProducts.fulfilled, (state, action) => {
                if(!state.loading){
                    state.loading = true;
                }
                const index = state.productsLists.findIndex(product => product.id === action.payload);
                state.productsLists.splice(index, 1);
            })       
    }
})

export default productsSlice.reducer;