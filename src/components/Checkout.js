import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCart, updateUserWithCart } from '../slice/Cart';
import { useNavigate } from 'react-router';
import Cart from "./Cart";

const Checkout = () => {
    const cartItems = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleCheckout = () => {
        dispatch(updateUserWithCart(cartItems))
        .unwrap()
        .then((data) => {
            console.log("Response", data);
            localStorage.removeItem("carts");
            dispatch(clearCart());
            navigate("/orders");
        })
        .catch((e) => {
            console.log("API Error", e);
        })
    }
    
    return (
        <div>
            <h1>Checkout</h1>
            <div className='row'>
                <div className='col'>
                    Contact Info
                </div>
                <div className='col'>
                    <Cart onCheckout={true}/>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                <Link to={"/cart"} style={{width: "100%"}} className="btn btn-secondary  mt-3">Go to Cart</Link>
                </div>
                <div className='col'>
                <button onClick={() => handleCheckout()} style={{width: "100%"}} className="btn btn-primary  mt-3">Place Order</button>
                </div>
            </div>
        </div>
    );
}
 
export default Checkout;