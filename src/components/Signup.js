import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addUser, signup } from "../slice/User";
import { updateProfile } from "@firebase/auth";
import { USER_AVATAR } from "../utils/constants";
import { auth, db } from "../firebase-config";
import { LoadingButton } from "@mui/lab";
import { Alert } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { collection, addDoc } from "@firebase/firestore";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { SignupSchema } from "../utils/Schema";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: ""
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usersRef = collection(db, "users");

  const handleNotify = (isOpen, message = "") => {
    setNotify(() => ({
      isOpen,
      message
    }));
  };

  const submitForm = (values) => {
    const { name, email, password } = values;
    setLoading(true);
    handleNotify(false);
    dispatch(signup({ name, email, password }))
      .unwrap()
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: USER_AVATAR
        }).then(async () => {
          const { uid, displayName, email, photoURL } = auth.currentUser;
          dispatch(addUser({ uid, displayName, email, photoURL }));
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
        if (e.code === "auth/email-already-in-use") {
          handleNotify(true, "This email is already in use.");
        } else {
          handleNotify(
            true,
            "There is a problem on our end. Please try after sometime."
          );
        }
      });
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: ""
    },
    validationSchema: SignupSchema,
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
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            fullWidth
            label="Name"
            variant="standard"
            type="text"
            id="name"
            required
            value={formik.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={() => handleNotify(false)}
            name="name"
            slotProps={{ htmlInput: { maxLength: 25 } }}
          />
        </Grid>
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
