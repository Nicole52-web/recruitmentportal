import React from "react";
import { useUserContext } from "../../context/UserContext";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "./Loading";

const CommonProtectRoute = ({ children }) => {
    const location = useLocation();
    // useUserContext is a custom hook that provides user state and loading state
    const { userLoading, user } = useUserContext();

    // If user data is still loading, return the Loading component
    if (userLoading) {
        return <Loading />;
    }

    // If user is authenticated (i.e., user object has an email), render the children components
    if (user?.email) {
        return children;
    }

     // If user is not authenticated, redirect to the login page
    // The state object is used to redirect the user back to the page they were trying to access after they log in
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default CommonProtectRoute;
