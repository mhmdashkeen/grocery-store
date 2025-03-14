import React from "react";
import ProductListing from "./ProductListing";

const Home = () => {
  return (
    <div className="container">
      <ProductListing />
    </div>
  );
};

export default React.memo(Home);
