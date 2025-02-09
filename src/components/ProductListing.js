import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../slice/Product';
import ProductCard from './ProductCard';
import Search from './Search';
import Pagination from './Pagination';

const ProductListing = () => {
    const productsList = useSelector(state => state.products.productsLists);
    const [products, setProducts] = useState(productsList);
    const dispatch = useDispatch();
    const handlePagination = (currentPage, pageSize) => {
        const a = productsList.slice(currentPage, currentPage + pageSize);
        setProducts(a);
        console.log(currentPage, pageSize);
        console.log("Slice Product", a, products, currentPage + pageSize);
    }

    useEffect(() => {
        if(productsList.length === 0){
            dispatch(getProducts());
        }
    }, []);

    useEffect(() => {
        const slicedProduct = productsList.slice(0, 4);
        setProducts(slicedProduct);
    }, [productsList])
    console.log("Products", productsList, products);

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
                    <Search />
                    <div className="row abc">
                        {products.map(product => <ProductCard key={product.id} product={product}/>)}
                    </div>
                    <Pagination handlePagination={handlePagination} />
                </div>
            </div>
        </div>
    );
}
 
export default React.memo(ProductListing);