import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { removeCart } from "../slice/Cart";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { Day } from "../utils/helper";

const Cart = ({ onCheckout }) => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (cartItems.length > 0) {
    return (
      <>
        {cartItems.map((cart) => {
          return (
            <div
              key={cart.id}
              style={{
                padding: "10px",
                boxShadow: "1px 1px 7px #d3d3d3",
                marginBottom: "16px",
                borderRadius: "4px"
              }}
            >
              <div style={{ display: "flex" }}>
                {cart.thumbnail &&
                  (!onCheckout ? (
                    <Link to={`/products/${cart.id}`} state={{ product: cart }}>
                      <div style={{ marginRight: "10px" }}>
                        <img
                          style={{
                            width: "80px",
                            height: "80px",
                            border: "1px solid #eee",
                            borderRadius: "2px"
                          }}
                          src={cart.thumbnail}
                        />
                      </div>
                    </Link>
                  ) : (
                    <div style={{ marginRight: "10px" }}>
                      <img
                        style={{
                          width: "80px",
                          height: "80px",
                          border: "1px solid #eee",
                          borderRadius: "2px"
                        }}
                        src={cart.thumbnail}
                      />
                    </div>
                  ))}
                <div>
                  <div>
                    <b>{cart.name}</b>
                  </div>
                  {cart.description && <div>{cart.description}</div>}
                  <div>₹{cart.quantity * (cart.sellPrice - cart.discount)}</div>
                  <div>Weight: {cart.quantity} Kg</div>
                </div>
              </div>
              {/* <CartIncDec addRemoveCart={addRemoveCart} product={cart} disableDec={true}/> */}
              <div className="">
                Delivery in{" "}
                {new Date().getHours() < 20 ? "same day" : "next day"},{" "}
                {new Date().getHours() < 20
                  ? Day[new Date().getDay()]
                  : Day[new Date().getDay() + 1]}{" "}
              </div>
              {!onCheckout && (
                <Stack spacing={2} direction="row">
                  <Button
                    size="small"
                    onClick={() => dispatch(removeCart(cart.id))}
                  >
                    Remove
                  </Button>
                </Stack>
              )}
            </div>
          );
        })}
        <div style={{ textAlign: "right" }}>
          Subtotal: ₹
          {cartItems
            .map(
              (cart) => parseInt(cart.sellPrice - cart.discount) * cart.quantity
            )
            .reduce((a, b) => a + b)}
        </div>
        {onCheckout === undefined ? (
          <Grid item xs={12} sm={12}>
            <Stack spacing={2} direction="column" justifyContent={"end"}>
              <Button variant="contained" onClick={() => navigate("/checkout")}>
                Checkout
              </Button>
              <Button variant="outlined" onClick={() => navigate("/products")}>
                Go to products
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
