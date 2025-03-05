import * as React from "react";
import Box from "@mui/material/Box";
import AddProduct from "./AddProduct";
import { useSelector } from "react-redux";

export default function BasicTabs() {
  const loggedInUser = useSelector((state) => state.loggedInUser);

  if (loggedInUser && !loggedInUser.isAdmin) {
    return <h1>You are not authorized to access this page.</h1>;
  }
  return (
    <Box sx={{ width: "100%" }}>
      <AddProduct />
    </Box>
  );
}
