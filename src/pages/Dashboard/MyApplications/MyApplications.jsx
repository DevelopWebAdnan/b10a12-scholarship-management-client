import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const MyApplications = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: application = [] } = useQuery({
        queryKey: [user?.email, 'application'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/scholarship-application?email=${user.email}`)
            // console.log(res.data);
            return res.data;
        }
    })
    console.log(application);
    return (
        <div>
            <h2 className="text-3xl">My Applications: {application.length}</h2>
        </div>
    );
};

export default MyApplications;