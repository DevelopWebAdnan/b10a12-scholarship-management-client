import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useReview = (user) => {

    const axiosSecure = useAxiosSecure();

    const { data: reviews = [], isLoading, refetch } = useQuery({
        queryKey: ['reviews', user?.email],
        queryFn: async () => {
            const res = await axiosSecure(`/reviews?email=${user.email}`)
            return res.data;
        }
    })
    console.log('reviews:', reviews);
    return [reviews, isLoading, refetch];
};

export default useReview;