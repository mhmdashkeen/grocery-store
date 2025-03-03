import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAdminValue, signin } from "../slice/User";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const formObject = {
  email: "",
  password: ""
};
const Login = () => {
  const [formValues, setFormValues] = useState(formObject);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const submitForm = (e) => {
    e.preventDefault();
    const { email, password } = formValues;
    setLoading(true);
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
        console.log("API Error", e);
        setLoading(false);
        toast(e.message);
      });
  };
  return (
    <form
      onSubmit={submitForm}
      style={{ display: "flex", justifyContent: "center" }}
      noValidate
    >
      <Grid
        container
        maxWidth="sm"
        spacing={2}
        sx={{ marginTop: "1rem", justifyContent: "center" }}
      >
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            label="Email"
            variant="standard"
            type="email"
            id="email"
            required
            value={formValues.email}
            onChange={(e) => {
              setFormValues((prevState) => ({
                ...prevState,
                email: e.target.value
              }));
            }}
            name="email"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            label="Password"
            variant="standard"
            type="password"
            id="password"
            required
            minLength="8"
            value={formValues.password}
            onChange={(e) => {
              setFormValues((prevState) => ({
                ...prevState,
                password: e.target.value
              }));
            }}
            name="password"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Stack spacing={2} direction="column" justifyContent={"end"}>
            <LoadingButton
              loading={loading}
              variant="contained"
              type="submit"
              fullWidth
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
