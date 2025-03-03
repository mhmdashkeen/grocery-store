import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./common/ProtectedRoute";
import { useSelector } from "react-redux";

// const About = lazy(() => import('./components/AboutUs'));
const Home = lazy(() => import("./components/Home"));
const ProductListing = lazy(() => import("./components/ProductListing"));
const SingleProduct = lazy(() => import("./components/SingleProduct"));
const Signup = lazy(() => import("./components/Signup"));
const Login = lazy(() => import("./components/Login"));
const LoginOTP = lazy(() => import("./components/LoginOTP"));
const Orders = lazy(() => import("./components/Orders"));
const Checkout = lazy(() => import("./components/Checkout"));
const AddProduct = lazy(() => import("./components/AddProduct"));
const Cart = lazy(() => import("./components/Cart"));
const Add = lazy(() => import("./components/Add"));
const AddAdresses = lazy(() => import("./components/AddAdresses"));
const AllOrders = lazy(() => import("./components/AllOrders"));

const Routing = () => {
  const loggedInUser = useSelector((state) => state.loggedInUser);
  return (
    <Routes>
      <Route path="/cart" element={<Cart />} />
      <Route
        path="/add"
        element={
          <ProtectedRoute>
            <Add />
          </ProtectedRoute>
        }
      />{" "}
      {/* protected route */}
      <Route
        path="/edit"
        element={
          <ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />{" "}
      {/* protected route */}
      <Route
        path="/adminOrders"
        element={
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />{" "}
      {/* protected route */}
      <Route
        path="/login"
        element={loggedInUser ? <Navigate to="/products" /> : <Login />}
      />
      <Route
        path="/login-otp"
        element={loggedInUser ? <Navigate to="/products" /> : <LoginOTP />}
      />
      <Route
        path="/signup"
        element={loggedInUser ? <Navigate to="/products" /> : <Signup />}
      />
      <Route path="/products/:id" element={<SingleProduct />} />
      <Route path="/products" element={<ProductListing />} />
      <Route
        path="/adresses"
        element={
          <ProtectedRoute>
            <AddAdresses />
          </ProtectedRoute>
        }
      />{" "}
      {/* protected route */}
      <Route exact path="/" element={<Home />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default Routing;
