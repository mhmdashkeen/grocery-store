import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import Button from "@mui/material/Button";
import { addtocart } from "../slice/Cart";
import { showSnackbar } from "../slice/Snackbar";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { product } = state;
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="card-title">{product?.name}</h1>
          <hr />
          <div style={{ display: "flex", gap: "50px" }}>
            <div>
              {product?.thumbnail && (
                <img
                  src={product?.thumbnail}
                  className="card-img-top"
                  alt=""
                  style={{
                    minWidth: "100px",
                    maxHeight: "100px",
                    objectFit: "cover"
                  }}
                />
              )}
            </div>
            <div>
              <h3 className="card-title">{product?.name}</h3>
              {product?.description && (
                <p className="card-text">{product?.description}</p>
              )}
              {product?.category && (
                <p className="card-text">
                  <strong>Category:</strong> {product?.category}
                </p>
              )}
              <div className="listing--price">
                <div className="listing--price--original">
                  ₹
                  {`${product.sellPrice - parseInt(product.discount ? product.discount : 0)}`}
                </div>
                {product.discount > 0 ? (
                  <>
                    <div className="listing--price--mrp">
                      M.R.P.&nbsp;&nbsp;₹{product.sellPrice}
                    </div>
                    <div className="listing--price--discount">
                      (₹{product.discount} off)
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="listing--details--weight">
                <div>
                  <span className="listing--size--span">Weight:</span>{" "}
                  <span className="weight">
                    {product.saleIn !== "kg"
                      ? product.weight < 1000
                        ? product.weight + " g"
                        : product.weight / 1000 + " Kg"
                      : product.weight / 1000 + ` ${product.saleIn}`}
                  </span>
                </div>
                {product.brand && (
                  <div className="listing--details--brand">
                    <span className="listing--size--span">Brand:</span>{" "}
                    <span className="weight">{product.brand}</span>
                  </div>
                )}
              </div>
              {/* {matchCart?.quantity > 0 ? <><CartIncDec addRemoveCart={addRemoveCart} product={matchCart}  disableDec={true}/> }
                        <Link to={"/cart"} style={{width: "100%"}} className="btn btn-primary mt-3">Go to Cart</Link>
                        </> :  */}
              <Button
                variant="contained"
                onClick={() => {
                  dispatch(addtocart(product));
                  dispatch(showSnackbar("Item added to cart."));
                }}
              >
                Add to Cart
              </Button>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default React.memo(SingleProduct);
