import axios from "axios";

// Function to get all data from a specific URL
export const getAllHandler = async (url) => {
        // Making a GET request to the provided URL
    const res = await axios.get(url);
    // Returning the data from the response
    return res.data;
};


// Function to get a single item from a specific URL
export const getSingleHandler = async (url) => {
    // Making a GET request to the provided URL
    const res = await axios.get(url);
    // Returning the result from the response data
    return res?.data?.result;
};


// Function to post data to a specific URL
export const postHandler = async ({ url, body }) => {
     // Making a POST request to the provided URL with the provided body and withCredentials set to true
    return await axios.post(url, body, { withCredentials: true });
};


// Function to update data at a specific URL using PATCH method
export const updateHandler = async ({ url, body }) => {
    // Making a PATCH request to the provided URL with the provided body
    const res = await axios.patch(url, body);
    // Returning the result from the response data
    return res?.data?.result;
};

// Function to update data at a specific URL using PUT method
export const updateHandlerPut = async ({ url, body }) => {
     // Making a PUT request to the provided URL with the provided body
    return await axios.put(url, body);
};

// Function to delete data at a specific URL
export const deleteHandler = async (url) => {
     // Making a DELETE request to the provided URL
    return await axios.delete(url);
};
