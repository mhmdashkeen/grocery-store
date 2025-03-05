import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAdminValue, signin } from "../slice/User";
import { useLocation, useNavigate } from "react-router";
import { LoadingButton } from "@mui/lab";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { LoginSchema } from "../utils/Schema";
import { Alert } from "@mui/material";

const formObject = {
  email: "",
  password: ""
};
const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
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

  const submitForm = (values) => {
    const { email, password } = values;
    setLoading(true);
    handleNotify(false);
    dispatch(signin({ email, password }))
      .unwrap()
      .then((data) => {
        console.log("DATA users", data);
        const { uid, displayName, email, photoURL } = data;
        sessionStorage.setItem(
          "userData",
          JSON.stringify({ uid, displayName, email, photoURL })
        );
        dispatch(getAdminValue({ uid }));
        setLoading(false);
        if (location.state !== null) {
          navigate(location.state.from.pathname);
        } else {
          navigate("/");
        }
      })
      .catch((e) => {
        setLoading(false);
        if (e.code === "auth/invalid-credential") {
          handleNotify(true, "Invalid username or password.");
        } else {
          handleNotify(
            true,
            "There is a problem on our end. Please try after sometime."
          );
        }
      });
  };

  const formik = useFormik({
    initialValues: formObject,
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      submitForm(values);
    }
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{ display: "flex", justifyContent: "center" }}
      noValidate
    >
      <Grid
        container
        maxWidth="sm"
        spacing={2}
        sx={{ marginTop: "1rem", justifyContent: "center" }}
      >
        {notify.isOpen && (
          <Grid item xs={12} sm={12}>
            <Alert severity="error" onClose={() => handleNotify(false)}>
              {notify.message}
            </Alert>
          </Grid>
        )}
        <Grid item xs={12} sm={12}>
          <TextField
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            fullWidth
            label="Email"
            variant="standard"
            type="email"
            id="email"
            required
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={() => handleNotify(false)}
            name="email"
            slotProps={{ htmlInput: { maxLength: 40 } }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            fullWidth
            label="Password"
            variant="standard"
            type="password"
            id="password"
            required
            minLength="8"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={() => handleNotify(false)}
            name="password"
            slotProps={{ htmlInput: { maxLength: 25, minLength: 8 } }}
          />
        </Grid>
        <Grid item xs={12} sm={12} sx={{ marginTop: "1rem" }}>
          <Stack spacing={2} direction="column" justifyContent={"end"}>
            <LoadingButton
              loading={loading}
              variant="contained"
              type="submit"
              fullWidth
              disabled={!formik.isValid}
            >
              <span>Login</span>
            </LoadingButton>
            <Button variant="outlined" onClick={() => navigate("/signup")}>
              Sign up
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default React.memo(Login);
