import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProducts } from "../slice/Product";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const ProductCard = ({product}) => {
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => state.loggedInUser);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    return (
        <div className="col-3" key={product.id}>
            <div className="card">
                <img src={product.thumbnail} className="card-img-top" alt=""/>
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text" title={product.description}>{product.description}</p>
                    <p className="card-text" title={product.price}>${product.price}</p>
                    {loggedInUser?.isAdmin && (
                        <>
                            <div style={{position: "absolute", top:"0", right: "0", backgroundColor: "#fff", borderRadius: "2px"}}>
                                <Link to={`/edit/${product.id}`} state={{"product": product}}>
                                    <IconButton aria-label="delete" color="primary" >
                                        <EditIcon />
                                    </IconButton>
                                </Link>
                                <IconButton aria-label="delete" color="primary" onClick={handleOpen}>
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
                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                            Confirm
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            Are you sure you want to delete product/
                                        </Typography>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button variant="contained" onClick={() => dispatch(deleteProducts(product.id))}>Delete</Button>
                                    </Box>
                                </Modal>
                             </div>
                        </>
                    )}
                    <Link to={`/products/${product.id}`} state={{"product": product}}><Button variant="contained" style={{width: "100%"}}>View Details</Button></Link>
                </div>
            </div>
        </div>
    );
}
 
export default React.memo(ProductCard);