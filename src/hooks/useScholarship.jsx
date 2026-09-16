import { useQuery } from "@tanstack/react-query";
import useAxiosOpen from "./useAxiosOpen";

// const useScholarship = (search) => {
const useScholarship = () => {
    // console.log('search from useScholarship:', search);
    
    // tan stack query
    const axiosOpen = useAxiosOpen();

    const { data: scholarship = [], isPending: loading, refetch } = useQuery({
        // queryKey: ['scholarship', search],
        queryKey: ['scholarship'],
        queryFn: async () => {
            // const response = await axiosOpen(`/scholarship?searchQuery=${search}`)
            const response = await axiosOpen('/scholarship')
            // console.log(response.data);
            return response.data;
            // const data = await response.json()
            // console.log(data);
        },
    })
    return [scholarship, loading, refetch];

    // useEffect(() => {
    //     fetch('http://localhost:5000/scholarship')
    //         .then(res => res.json())
    //         .then(data => {
    //             setScholarship(data);
    //             setLoading(false);
    //         })
    // }, [])

    // return [scholarship, loading];

};


export default useScholarship;