
const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="my-6">
            <div className="badge badge-soft badge-info text-cyan-600 bg-cyan-200 uppercase">{heading}</div>
            <p className="text-4xl font-bold py-6">{subHeading}</p>
        </div>
    );
};

export default SectionTitle;