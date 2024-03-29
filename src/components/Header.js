import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { auth } from "./../firebase-config";
import { signOut } from "@firebase/auth";
import Button from '@mui/material/Button';

const Header = ({cartItems}) => {
    const loggedInUser = useSelector(state => state.products.loggedInUser);
    const logout = () => {
        signOut(auth);
        localStorage.removeItem("user");
        localStorage.removeItem("userData");
        location.href = "/";
    }
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark"  style={{justifyContent: "space-between"}}>
            <Link to={"/"} className="navbar-brand">
                bezKoder
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
            </div>
            <div className="navbar-nav">
                {loggedInUser && <li className="nav-item nav-link">
                    {loggedInUser.name}
                </li>}
                <Link to={"/cart"} className="btn btn-secondary">
                    Cart <span className="badge badge-light">{cartItems.length}</span>
                </Link>
            </div>
            {!loggedInUser && <><Link to={"/login"} className="nav-link">
                Login
            </Link><Link to={"/signup"} className="nav-link">
                    Register
                </Link></>}
            {loggedInUser && <Button variant="contained" onClick={logout}>Logout</Button>}
            </div>
        </nav>
    );
}
 
export default React.memo(Header);