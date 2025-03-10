import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import "./ListingProduct.css";
import { useNavigate, Link } from "react-router-dom";
import { deleteProducts } from "../../slice/Product";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { LoadingButton } from "@mui/lab";
import { addtocart } from "../../slice/Cart";
import { showSnackbar } from "../../slice/Snackbar";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027"
  })
}));

function ListingProduct(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    name,
    thumbnail,
    category,
    sellPrice,
    discount,
    saleIn,
    weight,
    id,
    brand,
    available
  } = props.data;
  const [rate, setRate] = React.useState(10);
  const [gram, setGram] = React.useState(Math.floor((10 / sellPrice) * 1000));
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [checked, setChecked] = React.useState(true);
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const deleteLoading = useSelector((state) => state.products.deleteLoading);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    padding: "10px"
  };
  // console.log("PROPS", props.data);
  return (
    <Grid size={{ xs: 6, sm: 6, md: 4, lg: 3 }}>
      <Item>
        <div className="listing--container">
          <div className="listing--link">
            <Link to={`/products/${id}`} state={{ product: props.data }}>
              {thumbnail && (
                <div className="listing--image--container">
                  <div className="listing--image--div">
                    <LazyLoadImage
                      className="listing--image"
                      alt={name}
                      src={thumbnail}
                    />
                  </div>
                </div>
              )}
            </Link>
            <div className="listing--details--section">
              {category && <div className="listing--category">{category}</div>}
              <div className="listing--name">{name}</div>
              <div className="listing--price">
                <div className="listing--price--original">
                  ₹{`${sellPrice - parseInt(discount ? discount : 0)}`}
                </div>
                {discount > 0 ? (
                  <>
                    <div className="listing--price--mrp">₹{sellPrice}</div>
                    <div className="listing--price--discount">
                      (₹{discount} off)
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="listing--details--weight">
                <span className="listing--size--span">
                  {saleIn !== "kg" ? "Qty:" : "Weight:"}
                </span>{" "}
                <span className="weight">
                  {saleIn !== "kg"
                    ? 1
                    : weight < 1000
                      ? weight + " g"
                      : weight / 1000 + " Kg"}
                </span>
                <div className="listing--details--brand">
                  <span className="listing--size--span">Brand:</span>{" "}
                  <span className="weight">{brand ? brand : "NA"}</span>
                </div>
              </div>
              {loggedInUser?.isAdmin && (
                <>
                  <span>g/₹</span>
                  <Switch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <span>₹/g</span>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {checked && (
                      <>
                        <span>₹</span>
                        <TextField
                          fullWidth
                          label=""
                          placeholder="Enter rupees to check gram"
                          variant="standard"
                          type="number"
                          id="rate"
                          value={rate}
                          onChange={(e) => setRate(e.target.value)}
                          name="rate"
                        />
                        <span>
                          /{Math.floor((rate / sellPrice) * 1000) + "g"}
                        </span>
                      </>
                    )}
                    {!checked && (
                      <>
                        <TextField
                          label=""
                          placeholder="Enter rupees to check gram"
                          variant="standard"
                          type="number"
                          id="gram"
                          value={gram}
                          onChange={(e) => setGram(e.target.value)}
                          name="gram"
                        />
                        <span>g</span>
                        <span>/₹{Math.ceil((sellPrice / 1000) * gram)}</span>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
            {loggedInUser?.isAdmin && (
              <>
                <div
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    backgroundColor: "#fff",
                    borderRadius: "2px",
                    zIndex: "2",
                    boxShadow:
                      "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)"
                  }}
                >
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    onClick={() =>
                      navigate("/edit", { state: { product: props.data } })
                    }
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    onClick={handleOpen}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
                <div>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Confirm
                      </Typography>
                      <Typography
                        id="modal-modal-description"
                        sx={{ mt: 2, mb: 2 }}
                      >
                        Are you sure you want to delete this product?
                      </Typography>
                      <Stack spacing={2}>
                        <Button onClick={handleClose}>Cancel</Button>
                        <LoadingButton
                          loading={deleteLoading}
                          variant="contained"
                          onClick={() => dispatch(deleteProducts(id))}
                          sx={{ marginTop: "1rem" }}
                        >
                          <span>Delete</span>
                        </LoadingButton>
                      </Stack>
                    </Box>
                  </Modal>
                </div>
              </>
            )}
            {available === "no" ? (
              <div className="out-of-stock">Out of stock</div>
            ) : (
              <Stack spacing={2}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    dispatch(addtocart(props.data));
                    dispatch(showSnackbar("Item added to cart."));
                  }}
                >
                  Add to cart
                </Button>
              </Stack>
            )}
          </div>
        </div>
      </Item>
    </Grid>
  );
}
export default React.memo(ListingProduct);
