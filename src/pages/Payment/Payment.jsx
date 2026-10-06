import { Helmet } from "react-helmet-async";
import Cover from "../shared/Cover/Cover";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

// TODO: Add a publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const { id } = useParams();
    // console.log(id);

    const axiosSecure = useAxiosSecure();

    const { data: scholarshipDetails = {} } = useQuery({
        queryKey: ['scholarshipDetails', id],
        queryFn: async () => {
            const res = await axiosSecure(`/scholarship/${id}`)
            return res.data;
        }
    })
    console.log('scholarshipDetails inside Payment:', scholarshipDetails);
    const { application_fees, university_name, category, subject_category, deadline } = scholarshipDetails || {};
    console.log('application_fees:', application_fees, 'university_name:', university_name, 'category:', category, 'subject_category:', subject_category, 'deadline:', deadline);

    return (
        <div>
            <Helmet>
                <title>Scholarship Manager | Payment {id}</title>
            </Helmet>
            <Cover title="Payment"></Cover>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm id={id} application_fees={application_fees} university_name={university_name} category={category} subject_category={subject_category} deadline={deadline}></CheckoutForm>
                </Elements>
            </div>
        </div >
    );
};

export default Payment;