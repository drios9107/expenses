import axios from 'axios';
import toast from 'react-hot-toast';
import { messages } from './messages';
import { signOut } from 'next-auth/react';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND, // Replace with your API base URL
});

axiosInstance.interceptors.response.use(response => response, error => {
    // Handle errors globally
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const { status, data } = error.response;
        console.log('***interceptor error', { status, code: data?.code });
        if (['missing-token', 'invalid-token'].includes(data?.code)) {
            signOut();
            return;
        }

        if (data?.code === 'no-error-needed')
            return;

        toast.error(messages[data?.code ?? 'default']);

        // switch (status) {
        //     case 401:
        //         // Unauthorized (e.g., token expired or invalid)
        //         console.error('Unauthorized:', data.message || 'Please log in again.');
        //         // Redirect to login page or refresh token
        //         break;
        //     case 403:
        //         // Forbidden (e.g., insufficient permissions)
        //         console.error('Forbidden:', data.message || 'You do not have permission to access this resource.');
        //         break;
        //     default:
        //         // Handle other status codes
        //         console.error('Error:', data.message || 'An error occurred.');
        // }
    } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
    } else {
        // Something happened in setting up the request that triggered an error
        console.error('Request setup error:', error.message);
    }

    // Return the error to the calling function
    return Promise.reject(error);
}
);

axiosInstance.interceptors.request.use(config => {
    const token = sessionStorage.getItem('userToken'); // Get the token from storage
    if (token)
        config.headers.Authorization = `Bearer ${token}`; // Set the token in the Authorization header

    return config;
}, error => {
    return Promise.reject(error);
}
);

// Function to set the token in the Axios instance
export const setAuthToken = (token) => {
    if (token) {
        // Set the token in the Authorization header for all requests
        sessionStorage.setItem('userToken', token);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        // Remove the Authorization header if no token is provided
        sessionStorage.removeItem('userToken');
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
};

export default axiosInstance;