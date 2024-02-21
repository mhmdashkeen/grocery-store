import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getProductsCategory } from '../slice/Product';

const Categories = () => {
    const categories = useSelector(state => state.products.productsCategories);
    const dispatch = useDispatch();
    return (
        <div className="col">
            <h3>Categories</h3>
            <button type="button" className="btn btn-outline-primary btn-block" onClick={() => dispatch(getProducts())}>All Products</button>
            {categories.map(cat => <button key={cat.id} type="button" className="btn btn-outline-primary btn-block" onClick={() => dispatch(getProductsCategory(cat.value))}>{cat.value.charAt(0).toUpperCase() + cat.value.slice(1)}</button>)}                    
        </div>
    );
}
 
export default React.memo(Categories);