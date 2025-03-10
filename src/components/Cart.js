import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { removeCart } from "../slice/Cart";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { Day } from "../utils/helper";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Cart = ({ onCheckout }) => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalAmount = cartItems
    .map((cart) => parseInt(cart.sellPrice - cart.discount) * cart.quantity)
    .reduce((a, b) => a + b, 0);

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
                {cart.thumbnail &&
                  (!onCheckout ? (
                    <Link to={`/products/${cart.id}`} state={{ product: cart }}>
                      <LazyLoadImage
                        className="listing-card-image"
                        alt={cart.name}
                        src={cart.thumbnail}
                      />
                    </Link>
                  ) : (
                    <LazyLoadImage
                      className="listing-card-image"
                      alt={cart.name}
                      src={cart.thumbnail}
                    />
                  ))}
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
                          (₹{cart.discount} off)
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
                        ? 1
                        : cart.weight < 1000
                          ? cart.weight + " g"
                          : cart.weight / 1000 + " Kg"}
                    </span>
                  </div>
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
                    onClick={() => dispatch(removeCart(cart.id))}
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
            <span>₹{totalAmount}</span>
          </div>
          {/* <div className="price-section">
            <span>Discount</span>
            <span className="listing--price--discount">
              -₹50A
              {
                (cartItems.reduce((acc, cart) => acc + parseInt(cart.discount)),
                0)
              }
            </span>
          </div> */}
          <div className="price-section">
            <span>Delivery Charges</span>
            <span>
              <span className="listing--price--mrp">₹20</span>{" "}
              <span className="listing--price--discount">FREE Deliery</span>
            </span>
          </div>
          <div className="price-section total-amount">
            <span>Total Amount</span>
            <span>₹{totalAmount}</span>
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
              ₹{totalAmount}
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
