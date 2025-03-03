import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { LoadingButton } from "@mui/lab";
import Grid from "@mui/material/Grid";
import { updateUserAddress } from "../slice/User";

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
  const [formValues, setFormValues] = useState(
    state !== null ? state.address : formObject
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const saveAddress = () => {
    setLoading(true);
    const updateAddress = { ...loggedInUser, address: formValues };
    dispatch(updateUserAddress(updateAddress))
      .unwrap()
      .then(() => {
        setFormValues(formObject);
        setLoading(false);
        console.log("Success");
        sessionStorage.setItem("userData", JSON.stringify(updateAddress));
        navigate("/checkout");
      })
      .catch((e) => {
        console.log("API Error", e.message);
        setLoading(false);
        toast(e.message);
      });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Full Name"
          variant="standard"
          type="text"
          id="fullName"
          required
          value={formValues.fullName}
          onChange={(e) => {
            setFormValues((prevState) => ({
              ...prevState,
              fullName: e.target.value
            }));
          }}
          name="fullName"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Phone Number"
          variant="standard"
          type="text"
          id="phone"
          value={formValues.phone}
          required
          onChange={(e) => {
            setFormValues((prevState) => ({
              ...prevState,
              phone: e.target.value
            }));
          }}
          name="phone"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Pin Code"
          variant="standard"
          type="text"
          id="pinCode"
          value={formValues.pinCode}
          readOnly
          name="pinCode"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="State"
          variant="standard"
          type="url"
          id="state"
          value={formValues.state}
          readOnly
          name="state"
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
          value={formValues.city}
          onChange={(e) => {
            setFormValues((prevState) => ({
              ...prevState,
              city: e.target.value
            }));
          }}
          name="city"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="House No., Building Name"
          variant="standard"
          type="text"
          id="houseNumber"
          required
          value={formValues.houseNumber}
          onChange={(e) => {
            setFormValues((prevState) => ({
              ...prevState,
              houseNumber: e.target.value
            }));
          }}
          name="houseNumber"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Add Nearby Famous Shop/Landmark"
          variant="standard"
          type="text"
          id="nearBy"
          required
          value={formValues.nearBy}
          onChange={(e) => {
            setFormValues((prevState) => ({
              ...prevState,
              nearBy: e.target.value
            }));
          }}
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
            onClick={saveAddress}
          >
            Save address
          </LoadingButton>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default React.memo(AddAdresses);
