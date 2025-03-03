import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getAllOrders, markDeliver } from "../slice/Order";
import ScreenLoader from "./ScreenLoader";
import { Day } from "../utils/helper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";

function AllOrders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDeliver = (o) => {
    const updatedOrder = { ...o, isDelivered: true };
    dispatch(markDeliver(updatedOrder))
      .unwrap()
      .then(() => {
        console.log("Success");
      })
      .catch((e) => {
        console.log("E", e);
      });
  };
  const handleUndeliver = (o) => {
    const updatedOrder = { ...o, isDelivered: false };
    dispatch(markDeliver(updatedOrder))
      .unwrap()
      .then(() => {
        console.log("Success");
      })
      .catch((e) => {
        console.log("E", e);
      });
  };
  const handleDelete = (id) => {
    dispatch(deleteOrder(id))
      .unwrap()
      .then(() => {
        console.log("Success");
        handleClose();
      })
      .catch((e) => {
        console.log("E", e);
      });
  };

  useEffect(() => {
    dispatch(getAllOrders())
      .unwrap()
      .then(() => {
        console.log("Success");
      })
      .catch((e) => {
        console.log("E", e);
      });
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    padding: "10px"
  };
  console.log("Orders", orders);
  if (!loggedInUser.isAdmin) {
    return <h1>You are not authorized to access this page.</h1>;
  }
  return (
    <>
      {orders.loading && <ScreenLoader inline="inline" />}
      {orders.orderLists?.map((allOrders) => (
        <Box
              key={allOrders.id}
              sx={{
                  border: 1,
                  borderColor: "divider",
                  position: "relative",
                  marginBottom: "1rem",
                  boxShadow: "1px 1px 7px #d3d3d3",
                  borderRadius: "4px",
                  padding: "10px"
              }}>
              {allOrders.orders.map((cart) => (
                  <div key={cart.id} style={{ position: "relative" }}>
                      <div style={{ display: "flex" }}>
                          {cart.thumbnail && (
                              <div style={{ marginRight: "10px" }}>
                                  <img style={{ width: "80px", height: "80px", border: "1px solid #eee", borderRadius: "2px" }} src={cart.thumbnail} />
                              </div>
                          )}
                          <div>
                              <div><b>{cart.name}</b></div>
                              {cart.description && <div>{cart.description}</div>}
                              <div>₹{cart.quantity * (cart.sellPrice - cart.discount)}</div>
                              <div>Weight: {cart.quantity} Kg</div>
                          </div>
                      </div>
                  </div>
              ))}
              {allOrders.isDelivered ? (
                  <Stack spacing={2}>
                      <Box>
                          Delivered
                      </Box>
                      <Button variant="outlined" onClick={() => handleUndeliver(allOrders)}>Mark Undelivered</Button>
                  </Stack>
              ) : (
                  <Stack spacing={2}>
                      <Box>
                          Delivery in{" "}
                          {new Date().getHours() < 20 ? "same day" : "next day"},{" "}
                          {new Date().getHours() < 20
                              ? Day[new Date().getDay()]
                              : Day[new Date().getDay() + 1]}{" "}
                          : FREE
                      </Box>
                      <Button variant="outlined" onClick={() => handleDeliver(allOrders)}>Mark Delivered</Button>
                  </Stack>
              )}
            <div
                style={{
                    position: "absolute",
                    top: "0px",
                    right: "0px",
                    backgroundColor: "#fff",
                    borderRadius: "2px",
                    zIndex: "2",
                    boxShadow: "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)"
                }}
            >
                <IconButton
                    aria-label="delete"
                    color="primary"
                    onClick={handleOpen}>
                    <DeleteIcon />
                </IconButton>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Confirm
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                        Are you sure you want to delete this product?
                    </Typography>
                    <Stack spacing={2}>
                        <Button onClick={handleClose}>Cancel</Button>
                        <LoadingButton
                            loading={orders.loading}
                            variant="contained"
                            onClick={() => handleDelete(allOrders.id)}
                            sx={{ marginTop: "1rem" }}
                        >
                            <span>Delete</span>
                        </LoadingButton>
                    </Stack>
                </Box>
            </Modal>
        </Box>
    ))}
 </>    
);
}

export default AllOrders;
