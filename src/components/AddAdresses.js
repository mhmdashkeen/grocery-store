import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { LoadingButton } from "@mui/lab";
import Grid from "@mui/material/Grid";
import { updateUserAddress } from "../slice/User";
import { useFormik } from "formik";
import { AddressSchema } from "./../utils/Schema";
import { Alert } from "@mui/material";

const formObject = {
  fullName: "",
  phone: "",
  pinCode: "224190",
  state: "Uttar Pradesh",
  city: "Tanda",
  houseNumber: "",
  nearBy: ""
};
const AddAdresses = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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

  const saveAddress = (values) => {
    setLoading(true);
    handleNotify(false);
    const updateAddress = { ...loggedInUser, address: values };
    dispatch(updateUserAddress(updateAddress))
      .unwrap()
      .then(() => {
        setLoading(false);
        sessionStorage.setItem("userData", JSON.stringify(updateAddress));
        navigate("/checkout");
      })
      .catch((e) => {
        setLoading(false);
        handleNotify(
          true,
          "There is a problem on our end. Please try after sometime."
        );
      });
  };

  const formik = useFormik({
    initialValues: state !== null ? state.address : formObject,
    validationSchema: AddressSchema,
    onSubmit: (values) => {
      saveAddress(values);
    }
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{ display: "flex", justifyContent: "center" }}
      noValidate
    >
      <Grid container spacing={2}>
        {notify.isOpen && (
          <Grid item xs={12} sm={12}>
            <Alert severity="error" onClose={() => handleNotify(false)}>
              {notify.message}
            </Alert>
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <TextField
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
            fullWidth
            label="Full Name"
            variant="standard"
            type="text"
            id="fullName"
            required
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={() => handleNotify(false)}
            name="fullName"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            fullWidth
            label="Phone Number"
            variant="standard"
            type="number"
            id="phone"
            value={formik.values.phone}
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={() => handleNotify(false)}
            name="phone"
            slotProps={{ htmlInput: { maxLength: 10 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Pin Code"
            variant="standard"
            type="text"
            id="pinCode"
            value={formik.values.pinCode}
            readOnly
            name="pinCode"
            onFocus={() => handleNotify(false)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="State"
            variant="standard"
            type="url"
            id="state"
            value={formik.values.state}
            readOnly
            name="state"
            onFocus={() => handleNotify(false)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="City"
            variant="standard"
            type="text"
            id="city"
            required
            value={formik.values.city}
            name="city"
            onFocus={() => handleNotify(false)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={
              formik.touched.houseNumber && Boolean(formik.errors.houseNumber)
            }
            helperText={formik.touched.houseNumber && formik.errors.houseNumber}
            fullWidth
            label="House No., Building Name"
            variant="standard"
            type="text"
            id="houseNumber"
            required
            value={formik.values.houseNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={() => handleNotify(false)}
            name="houseNumber"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={formik.touched.nearBy && Boolean(formik.errors.nearBy)}
            helperText={formik.touched.nearBy && formik.errors.nearBy}
            fullWidth
            label="Add Nearby Famous Shop/Landmark"
            variant="standard"
            type="text"
            id="nearBy"
            required
            value={formik.values.nearBy}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={() => handleNotify(false)}
            name="nearBy"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Stack spacing={2} direction="column" justifyContent={"end"}>
            <Button variant="outlined" onClick={() => navigate("/checkout")}>
              Cancel
            </Button>
            <LoadingButton
              loading={loading}
              variant="contained"
              type="submit"
              disabled={!formik.isValid}
            >
              {state !== null ? "Update" : "Save"} address
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default React.memo(AddAdresses);
