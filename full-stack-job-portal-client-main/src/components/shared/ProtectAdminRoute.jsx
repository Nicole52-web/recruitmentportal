import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import Loading from "./Loading";

const ProtectAdminRoute = ({ children }) => {
    const location = useLocation();
    const { userLoading, user } = useUserContext();

    if (userLoading) {
        return <Loading />;
    }

    // If the user is logged in (i.e., has an email) and is an admin, render the children
    if (user?.email && user?.role === "admin") {
        return children;
    }

    // If the user is not an admin or not logged in, navigate to the home page
    return <Navigate to="/" />;
};

export default ProtectAdminRoute;
