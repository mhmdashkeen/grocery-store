import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory, getProducts } from '../slice/Product';
import ProductCard from './ProductCard';

const ProductListing = () => {
    const products = useSelector(state => state.products.productsLists);
    const dispatch = useDispatch();

    useEffect(() => {
        if(products.length === 0){
            dispatch(getProducts());
            dispatch(getCategory());
        }
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div>
                        <h3>Shop by Collection</h3>
                        <p>
                        Each season, we collaborate with world class designers to create a
                        collection inspired by natural world.
                        </p>
                    </div>
                    <div className="row abc">
                        {products.map(product => <ProductCard key={product.id} product={product}/>)}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default React.memo(ProductListing);