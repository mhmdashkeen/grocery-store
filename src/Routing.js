import React from 'react';
import { Routes, Route } from "react-router-dom";
import AddProduct from "./components/AddProduct";
import Cart from "./components/Cart";
import Login from "./components/Login";
import ProductListing from "./components/ProductListing";
import Signup from "./components/Signup";
import SingleProduct from "./components/SingleProduct";
import ProtectedRoute from "./common/ProtectedRoute";
import { useDispatch, useSelector } from 'react-redux';
import { addtocart, updateCart } from './slice/Product';
import Header from './components/Header';
import Checkout from './components/Checkout';
import Orders from './components/Orders';
import Home from './components/Home';
import Categories from './components/Categories';
import LoginOTP from './components/LoginOTP';


const Routing = () => {
    const cartItems = useSelector(state => state.products.cart);
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
            dispatch(updateCart(newCart))
            .then(data => {
                console.log("RESPONSE", data);
            })
            .catch(e => {
                console.log("ERRO", e);
            })
        }else{
            const newProduct = { ...product, quantity: newQuantity };
            dispatch(addtocart(newProduct))
            .then(data => {
                console.log("RESPONSE", data);
            })
            .catch(e => {
                console.log("ERRO", e);
            })
           
        }       
    }
    return (
        <React.Fragment>
            <Header cartItems={cartItems}/>
            <div className="container mt-3">
                <Routes>
                    <Route path="/cart" element={<Cart addRemoveCart={cartAddition}/>} />
                    <Route path="/add" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
                    <Route path="/edit/:id" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
                    <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                    <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/login-otp" element={<LoginOTP />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/products/:id" element={<SingleProduct addRemoveCart={cartAddition}/>} />
                    <Route exact path="/products" element={<ProductListing/>} />
                    <Route exact path="/categories" element={<Categories />} />
                    <Route exact path="/" element={<Home />} />
                </Routes>
            </div>
        </React.Fragment>
    );
}
 
export default Routing;