import { useQuery } from "@tanstack/react-query";
import useAxiosOpen from "./useAxiosOpen";

const useScholarship = () => {
    
    // tan stack query
    const axiosOpen = useAxiosOpen();

    const { data: scholarship = [], isPending: loading, refetch } = useQuery({
        queryKey: ['scholarship'],
        queryFn: async () => {
            const response = await axiosOpen('/scholarship')
            return response.data;
        },
    })
    return [scholarship, loading, refetch];
};


export default useScholarship;