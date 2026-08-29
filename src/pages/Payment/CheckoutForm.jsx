import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import ScholarshipApply from "../ScholarshipApply/ScholarshipApply";
import { toast } from "react-toastify";


const CheckoutForm = ({ id, application_fees, university_name, category, subject_category }) => {
    // const CheckoutForm = () => {
    console.log('id, application_fees, university_name, category, subject_category from Payment:', id, application_fees, university_name, category, subject_category);

    const [error, setError] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');


    useEffect(() => {
        if (application_fees) {
            axiosSecure.post('/create-payment-intent', { application_fees })
                .then(res => {
                    console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, application_fees]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            console.log('payment method', paymentMethod);
            setError("");
        }

        // confirm payment
        await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                },
            },
        })
            .then(result => {
                if (result.error) {
                    console.log('payment error')
                    // TODO: show it in a toast
                    toast(result.error);
                }
                else if (result.paymentIntent) {
                    console.log('payment intent', result.paymentIntent)
                    if (result.paymentIntent.status === 'succeeded') {
                        console.log('transaction id:', result.paymentIntent.id);
                        setTransactionId(result.paymentIntent.id);

                        // TODO: show a toast
                        toast('Payment is successful!');
                        document.getElementById('scholarship_apply').showModal()
                    }
                }
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {/* <Link to={`/scholarshipApply/${id}`}> */}
                <button className="btn btn-sm btn-info" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                {/* </Link> */}
                <p className="text-red-600">{error}</p>
                {transactionId && <p className="text-green-700"> Your transaction id: {transactionId}</p>}
            </form>
            <ScholarshipApply university_name={university_name} category={category} subject_category={subject_category}></ScholarshipApply>
        </div>
    );
};

export default CheckoutForm;