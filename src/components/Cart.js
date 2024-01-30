import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeCart } from '../slice/Product';
import CartIncDec from './CartIncDec';

const Cart = ({addRemoveCart, onCheckout}) => {
    const cartItems = useSelector(state => state.products.cart);
    const dispatch = useDispatch();
    if(cartItems.length > 0){
        return (
            <div>
            {cartItems.map(cart => {
                    return <div key={cart.id}>
                            <div style={{display: "flex"}}>
                                <div><img style={{width: "180px", height: "180px"}} src={cart.thumbnail} /></div>
                                <div>
                                    <div><b>{cart.name}</b></div>
                                    <div>Price: ${cart.price}</div>
                                    {onCheckout === undefined ?
                                    cart.quantity > 0 ? <CartIncDec addRemoveCart={addRemoveCart} product={cart} disableDec={true}/> :
                                    <div><button onClick={() => dispatch(removeCart(cart.id))} style={{width: "100%"}} className="btn btn-primary  mt-3">Remove</button></div> : <div>Quantity: {cart.quantity}</div> }
                                    <div>Total: ${cart.quantity * cart.price}</div>
                                </div>
                            </div>
                        </div>
                })
            }
            <div>Subtotal: ${cartItems.map(cart => parseInt(cart.price) * cart.quantity).reduce((a, b) => a + b)}</div>
            {onCheckout === undefined ? <div className='row'>
                <div className='col'>
                <Link to={"/"} style={{width: "100%"}} className="btn btn-secondary  mt-3">Go to Products</Link>
                </div>
                <div className='col'>
                <Link to={"/checkout"} style={{width: "100%"}} className="btn btn-primary  mt-3">Checkout</Link>
                </div>
            </div> : ""}
            </div>
        )
    }
    else{
        return (
            <div className="text-center">
                <div>No items in the Cart</div>
                <Link to={"/"} className='btn btn-primary'>Go to Products</Link>
            </div>
        )  
    }
}
 
export default React.memo(Cart);