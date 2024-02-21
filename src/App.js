import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./firebase-config";
import { onAuthStateChanged } from "@firebase/auth";
import { getCart, getUser, signinWithPhone } from "./slice/Product";
import { toast, ToastContainer } from 'react-toastify';
import Routing from "./Routing";
import "./App.css";


const App = () =>{
    const dispatch = useDispatch();
    
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(user){
                dispatch(getUser(user))
                .unwrap()
                .then((data) => {
                  console.log("Response Data", data);
                  localStorage.setItem("userData", JSON.stringify(data));
                })
                .catch((e) => {
                  toast(e.message);
                })
                localStorage.setItem("user", JSON.stringify(user));
            }
            else{
                localStorage.removeItem("user");
                localStorage.removeItem("userData");
            }
        });
        dispatch(getCart());
    }, []);
    return (
        <React.Fragment>
            <Routing/>
            <ToastContainer />
        </React.Fragment>
    )
}

export default App;