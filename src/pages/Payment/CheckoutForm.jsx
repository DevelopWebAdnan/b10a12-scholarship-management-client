import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import ScholarshipApply from "../ScholarshipApply/ScholarshipApply";


const CheckoutForm = ({ id, application_fees, university_name, category, subject_category, deadline }) => {
    // const CheckoutForm = () => {
    console.log('id, application_fees, university_name, category, subject_category, deadline from Payment:', id, application_fees, university_name, category, subject_category, deadline);

    const [error, setError] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');

    // const navigate = useNavigate();


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
                        // <label htmlFor="scholarship_apply" className="btn">open modal</label>
                        // <a href="#scholarship_apply" className="btn">open modal</a>
                        // <Link to='#scholarship_apply' className="btn"></Link>

                        // <ScholarshipApply university_name={university_name} category={category} subject_category={subject_category} deadline={deadline}></ScholarshipApply>

                        // navigate(`/scholarshipApply/${id}`)

                        // <div>
                        //     <input type="checkbox" id="scholarship_apply" className="modal-toggle" />
                        //     <div className="modal" role="dialog">
                        //         <div className="modal-box">
                        //             <h3 className="font-bold text-lg">Apply scholarship!</h3>
                        //             <p className="py-6">Press ESC key or click outside to close</p>
                        //             <form onSubmit={submitScholarshipApplication}>
                        //                 <fieldset className="fieldset">
                        //                     <label className="label">Phone Number *</label>
                        //                     <input type="tel" name="phone" className="input mb-6" placeholder="Phone Number *" required />

                        //                     <label className="label">Photo *</label>
                        //                     <input type="text" name="photo" className="input mb-6" placeholder="Photo *" required />

                        //                     <label className="label">Address (village, district, country) *</label>
                        //                     <input type="text" name="address" className="input mb-6" placeholder="Address (village, district, country) *" required />

                        //                     <fieldset className="fieldset">
                        //                         <legend className="fieldset-legend">Gender *</legend>
                        //                         <select defaultValue="Pick a gender" name="gender" className="select" required>
                        //                             <option disabled={true}>Pick a gender</option>
                        //                             <option>Male</option>
                        //                             <option>Female</option>
                        //                             <option>Others</option>
                        //                         </select>
                        //                     </fieldset>

                        //                     <fieldset className="fieldset my-6">
                        //                         <legend className="fieldset-legend">Applying degree *</legend>
                        //                         <select defaultValue="Pick a degree" name="degree" className="select" required>
                        //                             <option disabled={true}>Pick a degree</option>
                        //                             <option>Diploma</option>
                        //                             <option>Bachelor</option>
                        //                             <option>Masters</option>
                        //                         </select>
                        //                     </fieldset>

                        //                     <label className="label">SSC Result *</label>
                        //                     <input type='text' name="ssc" className="input mb-6" placeholder="SSC Result *" min={0} max={5} required />

                        //                     <label className="label">HSC Result *</label>
                        //                     <input type="text" name="hsc" className="input" placeholder="HSC Result *" min={0} max={5} required />

                        //                     <fieldset className="fieldset my-6">
                        //                         <legend className="fieldset-legend">Study gap</legend>
                        //                         <select defaultValue="Pick a study gap" name="gap" className="select">
                        //                             <option disabled={true}>Pick a study gap</option>
                        //                             <option>1 year</option>
                        //                             <option>2 years</option>
                        //                             <option>More than 2 years</option>
                        //                         </select>
                        //                         <span className="label">Optional</span>
                        //                     </fieldset>

                        //                     <input type="text" defaultValue={university_name} placeholder="University name" className="input" disabled />
                        //                     <input type="text" defaultValue={category} placeholder="Scholarship category" className="input" disabled />
                        //                     <input type="text" defaultValue={subject_category} placeholder="Subject category" className="input" disabled />

                        //                     <button className="btn btn-neutral mt-4">Apply</button>
                        //                 </fieldset>
                        //             </form>
                        //         </div>
                        //         <form method="dialog" className="modal-backdrop">
                        //             <button>close</button>
                        //         </form>
                        //         <div className="modal-action">
                        //             <label htmlFor="scholarship_apply" className="btn">Close!</label>
                        //         </div>
                        //         <div className="modal-action">
                        //             <a href="#" className="btn">Yay!</a>
                        //         </div>
                        //     </div>
                        // </div>
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
            <ScholarshipApply university_name={university_name} category={category} subject_category={subject_category} deadline={deadline}></ScholarshipApply>
        </div>
    );
};

export default CheckoutForm;