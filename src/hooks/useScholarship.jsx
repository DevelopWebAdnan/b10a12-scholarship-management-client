import { useEffect, useState } from "react";

const useScholarship = () => {

    const [scholarship, setScholarship] = useState([]);
    const [loading, setLoading] = useState(true);

    //     const {data} = useQuery({
    //         queryKey: ['scholarship'],
    //         queryFn: async () => {
    //             const response = await fetch('http://localhost:5000/scholarship')
    //             // return await response.json()
    //             const data = await response.json()
    //             console.log(data);
    //             setScholarship(data);
    //             setLoading(false);
    //         },
    //     })
    //     return [scholarship, loading];

    useEffect(() => {
        fetch('http://localhost:5000/scholarship')
            .then(res => res.json())
            .then(data => {
                setScholarship(data);
                setLoading(false);
            })
    }, [])

    return [scholarship, loading];

};


export default useScholarship;