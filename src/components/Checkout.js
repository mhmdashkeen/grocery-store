import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateUserWithCart } from '../slice/Product';
import Cart from "./Cart";

const Checkout = () => {
    const cartItems = useSelector(state => state.products.cart);
    const dispatch = useDispatch();
    useEffect(() => {
        const handleCheckout = () => {
            dispatch(updateUserWithCart(cartItems))
            .unwrap()
            .then((data) => {
                console.log("Response", data);
            })
            .catch((e) => {
              console.log("API Error", e);
            })
        }
     handleCheckout();
    }, [])
    
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
                <Link to={"/order"} style={{width: "100%"}} className="btn btn-primary  mt-3">Place Order</Link>
                </div>
            </div>
        </div>
    );
}
 
export default Checkout;