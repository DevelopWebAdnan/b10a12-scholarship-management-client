import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useScholarship = () => {
    // tan stack query
    // const [scholarship, setScholarship] = useState([]);
    // const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    const { data: scholarship = [] } = useQuery({
        queryKey: ['scholarship'],
        queryFn: async () => {
            const response = await axiosSecure('/scholarship')
            return response.data;
            // const data = await response.json()
            // console.log(data);
            // setScholarship(data);
            // setLoading(false);
        },
    })
    return [scholarship];

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