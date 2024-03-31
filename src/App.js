import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./firebase-config";
import { signOut } from "@firebase/auth";
import { addUser } from "./slice/User";
import { ToastContainer } from 'react-toastify';
import Routing from "./Routing";
import "./App.css";


const App = () =>{
    const dispatch = useDispatch();
    
    useEffect(() => {
        const userIsThere = JSON.parse(sessionStorage.getItem("userData"));
        if(userIsThere){
            const { uid, displayName, email, photoURL } = userIsThere;
            dispatch(addUser({
                uid,
                displayName,
                email,
                photoURL
            }));
        }else{
            sessionStorage.removeItem("userData");
            signOut(auth);
        }
    }, []);
    return (
        <React.Fragment>
            <Routing/>
            <ToastContainer />
        </React.Fragment>
    )
}

export default App;