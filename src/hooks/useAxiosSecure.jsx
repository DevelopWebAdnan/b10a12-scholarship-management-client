import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
});

const useAxiosSecure = () => {
    // request interceptor to be added to every valid call to the api
    axiosSecure.interceptors.request.use(function (config) {
        const token = config.headers.authorization.split(' ')[1];
        console.log('request intercepted by interceptors', token);
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // handle 401 and 403 status
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, (error) => {
        const status = error.response.status;
        console.log('Status in the response interceptors', status);
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    })
    return axiosSecure;
};

export default useAxiosSecure;