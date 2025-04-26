import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  decreaseGram,
  removeCart,
  updateCartGram,
  increaseGram
} from "../slice/Cart";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { Day } from "../utils/helper";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { showSnackbar } from "../slice/Snackbar";
import CartIncDec from "./CartIncDec";
import imagePlaceholder from "../../public/assets/img-placeholder.webp";
import { Box, TextField } from "@mui/material";

const Cart = ({ onCheckout }) => {
  const [gramValue, setGramValue] = useState(1000);
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalAmountWithoutDicount = cartItems
    .map((cart) => parseInt(cart.sellPrice) * cart.quantity)
    .reduce((a, b) => a + b, 0);
  const totalAmount = cartItems
    .map((cart) => parseInt(cart.sellPrice - cart.discount) * cart.quantity)
    .reduce((a, b) => a + b, 0);
  const discountAmount = cartItems
    .map((cart) => parseInt(cart.discount) * cart.quantity)
    .reduce((a, b) => a + b, 0);
  console.log("cartitems", cartItems);
  if (cartItems.length > 0) {
    return (
      <>
        {!onCheckout && <h3>My Cart</h3>}
        {cartItems.map((cart) => {
          return (
            <div
              key={cart.id}
              className="listing--container listing--container-cart"
            >
              <div style={{ display: "flex" }}>
                {!onCheckout ? (
                  <Link to={`/products/${cart.id}`} state={{ product: cart }}>
                    <LazyLoadImage
                      className="listing-card-image"
                      alt={cart.name}
                      src={cart.thumbnail || imagePlaceholder}
                      style={{ objectFit: `${!cart.thumbnail && "cover"}` }}
                    />
                  </Link>
                ) : (
                  <LazyLoadImage
                    className="listing-card-image"
                    alt={cart.name}
                    src={cart.thumbnail || imagePlaceholder}
                    style={{ objectFit: `${!cart.thumbnail && "cover"}` }}
                  />
                )}
                <div>
                  <div className="listing--name">{cart.name}</div>
                  {cart.description && <div>{cart.description}</div>}
                  <div className="listing--price">
                    <div className="listing--price--original">
                      ₹{cart.quantity * (cart.sellPrice - cart.discount)}
                    </div>
                    {cart.discount > 0 ? (
                      <>
                        <div className="listing--price--mrp">
                          ₹{cart.sellPrice}
                        </div>
                        <div className="listing--price--discount">
                          (₹{cart.discount * cart.quantity} off)
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="listing--details--weight">
                    <span className="listing--size--span">
                      {cart.saleIn !== "kg" ? "Qty:" : "Weight:"}
                    </span>{" "}
                    <span className="weight">
                      {cart.saleIn !== "kg"
                        ? cart.quantity
                        : cart.weight < 1000
                          ? cart.weight * cart.quantity + " g"
                          : (cart.weight * cart.quantity) / 1000 + " Kg"}
                    </span>
                  </div>
                  {!onCheckout && cart.saleIn !== "kg" && (
                    <CartIncDec product={cart} />
                  )}
                  {!onCheckout && cart.saleIn === "kg" && (
                    // <TextField
                    //   label="Weight in gram"
                    //   variant="standard"
                    //   type="number"
                    //   step
                    //   value={gramValue}
                    //   onChange={(e) => setGramValue(e.target.value)}
                    // onBlur={(e) => {
                    //   const updateCartWeight = {
                    //     id: cart.id,
                    //     updatedWeight: e.target.value
                    //   };
                    //   console.log(updateCartWeight, "Before");
                    //   dispatch(updateCartGram(updateCartWeight));
                    // }}
                    // onFocus={() => {}}
                    // />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        minWidth: "100px",
                        marginTop: "5px"
                      }}
                    >
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{ minWidth: "28px" }}
                        onClick={() => dispatch(decreaseGram(cart))}
                        disabled={cart.quantity === 0.25}
                      >
                        -
                      </Button>
                      <span style={{ padding: "0 10px" }}>
                        {cart.quantity * parseInt(cart.weight)} Gram
                      </span>
                      <Button
                        size="small"
                        variant="contained"
                        sx={{ minWidth: "28px" }}
                        onClick={() => dispatch(increaseGram(cart))}
                      >
                        +
                      </Button>
                    </Box>
                  )}
                </div>
              </div>
              <div className="delivery-text">
                <span>
                  Delivery in{" "}
                  {new Date().getHours() < 20 ? "same day" : "next day"},{" "}
                  {new Date().getHours() < 20
                    ? Day[new Date().getDay()]
                    : Day[new Date().getDay() + 1]}{" "}
                  :
                </span>{" "}
                <span className="listing--price--discount">FREE</span>
              </div>
              {!onCheckout && (
                <Stack spacing={2} direction="row">
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      dispatch(removeCart(cart.id));
                      dispatch(showSnackbar("Item removed from cart."));
                    }}
                  >
                    Remove
                  </Button>
                </Stack>
              )}
            </div>
          );
        })}
        <div className="price-detail-section">
          <h4>Price Details</h4>
          <div className="price-section">
            <span>
              Price (
              {cartItems.length > 1 ? cartItems.length + " items" : "1 item"})
            </span>
            <span>₹{totalAmountWithoutDicount}</span>
          </div>
          {discountAmount > 0 && (
            <div className="price-section">
              <span>Discount</span>
              <span className="listing--price--discount">
                -₹{discountAmount}
              </span>
            </div>
          )}
          <div className="price-section">
            <span>Delivery Charges</span>
            {totalAmount > 499 ? (
              <span>
                <span className="listing--price--mrp">₹20</span>{" "}
                <span className="listing--price--discount">FREE Deliery</span>
              </span>
            ) : (
              <span className="listing--price--discount">₹20</span>
            )}
          </div>
          <div className="price-section total-amount">
            <span>Total Amount</span>
            <span>₹{totalAmount > 499 ? totalAmount : totalAmount + 20}</span>
          </div>
        </div>
        {onCheckout === undefined ? (
          <Grid
            item
            xs={6}
            sm={6}
            sx={{
              position: "fixed",
              width: "100%",
              bottom: 0,
              left: 0,
              right: 0,
              display: "flex",
              padding: "0.5rem 1rem",
              borderTop: "1px solid #eee",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#fff"
            }}
          >
            <Stack
              spacing={2}
              direction="column"
              justifyContent={"end"}
              sx={{ fontSize: "24px", fontWeight: 500 }}
            >
              ₹{totalAmount > 499 ? totalAmount : totalAmount + 20}
            </Stack>
            <Stack spacing={2} direction="column" justifyContent={"end"}>
              <Button variant="contained" onClick={() => navigate("/checkout")}>
                Checkout
              </Button>
            </Stack>
          </Grid>
        ) : (
          ""
        )}
      </>
    );
  } else {
    return (
      <Stack spacing={2} direction="row" justifyContent={"center"}>
        <Button variant="outlined" onClick={() => navigate("/products")}>
          Go to products
        </Button>
      </Stack>
    );
  }
};

export default React.memo(Cart);
