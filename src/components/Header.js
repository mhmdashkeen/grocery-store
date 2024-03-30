import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { auth } from "./../firebase-config";
import { signOut } from "@firebase/auth";
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { stringAvatar } from '../utils/helper';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Header = () => {
    const cartItems = useSelector(state => state.cart);
    const loggedInUser = useSelector(state => state.loggedInUser);
    console.log(loggedInUser, "Logged In");
    const logout = () => {
        signOut(auth);
        sessionStorage.removeItem("user");
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
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark"  style={{justifyContent: "space-between"}}>
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
                <li className="nav-item">
                    <Link to={"/about"} className="nav-link">
                        About us
                    </Link>
                </li>
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
                <li className="nav-item">
                    <Link to={"/wishlist"} className="nav-link">
                        Wishlist
                    </Link>
                </li>
                {loggedInUser && <li className="nav-item">
                <Link to={"/orders"} className="nav-link">
                    Orders
                </Link>
                </li>}
                <li className="nav-item">
                    <Link to={"/cart"} className="btn btn-secondary">
                        Cart <span className="badge badge-light">{cartItems.length}</span>
                    </Link>
                </li>
            </div>
            {!loggedInUser && <><Link to={"/login"} className="nav-link">
                Login
            </Link><Link to={"/signup"} className="nav-link">
                    Register
                </Link></>}
            <div className="navbar-nav">
                {loggedInUser && <><Avatar {...stringAvatar(loggedInUser.name)} onClick={handleClick}/>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={() => {
                        handleClose();
                        logout();
                    }
                    }>Logout</MenuItem>
                </Menu></>
                }
            </div>
            </div>
        </nav>
    );
}
 
export default React.memo(Header);