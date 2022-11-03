import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute:any = () => {
    let auth = localStorage.getItem('jwt')
    console.log(auth);
    
    return(
        auth ? <Outlet />: <Navigate to="/login"/>
    )
}

export default PrivateRoute;

