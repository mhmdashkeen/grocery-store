import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredProducts } from "../slice/Product";

function Search() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.productsLists);

  const handleAutocomplete = (value) => {
    const filterProducts = products.filter((p) => p.name === value);
    dispatch(setFilteredProducts(filterProducts));
  };

  return (
    <Stack
      spacing={2}
      sx={{
        maxWidth: 500,
        width: "100%",
        justifySelf: "end",
        marginBottom: "1.5rem"
      }}
    >
      <Autocomplete
        freeSolo
        disableClearable
        id="free-solo-2-demo"
        options={products.map((p) => p.name)}
        onChange={(event, newValue) => handleAutocomplete(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search products"
            slotProps={{
              input: {
                ...params.InputProps,
                type: "search"
              }
            }}
            onChange={() => dispatch(setFilteredProducts(products))}
          />
        )}
      />
    </Stack>
  );
}

export default React.memo(Search);
