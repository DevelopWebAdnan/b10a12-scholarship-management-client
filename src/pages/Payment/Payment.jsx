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

// const Payment = ({ scholarship_id, application_fees }) => {
const Payment = () => {
    // console.log('scholarship_id, application_fees, from ScholarshipDetails:', scholarship_id, application_fees);
    const { id } = useParams();
    console.log(id);

    const axiosSecure = useAxiosSecure();

    const { data: scholarshipDetails = {} } = useQuery({
        queryKey: ['scholarshipDetails', id],
        queryFn: async () => {
            const res = await axiosSecure(`/scholarship/${id}`)
            return res.data;
        }
    })
    console.log('scholarshipDetails.result inside Payment:', scholarshipDetails.result);
    const { application_fees, university_name, category, subject_category } = scholarshipDetails.result || {};
    console.log('application_fees:', application_fees, 'university_name:', university_name, 'category:', category, 'subject_category:', subject_category);

    return (
        <div>
            <Helmet>
                <title>Scholarship Manager | Payment {id}</title>
                {/* <title>{`Scholarship Manager | Details: ${_id}`}</title> */}
            </Helmet>
            <Cover title="Payment"></Cover>
            <div>
                <Elements stripe={stripePromise}>
                    {/* <CheckoutForm scholarship_id={scholarship_id} application_fees={application_fees}></CheckoutForm> */}
                    <CheckoutForm id={id} application_fees={application_fees} university_name={university_name} category={category} subject_category={subject_category}></CheckoutForm>
                </Elements>
            </div>
        </div >
    );
};

export default Payment;