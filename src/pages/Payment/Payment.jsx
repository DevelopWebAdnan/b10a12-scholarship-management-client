import { Helmet } from "react-helmet-async";
import Cover from "../shared/Cover/Cover";


const Payment = () => {
    return (
        <div>
            <Helmet>
                <title>Scholarship Manager | Payment</title>
                {/* <title>{`Scholarship Manager | Details: ${_id}`}</title> */}
            </Helmet>
            <Cover title="Payment"></Cover>
            <h2 className="text-4xl">Payment page</h2>
        </div>
    );
};

export default Payment;