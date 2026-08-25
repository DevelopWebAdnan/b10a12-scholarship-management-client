import { Helmet } from "react-helmet-async";
import Cover from "../shared/Cover/Cover";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// TODO: Add a publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = ({ total }) => {
    console.log('total from ScholarshipDetails:', total);

    return (
        <div>
            <Helmet>
                <title>Scholarship Manager | Payment</title>
                {/* <title>{`Scholarship Manager | Details: ${_id}`}</title> */}
            </Helmet>
            <Cover title="Payment"></Cover>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm total={total}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;