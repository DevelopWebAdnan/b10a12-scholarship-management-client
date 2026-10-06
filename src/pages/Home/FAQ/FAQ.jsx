import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import bogor from "../../../assets/assignment-12/BogorAgriculturalUniversity,Indonesia.jpg";

const FAQ = () => {
    return (
        <section className="my-20">
            <div className="hero bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="flex-1">
                        <img
                            alt="Bogor Agricultural University, Indonesia image"
                            src={bogor}
                            className="w-full max-w-2xl rounded-lg shadow-2xl"
                        />
                    </div>
                    <div className="flex-1">
                        <SectionTitle
                            heading={"FAQ"}
                            subHeading="Frequently Asked Questions"
                        ></SectionTitle>

                        <div className="collapse collapse-plus bg-base-100 border border-base-300">
                            <input type="radio" name="my-accordion" defaultChecked />
                            <div className="collapse-title font-semibold bg-cyan-500 text-base-100">How do I create an account?</div>
                            <div className="collapse-content text-sm pt-4">Click the "Login/Sign Up" button in the top right corner and follow the registration process.</div>
                        </div>
                        <div className="collapse collapse-plus bg-base-100 border border-base-300">
                            <input type="radio" name="my-accordion" />
                            <div className="collapse-title font-semibold bg-cyan-500 text-base-100">I want to apply for a scholarship. What should I do?</div>
                            <div className="collapse-content text-sm pt-4">Click on "Scholarship Details" on any of the scholarship cards at the home page and follow the instructions.</div>
                        </div>
                        <div className="collapse collapse-plus bg-base-100 border border-base-300">
                            <input type="radio" name="my-accordion" />
                            <div className="collapse-title font-semibold bg-cyan-500 text-base-100">I want to pay through Stripe. What should I do?</div>
                            <div className="collapse-content text-sm pt-4">"For a list of valid test cards, visit: https://stripe.com/docs/testing. OR "Go to this link: https://docs.stripe.com/testing and pay to apply for a scholarship.</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;