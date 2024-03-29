import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeCart } from '../slice/Product';
import CartIncDec from './CartIncDec';
import cart from "../../public/assets/img/cart.png";

const Cart = ({addRemoveCart, onCheckout}) => {
    const cartItems = useSelector(state => state.products.cart);
    const dispatch = useDispatch();
    if(cartItems.length > 0){
        return (
            <div>
            {cartItems.map(cart => {
                    return <div key={cart.id}>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px", boxShadow: "1px 1px 7px #d3d3d3", marginBottom: "30px", borderRadius: "4px"}}>
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <div style={{marginRight: "20px"}}>
                                        <img style={{width: "180px", height: "180px"}} src={cart.thumbnail} />
                                    </div>
                                    <div>
                                        <div><b>{cart.name}</b></div>
                                        <div>Price: ${cart.price}</div>
                                    </div>
                                </div>
                                <CartIncDec addRemoveCart={addRemoveCart} product={cart} disableDec={true}/>
                                <div>
                                    <div>Total: ${cart.quantity * cart.price}</div>
                                    {onCheckout !== undefined ?
                                     "" :
                                    <div><button onClick={() => dispatch(removeCart(cart.id))} style={{width: "100%"}} className="btn btn-primary  mt-3">Remove</button></div>}
                                </div>
                            </div>
                        </div>
                })
            }
            <div style={{textAlign: "right"}}>Subtotal: ${cartItems.map(cart => parseInt(cart.price) * cart.quantity).reduce((a, b) => a + b)}</div>
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
            <div className="container">
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <img src={cart} alt="empty-cart-img" width={500}/>
                    <button className="btn btn-primary" onClick={() => navigate("/products")}>
                        Go Back to Add Some Products
                    </button>
                </div>
            </div>
        )  
    }
}
 
export default React.memo(Cart);