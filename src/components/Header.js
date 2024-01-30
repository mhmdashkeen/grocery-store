import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { auth } from "./../firebase-config";
import { signOut } from "@firebase/auth";

const Header = ({cartItems}) => {
    const loggedInUser = useSelector(state => state.products.loggedInUser);
    const logout = () => {
        signOut(auth);
        localStorage.removeItem("user");
        localStorage.removeItem("userData");
        location.href = "/";
    }
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
                bezKoder
            </Link>
            <div className="navbar-nav mr-auto">
                <li className="nav-item">
                {loggedInUser?.isAdmin && <Link to={"/add"} className="nav-link">
                    Add
                </Link>}
                </li>
                <li className="nav-item">
                <Link to={"/"} className="nav-link">
                    Products
                </Link>
                </li>
            </div>
            <div className="navbar-nav">
                <li className="nav-item nav-link">
                    {loggedInUser?.name}
                </li>
            </div>
            {!loggedInUser && <><Link to={"/login"} className="nav-link">
                Login
            </Link><Link to={"/signup"} className="nav-link">
                    Signup
                </Link></>}
            <div className="navbar-nav">
                <Link to={"/cart"} className="btn btn-secondary">
                    Cart <span className="badge badge-light">{cartItems.length}</span>
                </Link>
            </div>
            {loggedInUser && <button type="button" onClick={logout} className="btn btn-default btn-primary">
                Logout
            </button>}
        </nav>
    );
}
 
export default React.memo(Header);