import React, { lazy, Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
// import AddProduct from "./components/AddProduct";
// import Cart from "./components/Cart";
// import Login from "./components/Login";
// import ProductListing from "./components/ProductListing";
// import Signup from "./components/Signup";
// import SingleProduct from "./components/SingleProduct";
import ProtectedRoute from "./common/ProtectedRoute";
import { useDispatch, useSelector } from 'react-redux';
import { addtocart, updateCart } from './slice/Cart';
import Header from './components/Header';
// import Checkout from './components/Checkout';
// import Orders from './components/Orders';
import Home from './components/Home';
import Footer from './components/Footer';
import ErrorPage from './components/ErrorPage';
import ScreenLoader from './components/ScreenLoader';
// import About from './components/AboutUs';
// import LoginOTP from './components/LoginOTP';
// import WishList from './components/WishList';

const About = lazy(() => import('./components/AboutUs'));
const WishList = lazy(() => import('./components/WishList'));
const ProductListing = lazy(() => import('./components/ProductListing'));
const SingleProduct = lazy(() => import('./components/SingleProduct'));
const Signup = lazy(() => import('./components/Signup'));
const Login = lazy(() => import('./components/Login'));
const LoginOTP = lazy(() => import('./components/LoginOTP'));
const Orders = lazy(() => import('./components/Orders'));
const Checkout = lazy(() => import('./components/Checkout'));
const AddProduct = lazy(() => import('./components/AddProduct'));
const Cart = lazy(() => import('./components/Cart'));



const Routing = () => {
    const cartItems = useSelector(state => state.cart);
    console.log(cartItems);
    const dispatch = useDispatch();
    const cartAddition = (product, opt) => {
        const cartfilter = cartItems.findIndex(cart => cart.id === product.id);
        let newQuantity = 1;
        if(cartfilter >= 0){
            const updatedCart = [...cartItems];
            const newCart = {...updatedCart[cartfilter]};
            if(opt === "increase"){
                newQuantity = newCart.quantity + newQuantity;
            }else{
                newQuantity = newCart.quantity - newQuantity;
            }
            
            newCart.quantity = newQuantity;
            dispatch(updateCart(newCart));
        }else{
            const newProduct = { ...product, quantity: newQuantity };
            dispatch(addtocart(newProduct));           
        }       
    }
    return (
        <React.Fragment>
            <Header/>
            <div style={{minHeight: "calc(100vh - 111px)"}}>
                <Routes>
                    <Route path="/cart" element={<Suspense fallback={<ScreenLoader />}><Cart addRemoveCart={cartAddition}/></Suspense>} />
                    <Route path="/add" element={<Suspense fallback={<ScreenLoader />}><ProtectedRoute><AddProduct /></ProtectedRoute></Suspense>} />
                    <Route path="/edit/:id" element={<Suspense fallback={<ScreenLoader />}><ProtectedRoute><AddProduct /></ProtectedRoute></Suspense>} />
                    <Route path="/checkout" element={<Suspense fallback={<ScreenLoader />}><ProtectedRoute><Checkout /></ProtectedRoute></Suspense>} />
                    <Route path="/orders" element={<Suspense fallback={<ScreenLoader />}><ProtectedRoute><Orders /></ProtectedRoute></Suspense>} />
                    <Route path="/login" element={<Suspense fallback={<ScreenLoader />}><Login /></Suspense>} />
                    <Route path="/login-otp" element={<Suspense fallback={<ScreenLoader />}><LoginOTP /></Suspense>} />
                    <Route path="/signup" element={<Suspense fallback={<ScreenLoader />}><Signup /></Suspense>} />
                    <Route path="/products/:id" element={<Suspense fallback={<ScreenLoader />}><SingleProduct addRemoveCart={cartAddition}/></Suspense>} />
                    <Route path="/products" element={<Suspense fallback={<ScreenLoader />}><ProductListing/></Suspense>} />
                    <Route path="/wishlist" element={<Suspense fallback={<ScreenLoader />}><WishList /></Suspense>} /> 
                    <Route path="/about" element={<Suspense fallback={<ScreenLoader />}><About /></Suspense>} /> 
                    <Route exact path="/" element={<Home />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </div>
            <Footer />
        </React.Fragment>
    );
}
 
export default Routing;