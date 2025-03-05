import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, editProduct } from "../slice/Product";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { LoadingButton } from "@mui/lab";
import Grid from "@mui/material/Grid";
import { AddProductSchema } from "./../utils/Schema";
import { useFormik } from "formik";
import { showSnackbar } from "../slice/Snackbar";
import { Alert } from "@mui/material";

const formObject = {
  name: "",
  description: "",
  buyPrice: 0,
  sellPrice: 0,
  category: "",
  discount: 0,
  brand: "",
  weight: "",
  available: "yes",
  saleIn: "kg",
  profit: 0,
  profitPercentage: 0,
  thumbnail: ""
};
const AddProduct = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(
    state !== null ? state.product : formObject
  );
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

  const saveProduct = (values) => {
    setLoading(true);
    handleNotify(false);
    if (state !== null) {
      dispatch(editProduct(values))
        .unwrap()
        .then(() => {
          setLoading(false);
          console.log("Success");
          dispatch(showSnackbar("Updated product successfully."));
        })
        .catch((e) => {
          setLoading(false);
          handleNotify(
            true,
            "There is a problem on our end. Please try after sometime."
          );
        });
    } else {
      dispatch(addProduct(values))
        .unwrap()
        .then(() => {
          setLoading(false);
          dispatch(showSnackbar("Added product successfully."));
        })
        .catch((e) => {
          setLoading(false);
          handleNotify(
            true,
            "There is a problem on our end. Please try after sometime."
          );
        });
    }
  };

  const handleCancel = () => {
    setFormValues(formObject);
    navigate("/");
  };

  const handleSellChange = (e) => {
    const profit = e.target.value - formValues.buyPrice;
    const profitPercentage =
      Math.floor(
        ((e.target.value - formValues.buyPrice) * 100) / e.target.value
      ) + "%";
    setFormValues((prevState) => ({
      ...prevState,
      profit,
      profitPercentage
    }));
  };

  const handleBuyChange = (e) => {
    const profit = formValues.sellPrice - e.target.value;
    const profitPercentage =
      Math.floor(parseInt((profit * 100) / formValues.sellPrice)) + "%";
    setFormValues((prevState) => ({
      ...prevState,
      profit,
      profitPercentage
    }));
  };
  const loggedInUser = useSelector((state) => state.loggedInUser);

  const formik = useFormik({
    initialValues: state !== null ? state.product : formObject,
    validationSchema: AddProductSchema,
    onSubmit: (values) => {
      console.log("Values", values);
      saveProduct(values);
    }
  });

  if (loggedInUser && !loggedInUser.isAdmin) {
    return <h1>You are not authorized to access this page.</h1>;
  }
  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{ display: "flex", justifyContent: "center" }}
      noValidate
    >
      <Grid container spacing={4}>
        {notify.isOpen && (
          <Grid item xs={12} sm={12}>
            <Alert severity="error" onClose={() => handleNotify(false)}>
              {notify.message}
            </Alert>
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <TextField
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            fullWidth
            label="Name"
            variant="standard"
            type="text"
            id="name"
            required
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={() => handleNotify(false)}
            name="name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={formik.touched.buyPrice && Boolean(formik.errors.buyPrice)}
            helperText={formik.touched.buyPrice && formik.errors.buyPrice}
            fullWidth
            label="Buy price"
            variant="standard"
            type="number"
            id="buyPrice"
            required
            value={formik.values.buyPrice}
            onChange={formik.handleChange}
            onBlur={(e) => {
              handleBuyChange(e);
              formik.handleBlur();
            }}
            onFocus={() => handleNotify(false)}
            name="buyPrice"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={formik.touched.sellPrice && Boolean(formik.errors.sellPrice)}
            helperText={formik.touched.sellPrice && formik.errors.sellPrice}
            fullWidth
            label="Sell Price"
            variant="standard"
            type="number"
            id="sellPrice"
            required
            value={formik.values.sellPrice}
            onChange={formik.handleChange}
            onBlur={(e) => {
              handleSellChange(e);
              formik.handleBlur();
            }}
            onFocus={() => handleNotify(false)}
            name="sellPrice"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Profit"
            variant="standard"
            type="number"
            id="profit"
            value={formik.values.profit}
            readOnly
            name="profit"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Profit Percentage"
            variant="standard"
            type="text"
            id="profitPercentage"
            value={formik.values.profitPercentage}
            readOnly
            name="profitPercentage"
            onFocus={() => handleNotify(false)}
          />
        </Grid>
        {parseInt(formValues.profitPercentage) > 10 ? (
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Discount"
              variant="standard"
              type="number"
              id="discount"
              required
              value={formik.values.discount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onFocus={() => handleNotify(false)}
              name="discount"
            />
          </Grid>
        ) : (
          ""
        )}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Brand"
            variant="standard"
            type="text"
            id="brand"
            required
            value={formik.values.brand}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={() => handleNotify(false)}
            name="brand"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={formik.touched.weight && Boolean(formik.errors.weight)}
            helperText={formik.touched.weight && formik.errors.weight}
            fullWidth
            label="Weight"
            variant="standard"
            type="number"
            id="weight"
            required
            value={formik.values.weight}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={() => handleNotify(false)}
            name="weight"
          />
          <p>In gram</p>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="available">Available</InputLabel>
            <Select
              labelId="available"
              id="available"
              value={formik.values.available}
              onChange={formik.handleChange}
              onFocus={() => handleNotify(false)}
              label="available"
              name="available"
            >
              <MenuItem key="yes" value="yes">
                Yes
              </MenuItem>
              <MenuItem key="no" value="no">
                No
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="saleIn">SaleIn</InputLabel>
            <Select
              labelId="saleIn"
              id="saleIn"
              value={formik.values.saleIn}
              onChange={formik.handleChange}
              onFocus={() => handleNotify(false)}
              label="saleIn"
              name="saleIn"
            >
              <MenuItem key="kg" value="kg">
                KG
              </MenuItem>
              <MenuItem key="packet" value="packet">
                Packet
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Thumbnail"
            variant="standard"
            type="url"
            id="thumbnail"
            value={formik.values.thumbnail}
            onChange={formik.handleChange}
            onFocus={() => handleNotify(false)}
            name="thumbnail"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Stack spacing={2} direction="row" justifyContent={"end"}>
            <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
            <LoadingButton
              loading={loading}
              variant="contained"
              type="submit"
              disabled={!formik.isValid}
            >
              <span>{state !== null ? "Update" : "Add"} Product</span>
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default React.memo(AddProduct);
