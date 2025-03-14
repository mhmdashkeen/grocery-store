import { Box, Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { addtocart, decreaseCartQuantity } from "../slice/Cart";

const CartIncDec = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minWidth: "100px",
        marginTop: "5px"
      }}
    >
      <Button
        size="small"
        variant="outlined"
        sx={{ minWidth: "28px" }}
        onClick={() => dispatch(decreaseCartQuantity(product))}
        disabled={product.quantity === 1}
      >
        -
      </Button>
      <span>{product.quantity}</span>
      <Button
        size="small"
        variant="contained"
        sx={{ minWidth: "28px" }}
        onClick={() => dispatch(addtocart(product))}
      >
        +
      </Button>
    </Box>
  );
};

export default React.memo(CartIncDec);
