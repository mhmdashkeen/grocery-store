import React, { useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase-config";
import { signOut } from "@firebase/auth";
import { addUser, getAdminValue } from "./slice/User";
import { getCart } from "./slice/Cart";
import { ToastContainer } from 'react-toastify';
import Routing from "./Routing";
import { BrowserRouter as Router } from "react-router-dom";
import ScreenLoader from './components/ScreenLoader';
import Header from './components/Header';
import Footer from './components/Footer';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { hideSnackbar } from './slice/Snackbar';
import "./App.css";


const App = () =>{
    const dispatch = useDispatch();
    const snackbar =  useSelector(state => state.snackbar);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        dispatch(hideSnackbar());
    };
    
    useEffect(() => {
        const userIsThere = JSON.parse(sessionStorage.getItem("userData"));
        if(userIsThere){
            dispatch(addUser(userIsThere));
            dispatch(getAdminValue({uid: userIsThere.uid}));
        }else{
            sessionStorage.removeItem("userData");
            signOut(auth);
        }
    }, []);

    useEffect(() => {
        dispatch(getCart());
    }, []);

    return (
        <React.Fragment> 
            <Suspense fallback={<ScreenLoader />}>
                <Router>
                <Header/>
                <Container maxWidth="xl" sx={{paddingTop: "2rem"}}>
                    <Routing/>
                    </Container>
                <Footer />
                </Router>
            </Suspense>
            <ToastContainer />
            <Snackbar
                open={snackbar.isOpen}
                autoHideDuration={1500}
                onClose={handleClose}
                message={snackbar.message}
                action={<IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleClose}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>}
            /> 
        </React.Fragment>
    )
}

export default App;