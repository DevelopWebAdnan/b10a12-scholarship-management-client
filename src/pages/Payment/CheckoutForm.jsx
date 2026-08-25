import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";


const CheckoutForm = ({ total }) => {
    console.log('total from Payment:', total);

    const [error, setError] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');


    useEffect(() => {
        if (total) {
            axiosSecure.post('/create-payment-intent', { total })
                .then(res => {
                    console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, total]);

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
                }
                else if (result.paymentIntent) {
                    console.log('payment intent', result.paymentIntent)
                    if (result.paymentIntent.status === 'succeeded') {
                        console.log('transaction id:', result.paymentIntent.id);
                        setTransactionId(result.paymentIntent.id);
                    }
                }
            });
    };

    return (
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
            <button className="btn btn-sm btn-info" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-700"> Your transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;