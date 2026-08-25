import { Helmet } from "react-helmet-async";
import Cover from "../shared/Cover/Cover";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// TODO: Add a publishable key
const stripePromise = loadStripe('')

const Payment = () => {
    return (
        <div>
            <Helmet>
                <title>Scholarship Manager | Payment</title>
                {/* <title>{`Scholarship Manager | Details: ${_id}`}</title> */}
            </Helmet>
            <Cover title="Payment"></Cover>
            <div>
                <Elements stripe={stripePromise}>

                </Elements>
            </div>
        </div>
    );
};

export default Payment;