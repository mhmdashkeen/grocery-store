import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserWithOrders } from "../slice/Order";
import { clearCart } from "../slice/Cart";
import { useNavigate } from "react-router";
import Cart from "./Cart";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { showSnackbar } from "../slice/Snackbar";
import { LoadingButton } from "@mui/lab";
import { Alert } from "@mui/material";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart);
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const [isShowOrderPlaced, setIsShowOrderPlaced] = useState(false);
  const navigate = useNavigate();
  const handleCheckout = () => {
    if (loggedInUser?.address) {
      const addOrders = {
        uid: loggedInUser.uid,
        orders: [...cartItems],
        createdAt: new Date().toISOString(true),
        isDelivered: false,
        orderID: "OD" + Date.now()
      };
      dispatch(updateUserWithOrders(addOrders))
        .unwrap()
        .then((data) => {
          dispatch(clearCart());
          setIsShowOrderPlaced(true);
          setTimeout(() => {
            navigate("/orders");
          }, 5000);
        })
        .catch((e) => {
          handleNotify(
            true,
            "There is a problem on our end. Please try after sometime."
          );
        });
    } else {
      dispatch(showSnackbar("Please add address then checkout"));
    }
  };
  const totalAmount = cartItems
    .map((cart) => parseInt(cart.sellPrice - cart.discount) * cart.quantity)
    .reduce((a, b) => a + b, 0);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: ""
  });
  const handleNotify = (isOpen, message = "") => {
    setNotify(() => ({
      isOpen,
      message
    }));
  };

  console.log("Orders", orders);

  if (isShowOrderPlaced) {
    return (
      <div className="order-success-container">
        <h3 className="order-head">Order placed successfully.</h3>
        <p>It will automatically redirects in 5 seconds.</p>
        <Button variant="outlined" onClick={() => navigate("/orders")}>
          My orders
        </Button>
      </div>
    );
  }
  return (
    <>
      <h3>Checkout</h3>
      {notify.isOpen && (
        <Grid item xs={12} sm={12}>
          <Alert severity="error" onClose={() => handleNotify(false)}>
            {notify.message}
          </Alert>
        </Grid>
      )}
      <Grid item xs={12}>
        {loggedInUser?.address ? (
          <>
            <div className="deliver-change">
              <span className="deliver-head">Deliver to:</span>
              <Button
                variant="outlined"
                size="small"
                onClick={() =>
                  navigate("/adresses", {
                    state: { address: loggedInUser.address }
                  })
                }
              >
                Edit address
              </Button>
            </div>
            <div className="deliver-name">{loggedInUser.address.fullName}</div>
            <div className="deliver-address">
              {loggedInUser.address.houseNumber}, {loggedInUser.address.nearBy},{" "}
              {loggedInUser.address.city} {loggedInUser.address.pinCode}
            </div>
            <div className="deliver-phone">{loggedInUser.address.phone}</div>
          </>
        ) : (
          <div className="deliver-change">
            <span>No address found</span>
            <Button
              variant="outlined"
              size="small"
              onClick={() => navigate("/adresses")}
            >
              + Add new address
            </Button>
          </div>
        )}
        <Cart onCheckout={true} />
      </Grid>
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
          <LoadingButton
            loading={orders.loading}
            variant="contained"
            onClick={handleCheckout}
          >
            Place Order
          </LoadingButton>
        </Stack>
      </Grid>
    </>
  );
};

export default React.memo(Checkout);
