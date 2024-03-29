import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getProductsCategory } from '../slice/Product';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Categories = () => {
    const categories = useSelector(state => state.products.productsCategories);
    const dispatch = useDispatch();
    return (
        <div className="col">
            <h3>Categories</h3>
            <button type="button" className="btn btn-outline-primary btn-block" onClick={() => dispatch(getProducts())}>All Products</button>
            {categories.map(cat => <button key={cat.id} type="button" className="btn btn-outline-primary btn-block" onClick={() => dispatch(getProductsCategory(cat.value))}>{cat.value.charAt(0).toUpperCase() + cat.value.slice(1)}</button>)}
            {/* <FormControl variant="standard" sx={{ m: 1, minWidth: "100%" }}>
                <InputLabel id="demo-simple-select-standard-label">Categories</InputLabel>
                <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                  value={}
                  onChange={}
                label="Categories"
                >
                    <MenuItem value="all">All Products</MenuItem>
                    {categories.map(cat => <MenuItem key={cat.id} value={cat.value}>{cat.value.charAt(0).toUpperCase() + cat.value.slice(1)}</MenuItem>)}
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>             */}
        </div>
    );
}
 
export default React.memo(Categories);