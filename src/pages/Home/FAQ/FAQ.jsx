import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import bogor from "../../../assets/assignment-12/BogorAgriculturalUniversity,Indonesia.jpg";

const FAQ = () => {
    return (
        <section className="my-20">
            {/* <SectionTitle
                heading={"About Us"}
                subHeading="We provide scholarship with our experience"
            ></SectionTitle> */}

            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    {/* <div className="flex flex-col md:flex-row gap-5 items-center"> */}
                    {/* <div className="flex flex-col gap-5">
                            <img
                                alt="cultural centre of the Philippines, Pasay, Philippines image"
                                src={culturalCentre}
                                className="max-w-sm rounded-lg shadow-2xl"
                            />
                            <img
                                alt="Idleb, Syria image"
                                src={idleb}
                                className="max-w-sm rounded-lg shadow-2xl"
                            />
                        </div> */}
                    {/* <div> */}
                    <img
                        alt="Bogor Agricultural University, Indonesia image"
                        src={bogor}
                        className="max-w-2xl rounded-lg shadow-2xl"
                    />
                    {/* </div> */}
                    {/* </div> */}
                    <div>
                        {/* <h2 className="text-4xl font-bold">We provide scholarship with our experience</h2> */}
                        <SectionTitle
                            heading={"FAQ"}
                            subHeading="Frequently Asked Questions"
                        ></SectionTitle>
                        {/* <p className="pb-6">
                            Students can search their suitable scholarships and universities, also they can apply for the scholarship through our Scholarship Manager.
                        </p> */}
                        {/* <div className="flex gap-2">
                            <img src={scholarship64} alt="scholarship icon" />
                            <p className="py-6 font-bold">Apply from anywhere</p>
                        </div> */}
                        {/* <button className="btn btn-primary">Get Started</button> */}
                        <div className="collapse collapse-plus bg-base-100 border border-base-300">
                            <input type="radio" name="my-accordion-3" defaultChecked />
                            <div className="collapse-title font-semibold bg-cyan-500 text-base-100">How do I create an account?</div>
                            <div className="collapse-content text-sm pt-4">Click the "Login/Sign Up" button in the top right corner and follow the registration process.</div>
                        </div>
                        <div className="collapse collapse-plus bg-base-100 border border-base-300">
                            <input type="radio" name="my-accordion-3" />
                            <div className="collapse-title font-semibold bg-cyan-500 text-base-100">I want to apply for a scholarship. What should I do?</div>
                            <div className="collapse-content text-sm pt-4">Click on "Scholarship Details" on any of the scholarship cards at the home page and follow the instructions.</div>
                            {/* <div className="collapse-title font-semibold">I forgot my password. What should I do?</div>
                            <div className="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div> */}
                        </div>
                        <div className="collapse collapse-plus bg-base-100 border border-base-300">
                            <input type="radio" name="my-accordion-3" />
                            <div className="collapse-title font-semibold bg-cyan-500 text-base-100">I want to pay through Stripe. What should I do?</div>
                            <div className="collapse-content text-sm pt-4">"For a list of valid test cards, visit: https://stripe.com/docs/testing. OR "Go to this link: https://docs.stripe.com/testing and pay to apply for a scholarship.</div>
                            {/* <div className="collapse-title font-semibold">How do I update my profile information?</div>
                            <div className="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;