import React, { useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase-config";
import { signOut } from "@firebase/auth";
import { addUser, getAdminValue } from "./slice/User";
import { getCart } from "./slice/Cart";
import { ToastContainer } from "react-toastify";
import Routing from "./Routing";
import { BrowserRouter as Router } from "react-router-dom";
import ScreenLoader from "./components/ScreenLoader";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { hideSnackbar } from "./slice/Snackbar";
import "./App.css";
import { hideModal } from "./slice/Modal";
import { Modal } from "react-bootstrap";
import { Box, Button, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const App = () => {
  const dispatch = useDispatch();
  const snackbar = useSelector((state) => state.snackbar);
  const cartItems = useSelector((state) => state.cart);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hideSnackbar());
  };

  const modal = useSelector((state) => state.modal);
  const handleModalClose = () => {
    dispatch(hideModal());
  };

  useEffect(() => {
    const userIsThere = JSON.parse(sessionStorage.getItem("userData"));
    if (userIsThere) {
      dispatch(addUser(userIsThere));
      dispatch(getAdminValue({ uid: userIsThere.uid }));
    } else {
      sessionStorage.removeItem("userData");
      signOut(auth);
    }
  }, []);

  useEffect(() => {
    dispatch(getCart());
  }, []);

  useEffect(() => {
    localStorage.setItem("carts", JSON.stringify(cartItems));
  }, [cartItems]);

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

  // console.log("MOda;", modal);

  return (
    <React.Fragment>
      <Suspense fallback={<ScreenLoader />}>
        <Router>
          <Header />
          <Container maxWidth="xl" sx={{ paddingTop: "5rem" }}>
            <Routing />
          </Container>
          <Footer />
        </Router>
      </Suspense>
      <ToastContainer />
      <Snackbar
        open={snackbar.isOpen}
        autoHideDuration={1500}
        onClose={handleClose}
        message={snackbar.message}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
      {/* <Modal
        open={modal.isOpen}
        onClose={handleModalClose}
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
            <Button onClick={handleModalClose}>Cancel</Button>
            <LoadingButton
              // loading={deleteLoading}
              variant="contained"
              // onClick={() => dispatch(deleteProducts(id))}
              sx={{ marginTop: "1rem" }}
            >
              <span>Delete</span>
            </LoadingButton>
          </Stack>
        </Box>
      </Modal> */}
    </React.Fragment>
  );
};

export default React.memo(App);
