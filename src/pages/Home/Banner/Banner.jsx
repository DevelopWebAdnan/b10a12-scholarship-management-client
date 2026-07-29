import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import form from '../../../assets/assignment-12/scholarship-application-form.jpg';
import img2 from '../../../assets/assignment-12/chimango-hara.jpg';
import img3 from '../../../assets/assignment-12/fotos-Sm4.jpg';

const Banner = () => {
    return (
        <Carousel>
            <div>
                <img src={form} />
            </div>
            <div>
                <img src={img2} />
            </div>
            <div>
                <img src={img3} />
            </div>
        </Carousel>
    );
};

export default Banner;