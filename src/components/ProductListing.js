import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../slice/Product";
import ListingProduct from "../common/ListingProduct/ListingProduct";
import Search from "./Search";
import Pagination from "./Pagination";
import ScreenLoader from "./ScreenLoader";

const ProductListing = () => {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.products.productsLists);
  const filteredProductsList = useSelector(
    (state) => state.products.filteredProductsList
  );
  const isLoading = useSelector((state) => state.products.loading);
  const [products, setProducts] = useState([]);
  const handlePagination = (currentPage, pageSize) => {
    setProducts(
      productsList.slice(
        currentPage * pageSize,
        currentPage * pageSize + pageSize
      )
    );
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    const slicedProduct = filteredProductsList.slice(0, 100);
    setProducts(slicedProduct);
  }, [filteredProductsList]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <div>Shop by Collection</div>
      <p>
        Each season, we collaborate with world class designers to create a
        collection inspired by natural world.
      </p>
      <Search />
      <Grid container spacing={2}>
        {isLoading && <ScreenLoader inline="inline" />}
        {products.map((p) => (
          <ListingProduct key={p.id} data={p} />
        ))}
      </Grid>
      <Pagination handlePagination={handlePagination} />
    </Box>
  );
};

export default React.memo(ProductListing);
