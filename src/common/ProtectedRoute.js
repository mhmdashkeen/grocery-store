import React from "react";
import {Navigate, useLocation} from "react-router-dom";

const ProtectedRoute = ({children})=> {
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user'));
    const userData = JSON.parse(localStorage.getItem('userData'));

    if(user === null && userData === null){
        return <Navigate to="/login" state={{ from: location}} replace />
    }

    if(user !== null && userData.isAdmin === undefined) {
        return <Navigate to={location.pathname} state={{ from: location}} replace />;
    }

    return children;
}
 
export default ProtectedRoute;