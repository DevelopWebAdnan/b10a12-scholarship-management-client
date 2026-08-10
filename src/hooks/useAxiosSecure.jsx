import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
});

const useAxiosSecure = () => {
    const { signOutUser } = useAuth();
    const navigate = useNavigate();
    // request interceptor to add authorization headers for each secure call to the api
    axiosSecure.interceptors.request.use(function (config) {
        // const token = config.headers.authorization.split(' ')[1];
        const token = localStorage.getItem('access-token');
        // console.log('request intercepted by interceptors', token);
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        // console.log('Status error in the response interceptors', status);
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        // for 401 or 403 status logout the user and move to the login page
        if (status === 401 || status === 403) {
            await signOutUser();
            navigate('/login');
        }
        return Promise.reject(error);
    })
    return axiosSecure;
};

export default useAxiosSecure;