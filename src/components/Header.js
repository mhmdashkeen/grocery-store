import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { auth } from "./../firebase-config";
import { signOut } from "@firebase/auth";
import Avatar from '@mui/material/Avatar';
import { stringAvatar } from '../utils/helper';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { getCart } from "../slice/Cart";


const Header = () => {
    const cartItems = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => state.loggedInUser);
    // console.log("Logged", loggedInUser);

    const logout = () => {
        signOut(auth);
        sessionStorage.removeItem("userData");
        location.href = "/";
    }
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    useEffect(() => {
        dispatch(getCart());
    }, []);

    return (
        
            <nav className="navbar navbar-expand navbar-dark bg-dark"  style={{justifyContent: "space-between"}}>
                <div className='container' style={{paddingLeft: "15px", paddingRight: "15px"}}>
                    <Link to={"/"} className="navbar-brand">
                        Ecommerce
                    </Link>
                    <div style={{display: "flex"}}>
                    <div className="navbar-nav">
                        <li className="nav-item">
                        <Link to={"/"} className="nav-link">
                            Home
                        </Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link to={"/about"} className="nav-link">
                                About us
                            </Link>
                        </li> */}
                        {loggedInUser?.isAdmin && <li className="nav-item">
                        <Link to={"/add"} className="nav-link">
                            Add
                        </Link>
                        </li>}
                        <li className="nav-item">
                            <Link to={"/products"} className="nav-link">
                                Products
                            </Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link to={"/wishlist"} className="nav-link">
                                Wishlist
                            </Link>
                        </li> */}
                        {/* {loggedInUser && <li className="nav-item">
                        <Link to={"/orders"} className="nav-link">
                            Orders
                        </Link>
                        </li>}
                        <li className="nav-item">
                            <Link to={"/cart"} className="btn btn-secondary">
                                Cart <span className="badge badge-light">{cartItems.length}</span>
                            </Link>
                        </li> */}
                    </div>
                    {!loggedInUser && <><Link to={"/login"} className="nav-link">
                        Login
                    </Link><Link to={"/signup"} className="nav-link">
                            Register
                        </Link></>}
                    <div className="navbar-nav">
                        {loggedInUser && (<>{loggedInUser.photoURL ? <img src={loggedInUser.photoURL} alt="Avatar" style={{width: "38px", height: "38px", borderRadius: "50%", marginLeft: "8px", cursor: "pointer"}} onClick={handleClick}/> : <Avatar onClick={handleClick}/>}
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                        >
                            {loggedInUser.displayName ? <MenuItem>{loggedInUser.displayName}</MenuItem> : ""}
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={() => {
                                handleClose();
                                logout();
                            }
                            }>Logout</MenuItem>
                        </Menu></>)
                        }
                    </div>
                    </div>
                </div>
            </nav>
    );
}
 
export default React.memo(Header);