import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
// import { getProductById } from '../slice/Product';
import CartIncDec from './CartIncDec';

const SingleProduct = ({addRemoveCart}) => {
    // const product = useSelector(state => state.products.singleProduct);
    const cart = useSelector(state => state.products.cart);
    const loading = useSelector(state => state.products.loading);
    const [matchCart, setMatchCart] = useState({});
    // const dispatch = useDispatch();
    // const param = useParams();
    const { state } = useLocation();
    const { product } = state;
    let actualPrice = 0;

    // useEffect(() => {
    //     dispatch(getProductById(param.id))
    //     .then(() => {
            const discountPrice = ((product?.price) * (product?.discountPercentage))/100;
            actualPrice = product?.price - discountPrice;
    //     })
    //     .catch(() => {
    //         console.log("error");
    //     })
    // }, []);

    useEffect(() => {
        const getCartWithProduct = cart.find(c => c.id === product.id);
        setMatchCart(getCartWithProduct);
    }, [cart]);

    // console.log("Stat", product);

    return (
        <div className="container">
            {loading ? <div className="row">
                <div className="col-6">
                    <h5 className="card-title">{product?.title}</h5>
                    <p className="card-text"><strong>Description:</strong> {product?.description}</p>
                    <p className="card-text"><strong>Category:</strong> {product?.category}</p>
                    <p className="card-text"><strong>Price: <span style={{color: "green", fontSize: "18px"}}>{product?.discountPercentage}%</span></strong> {product?.price} <strong>{actualPrice}</strong></p>
                    {matchCart?.quantity > 0 ? <><CartIncDec addRemoveCart={addRemoveCart} product={matchCart}  disableDec={true}/>
                    <Link to={"/cart"} style={{width: "100%"}} className="btn btn-primary mt-3">Go to Cart</Link>
                    </> : 
                    <button onClick={() => addRemoveCart(product, "increase")} style={{width: "100%"}} className="btn btn-primary">Add to Cart</button>}
                </div>
                <div className="col-6">
                    <div className="card">
                        <img src={product?.thumbnail} className="card-img-top" alt=""/>
                    </div>
                </div>
            </div> : "Loading"}
        </div>
    );
}
 
export default SingleProduct;