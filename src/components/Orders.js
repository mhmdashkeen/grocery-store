import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrders } from '../slice/Product';

const Orders = () => {
    const orders = useSelector(state => state.products.orders);
    const dispatch = useDispatch();   
    console.log("ORDER", orders);
    useEffect(() => {
        dispatch(getOrders());
    }, []);
    return (
        <div>
            <h3>My Orders</h3>
            {orders?.map(cart =>  <div key={cart.id}>
                        <div style={{display: "flex"}}>
                            <div><img style={{width: "180px", height: "180px"}} src={cart[0].thumbnail} /></div>
                            <div>
                                <div><b>{cart[0].name}</b></div>
                                <div>Price: ${cart[0].price}</div>
                                <div>Quantity: {cart[0].quantity}</div>
                                <div>Total: ${cart[0].quantity * cart[0].price}</div>
                                <Link to={`/products/${cart[0].id}`} state={{"product": cart[0]}} style={{width: "100%"}} className="btn btn-primary  mt-3">View Details</Link>
                            </div>
                        </div>
                    </div>
            )
        }
        {!orders && <div>No orders</div>}
    </div>
    )}
 
export default Orders;