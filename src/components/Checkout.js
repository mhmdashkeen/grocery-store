import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserWithOrders } from "../slice/Order";
import { clearCart } from "../slice/Cart";
import { useNavigate } from "react-router";
import Cart from "./Cart";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { showSnackbar } from "../slice/Snackbar";

const Checkout = () => {
  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const loggedInUser = useSelector(state => state.loggedInUser);
  const navigate = useNavigate();
  const handleCheckout = () => {
    if(loggedInUser?.address){
      const addOrders = {uid: loggedInUser.uid, orders: [...cartItems], createdAt: new Date().toISOString(true), isDelivered: false};
      dispatch(updateUserWithOrders(addOrders))
        .unwrap()
        .then((data) => {
          console.log("Response", data);
          dispatch(clearCart());
          navigate("/orders");
        })
        .catch((e) => {
          console.log("API Error", e);
        });
    }else{
      dispatch(showSnackbar("Please add address then checkout"));
    }

  };
  return (
    <>
      <div>Checkout</div>
      <Grid item xs={12}>
        {loggedInUser?.address ? (
          <>
            Deliver to:
          <Button variant="outlined" onClick={() => navigate("/adresses", { state: { address: loggedInUser.address } })}>Edit address</Button>
          <div><b>{loggedInUser.address.fullName}</b></div>
          <div>{loggedInUser.address.houseNumber}, {loggedInUser.address.nearBy}, {loggedInUser.address.city} {loggedInUser.address.pinCode}</div>
          <div>{loggedInUser.address.phone}</div>
        </>
        ) : <div className='col'>
              No address found
            <Button variant="outlined" onClick={() => navigate("/adresses")}>+ Add new address</Button>
            </div>
          }
        <div className='col'>
          <Cart onCheckout={true}/>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={2} direction="column" justifyContent={"end"}>
          <Button variant="outlined" onClick={() => navigate("/cart")}>Go to Cart</Button>
          <Button variant="contained" onClick={handleCheckout}>Place Order</Button>
        </Stack>
      </Grid>
    </>
  );
};

export default Checkout;
