import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase-config";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, where, query } from "@firebase/firestore";

const initialState = {
    productsLists: [],
    singleProduct: {},
    productsCategories: [], 
    loading: true,
    catloading: true,
    orders: []
}
const productsRef = collection(db, "products");
const categoryRef = collection(db, "categories");

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
        const added = await addDoc(productsRef, data);
        const res = await getDocs(categoryRef);
        const catList = res.docs.map((elem) => ({ ...elem.data(), id: elem.id }));
        const catDuplicate = catList.filter(cat => cat.value.toLowerCase() === data.category.toLowerCase());
        const catData = {value: data.category.toLowerCase(), label: data.category}
        if(catDuplicate.length <= 0) {
            await addDoc(categoryRef, catData);
        }
        return {...data, id: added.id};
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

export const getCategory = createAsyncThunk(
    "product/category",
    async () => {
        const res = await getDocs(categoryRef);
        return res.docs.map((elem) => ({ ...elem.data(), id: elem.id }));
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
            .addCase(getCategory.pending, (state, action) => {
                if(state.catloading){
                    state.catloading = false;
                }
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                if(!state.catloading){
                    state.catloading = true;
                }
                state.productsCategories = action.payload;
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