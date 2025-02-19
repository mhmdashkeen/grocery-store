import React, { useEffect, Suspense } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./firebase-config";
import { signOut } from "@firebase/auth";
import { addUser, getAdminValue } from "./slice/User";
import { ToastContainer } from 'react-toastify';
import Routing from "./Routing";
import { BrowserRouter as Router } from "react-router-dom";
import ScreenLoader from './components/ScreenLoader';
import "./App.css";


const App = () =>{
    const dispatch = useDispatch();
    
    useEffect(() => {
        const userIsThere = JSON.parse(sessionStorage.getItem("userData"));
        if(userIsThere){
            const { uid } = userIsThere;
            dispatch(getAdminValue({uid}));
        }else{
            sessionStorage.removeItem("userData");
            signOut(auth);
        }
    }, []);
    return (
        <React.Fragment>
            <Suspense fallback={<ScreenLoader />}>
                <Router>
                    <Routing/>
                </Router>
            </Suspense>
            <ToastContainer />
        </React.Fragment>
    )
}

export default App;