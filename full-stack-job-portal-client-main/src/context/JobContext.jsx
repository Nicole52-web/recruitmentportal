import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { getAllHandler } from "../utils/FetchHandlers";


// Creating a context for jobs
const jobContext = React.createContext();

const JobContext = ({ children }) => {

      // State variables for job loading status, job error status and message, and jobs data
    const [jobLoading, setJobLoading] = useState(true);
    const [jobError, setJobError] = useState({ status: false, message: "" });
    const [jobs, setJobs] = useState({});

    const handleJobFetch = async (url) => {
        setJobLoading(true);
        try {
             // Making GET request to API
            const response = await axios.get(url, { withCredentials: true });
            setJobError({ status: false, message: "" });
            setJobs(response?.data);
        } catch (error) {
            setJobError({ status: true, message: error?.message });
            setJobs({ status: false });
            setJobLoading(false);
        }
        setJobLoading(false);
    };


    // Effect hook to fetch jobs data when component mounts
    useEffect(() => {
        handleJobFetch(
            `http://localhost:3000/api/v1/jobs?page=1`
        );
    }, []);

    // Object to pass as value to context provider
    const passing = {
        jobLoading,
        jobError,
        jobs,
        setJobs,
        handleJobFetch,
    };


    // Returning context provider with passing object as value
    return (
        <jobContext.Provider value={passing}>{children}</jobContext.Provider>
    );
};

// Custom hook to use job context
const useJobContext = () => useContext(jobContext);

// Exporting custom hook and JobContext component
export { useJobContext, JobContext };
