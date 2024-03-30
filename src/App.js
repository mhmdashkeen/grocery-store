import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./firebase-config";
import { onAuthStateChanged } from "@firebase/auth";
import { getUser, signinWithPhone } from "./slice/User";
import { getCart } from "./slice/Cart";
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
                  sessionStorage.setItem("userData", JSON.stringify(data));
                })
                .catch((e) => {
                  toast(e.message);
                })
                sessionStorage.setItem("user", JSON.stringify(user));
            }
            else{
                sessionStorage.removeItem("user");
                sessionStorage.removeItem("userData");
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