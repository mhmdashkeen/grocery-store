import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addUser, signup } from "../slice/User";
import { toast } from "react-toastify";
import { updateProfile } from "@firebase/auth";
import { USER_AVATAR } from "../utils/constants";
import { auth, db } from "../firebase-config";
import { LoadingButton } from "@mui/lab";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { collection, addDoc } from "@firebase/firestore";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const formObject = {
  name: "",
  email: "",
  password: ""
};
const Signup = () => {
  const [formValues, setFormValues] = useState(formObject);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usersRef = collection(db, "users");

  const submitForm = (e) => {
    e.preventDefault();
    const { name, email, password } = formValues;
    setLoading(true);
    dispatch(signup({ name, email, password }))
      .unwrap()
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: USER_AVATAR
        }).then(async () => {
          const { uid, displayName, email, photoURL } = auth.currentUser;
          dispatch(addUser({ uid, displayName, email, photoURL }));
          console.log("USER", auth.currentUser);
          sessionStorage.setItem(
            "userData",
            JSON.stringify({ uid, displayName, email, photoURL })
          );
          await addDoc(usersRef, { uid, displayName, email, photoURL });
        });
        setLoading(false);
        navigate("/");
      })
      .catch((e) => {
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
            label="Name"
            variant="standard"
            type="text"
            id="name"
            required
            minLength="3"
            value={formValues.name}
            onChange={(e) => {
              setFormValues((prevState) => ({
                ...prevState,
                name: e.target.value
              }));
            }}
            name="name"
          />
        </Grid>
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
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Stack spacing={2} direction="column" justifyContent={"end"}>
            <LoadingButton
              loading={loading}
              variant="contained"
              type="submit"
              fullWidth
              sx={{ marginTop: "1rem" }}
            >
              <span>Signup</span>
            </LoadingButton>
            <Button variant="outlined" onClick={() => navigate("/login")}>
              Login
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default React.memo(Signup);
