import { Link } from 'react-router-dom';
import coverImg from '../../../assets/assignment-12/quincecreative-mentor.jpg';

const Cover = ({title}) => {
    return (
        <div
            className="hero h-150"
            style={{
                backgroundImage:
                    `url(${coverImg})`,
            }}
        >
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
                    <p className="mb-5">
                       <Link to="/">Home</Link> // {title}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Cover;