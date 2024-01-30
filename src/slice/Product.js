import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductService from "../services/ProductService";
import { db, auth } from "../firebase-config";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "@firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";

const initialState = {
    cart: [],
    userLists: [],
    loggedInUser: "",
    productsLists: [],
    singleProduct: {},
    productsCategories: [], 
    loading: true,
    catloading: true
}
const productsRef = collection(db, "products");
const categoryRef = collection(db, "categories");
const usersRef = collection(db, "users");

export const getProducts = createAsyncThunk(
    "products/get",
    async () => {
        const res = await getDocs(productsRef);
        return res.docs.map((elem) => ({ ...elem.data(), id: elem.id }));
    }
)

export const getUser = createAsyncThunk(
    "products/getUser",
    async (user) => {
        const res = await getDocs(usersRef);
        const userObj = res.docs.map((elem) => ({ ...elem.data(), id: elem.id }))
        .filter(doc => doc.email === user.email);
        return userObj[0];
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

export const signup = createAsyncThunk(
    "products/Signup",
    async (data) => {
        await createUserWithEmailAndPassword(auth, data.email, data.password);
        await addDoc(usersRef, {name: data.name, email: data.email});
        return {name: data.name, email: data.email};
    }
)

export const signin = createAsyncThunk(
    "products/Signin",
    async (data) => {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        const res = await getDocs(usersRef);
        const user = res.docs.map((elem) => ({ ...elem.data(), id: elem.id }))
        .filter(doc => doc.email === data.email);
        return user[0];
    }
)

export const updateUserWithCart = createAsyncThunk(
    "products/updateUserCart",
    async (data) => {
        const user = JSON.parse(localStorage.getItem('userData'));
        const userDoc = doc(db, "users", user.id);     
        // console.log("UPDATW", {...user, cart: data});  
        await updateDoc(userDoc, {...user, cart: data});
        // console.log("Success");
    }
)


export const getSingleProduct = createAsyncThunk(
    "products/getSingleProduct",
    async (id) => {
        const res = await ProductService.getSingleProduct(id);
        return res.data;
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
        const res = await ProductService.getCategory();
        return res.data;
    }
)

export const getProductsCategory = createAsyncThunk(
    "product/categorywiseProducts",
    async (cat) => {
        const res = await ProductService.getProductsByCategory(cat);
        return res.data;
    }
)

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addtocart: (state, action) => {
            const index = state.productsLists.findIndex(product => product.id === action.payload.id);
            state.productsLists[index] = action.payload;
            state.cart.push(action.payload);
        },
        updateCart: (state, action) => {
            const index = state.productsLists.findIndex(product => product.id === action.payload.id);
            state.productsLists[index].quantity = action.payload.quantity;
            state.cart[action.payload.cartIndex] = action.payload;
        },
        removeCart: (state, action) => {
            const indexCart = state.cart.findIndex(cart => cart.id === action.payload);
            const index = state.productsLists.findIndex(product => product.id === action.payload);
            delete state.productsLists[index].quantity;
            state.cart.splice(indexCart, 1);
        }
    },
    extraReducers(builder) {
        builder
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
            .addCase(signup.fulfilled, (state, action) => {
                state.loggedInUser = action.payload;
            })
            .addCase(signin.fulfilled, (state, action) => {
                state.loggedInUser = action.payload;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loggedInUser = action.payload;
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
            .addCase(getSingleProduct.fulfilled, (state, action) => {
                state.singleProduct = action.payload;
            })
            .addCase(getProductsCategory.fulfilled, (state, action) => {
                state.productsLists = action.payload.products;
            })
            .addCase(deleteProducts.fulfilled, (state, action) => {
                if(!state.loading){
                    state.loading = true;
                }
                const index = state.productsLists.findIndex(product => product.id === action.payload);
                state.productsLists.splice(index, 1);
            })
            
    }
    // extraReducers: {
    //     [getProducts.pending]: (state, action) => {
    //         if(state.loading){
    //             state.loading = false;
    //         }
    //     },
    //     [getProducts.fulfilled]: (state, action) => {
    //         if(!state.loading){
    //             state.loading = true;
    //         }
    //         state.productsLists = action.payload;
    //     },
    //     [addProduct.fulfilled]: (state, action) => {
    //         state.productsLists.push(action.payload);
    //     },
    //     [editProduct.fulfilled]: (state, action) => {
    //         const index = state.productsLists.findIndex(product => product.id === action.payload.id);
    //         state.productsLists[index] = action.payload;
    //     },
    //     [signup.fulfilled]: (state, action) => {
    //         state.loggedInUser = action.payload;
    //     },
    //     [signin.fulfilled]: (state, action) => {
    //         state.loggedInUser = action.payload;
    //     },
    //     [getUser.fulfilled]: (state, action) => {
    //         state.loggedInUser = action.payload;
    //     },
    //     [getCategory.pending]: (state, action) => {
    //         if(state.catloading){
    //             state.catloading = false;
    //         }
    //     },
    //     [getCategory.fulfilled]: (state, action) => {
    //         if(!state.catloading){
    //             state.catloading = true;
    //         }
    //         state.productsCategories = action.payload;
    //     },
    //     [getSingleProduct.fulfilled]: (state, action) => {
    //         state.singleProduct = action.payload;
    //     },
    //     [getProductsCategory.fulfilled]: (state, action) => {
    //         state.productsLists = action.payload.products;
    //     },
    //     [deleteProducts.fulfilled]: (state, action) => {
    //         if(!state.loading){
    //             state.loading = true;
    //         }
    //         const index = state.productsLists.findIndex(product => product.id === action.payload);
    //         state.productsLists.splice(index, 1);
    //     }
    // }
})

export const { addtocart, updateCart, removeCart } = productsSlice.actions;
const { reducer } = productsSlice;
export default reducer;