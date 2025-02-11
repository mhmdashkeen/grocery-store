import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../slice/Product';
import ProductCard from './ProductCard';
import ListingProduct from '../common/ListingProduct/ListingProduct';
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
        <Box sx={{ flexGrow: 1 }}>
            <h3>Shop by Collection</h3>
            <p>
            Each season, we collaborate with world class designers to create a
            collection inspired by natural world.
            </p>
            <Search />
            <Grid container spacing={2}>
            
            {/* {products.map(product => <ProductCard key={product.id} product={product}/>)} */}
            {products.map(p => <ListingProduct key={p.id} data={p} />)}
            </Grid>
            <Pagination handlePagination={handlePagination} />
        </Box>
    );
}
 
export default React.memo(ProductListing);