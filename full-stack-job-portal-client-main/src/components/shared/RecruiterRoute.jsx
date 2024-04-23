import { Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import Loading from "./Loading";

const RecruiterRoute = ({ children }) => {
    const location = useLocation();
    const { userLoading, user } = useUserContext();

    if (userLoading) {
        return <Loading />;
    }

    // If the user is logged in (i.e., has an email) and is a recruiter, render the children
    if (user?.email && user?.role === "recruiter") {
        return children;
    }

    // If the user is not a recruiter or not logged in, navigate to the home page
    return <Navigate to="/" />;
};

export default RecruiterRoute;
