import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db, auth } from "../firebase-config";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, where, query, setDoc } from "@firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";

const initialState = {
    cart: [],
    userLists: [],
    loggedInUser: "",
    productsLists: [],
    singleProduct: {},
    productsCategories: [], 
    loading: true,
    catloading: true,
    orders: []
}
const productsRef = collection(db, "products");
const categoryRef = collection(db, "categories");
const usersRef = collection(db, "users");
const orderRef = collection(db, "orders");

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

export const getUser = createAsyncThunk(
    "products/getUser",
    async (user) => {
        const localUser = JSON.parse(localStorage.getItem("userData"));
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

export const signinWithPhone = createAsyncThunk(
    "products/signinWithPhone",
    async () => {

    
    }
)

export const updateUserWithCart = createAsyncThunk(
    "products/updateUserCart",
    async (data) => {
        const user = JSON.parse(localStorage.getItem('userData'));
        await addDoc(orderRef, {...data, userId: user.id});
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

export const addtocart = createAsyncThunk(
    "products/addtocart",
    async (data) => {
            const carts = localStorage.getItem("carts");
            if(carts){
                const cartList = JSON.parse(localStorage.getItem("carts"));
                cartList.push(data);
                localStorage.setItem("carts", JSON.stringify(cartList));
            }else{
                const cartArray = [];
                cartArray.push(data);
                localStorage.setItem("carts", JSON.stringify(cartArray));
            }
        return data;
    }
)

export const updateCart = createAsyncThunk(
    "products/updateCart",
    async (data) => {
        const cartList = JSON.parse(localStorage.getItem("carts"));
        const indexCart = cartList.findIndex(cart => cart.id === data.id);
        cartList.splice(indexCart, 1, data);
        localStorage.setItem("carts", JSON.stringify(cartList));
        return data;
    }
)

export const removeCart = createAsyncThunk(
    "products/removeCart",
    async (id) => {
        const cartList = JSON.parse(localStorage.getItem("carts"));
        const indexCart = cartList.findIndex(cart => cart.id === id);
        cartList.splice(indexCart, 1);
        localStorage.setItem("carts", JSON.stringify(cartList));
        return id;
    }
)

export const getCart = createAsyncThunk(
    "products/getCart",
    async () => {
        const cartList = JSON.parse(localStorage.getItem("carts"));
        if(cartList){
            return cartList;
        }
        return [];
    }
)

export const getOrders = createAsyncThunk(
    "product/getOrders",
    async () => {
        const user = JSON.parse(localStorage.getItem("userData"));
        const q = query(orderRef, where('userId', '==', user.id));
        const res = await getDocs(q);
        return res.docs.map((elem) => ({ ...elem.data(), id: elem.id }));
    }
)


const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        clearCart: (state, action) => {
            state.cart = [];
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getCart.fulfilled, (state, action) => {
                state.cart = action.payload
            })
            .addCase(signinWithPhone.fulfilled, (state, action) => {
                console.log("STATE");
            })
            
            .addCase(getOrders.fulfilled, (state, action) => {
                state.orders = action.payload
            })
            .addCase(removeCart.fulfilled, (state, action) => {
                const indexCart = state.cart.findIndex(cart => cart.id === action.payload);
                state.cart.splice(indexCart, 1);
            })
            .addCase(addtocart.fulfilled, (state, action) => {
                state.cart.push(action.payload);
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                const indexCart = state.cart.findIndex(cart => cart.id === action.payload.id);
                state.cart.splice(indexCart, 1, action.payload);
            })
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

export const { clearCart } = productsSlice.actions;
const { reducer } = productsSlice;
export default reducer;