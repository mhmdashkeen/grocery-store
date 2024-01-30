import React from 'react';
import { useLocation } from 'react-router';

const SingleProduct = () => {
    let { state } = useLocation();
    const discountPrice = ((state.product.price) * (state.product.discountPercentage))/100;
    const actualPrice = state.product.price - discountPrice;
    console.log("Single State", state);
    return (
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <h5 className="card-title">{state.product.title}</h5>
                    <p className="card-text"><strong>Description:</strong> {state.product.description}</p>
                    <p className="card-text"><strong>Category:</strong> {state.product.category}</p>
                    <p className="card-text"><strong>Brand:</strong> {state.product.brand}</p>
                    <p className="card-text"><strong>Price: <span style={{color: "green", fontSize: "18px"}}>{state.product.discountPercentage}%</span></strong> {state.product.price} <strong>{actualPrice}</strong></p>
                </div>
                <div className="col-6">
                    <div className="card">
                        <img src={state.product.thumbnail} className="card-img-top" alt=""/>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default SingleProduct;