import React, { useContext, useEffect, useState } from "react";
import axios from "axios";


// Creating a context for user
const userContext = React.createContext();

const UserContext = ({ children }) => {
     // State variables for user loading status, user error status and message, and user data
    const [userLoading, setUserLoading] = useState(true);
    const [userError, setUserError] = useState({ status: false, message: "" });
    const [user, setUser] = useState({});

    const handleFetchMe = async () => {
        setUserLoading(true);
        try {
            // Making GET request to API
            const response = await axios.get(
                `http://localhost:3000/api/v1/auth/me`,
                { withCredentials: true }
            );
            setUserError({ status: false, message: "" });
            setUser(response?.data?.result);
        } catch (error) {
            setUserError({ status: true, message: error?.message });
            setUser({ status: false });
        }
        setUserLoading(false);
    };


     // Effect hook to fetch user data when component mounts
    useEffect(() => {
        handleFetchMe();
    }, []);


    // Object to pass as value to context provider
    const passing = { userLoading, userError, user, handleFetchMe };

     // Returning context provider with passing object as value
    return (
        <userContext.Provider value={passing}>{children}</userContext.Provider>
    );
};


// Custom hook to use user context
const useUserContext = () => useContext(userContext);


// Exporting custom hook and UserContext component
export { useUserContext, UserContext };
