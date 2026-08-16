import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: role, isLoading } = useQuery({
        queryKey: [user?.email, 'role'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user.email}`)
            // console.log(res.data);
            return res.data?.role;
        }
    })
    console.log(role);
    return [role, isLoading];
};

export default useRole;