import React, { lazy, Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./common/ProtectedRoute";
import { useDispatch, useSelector } from 'react-redux';
import { addtocart, updateCart } from './slice/Cart';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import ErrorPage from './components/ErrorPage';
import ScreenLoader from './components/ScreenLoader';
import Add from './components/Add';

// const About = lazy(() => import('./components/AboutUs'));
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
                    {/* <Route path="/cart" element={<Cart addRemoveCart={cartAddition}/>} /> */}
                    <Route path="/add" element={<Add />} />
                    <Route path="/edit/:id" element={<AddProduct />} />
                    {/* <Route path="/checkout" element={<Checkout />} /> */}
                    {/* <Route path="/orders" element={<Orders />} /> */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/login-otp" element={<LoginOTP />} />
                    <Route path="/signup" element={<Signup />} />
                    {/* <Route path="/products/:id" element={<SingleProduct addRemoveCart={cartAddition}/>} /> */}
                    <Route path="/products" element={<ProductListing/>} />
                    {/* <Route path="/wishlist" element={<WishList />} />  */}
                    {/* <Route path="/about" element={<About />} />  */}
                    <Route exact path="/" element={<Home />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </div>
            <Footer />
        </React.Fragment>
    );
}
 
export default Routing;