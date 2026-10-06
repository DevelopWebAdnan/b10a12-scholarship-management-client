import axios from "axios";

const axiosOpen = axios.create({
    baseURL: "https://b10a12-scholarship-management-serve.vercel.app"
});

const useAxiosOpen = () => {
    return axiosOpen;
};

export default useAxiosOpen;