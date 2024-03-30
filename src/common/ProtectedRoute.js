import React from "react";
import {Navigate, useLocation} from "react-router-dom";

const ProtectedRoute = ({children})=> {
    const location = useLocation();
    // const user = JSON.parse(localStorage.getItem('user'));
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if(userData === null){
        return <Navigate to="/login" state={{ from: location}} replace />
    }

    if(userData && userData.isAdmin === true) {
        return children;
    }

    return children;
}
 
export default ProtectedRoute;