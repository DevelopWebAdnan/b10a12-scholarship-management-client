import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import form from '../../../assets/assignment-12/TempeTownLake,Tempe,AZ,USA.jpg';
import img2 from '../../../assets/assignment-12/chimango.jpg';
import img3 from '../../../assets/assignment-12/fotos-Sm4.jpg';
// import img4 from '../../../assets/assignment-12/10022.jpg';
// import img5 from '../../../assets/assignment-12/3973049.jpg';
// import img6 from '../../../assets/assignment-12/5670.jpg';

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
            {/* <div>
                <img src={img4} />
            </div>
            <div>
                <img src={img5} />
            </div>
            <div>
                <img src={img6} />
            </div> */}
        </Carousel>
    );
};

export default Banner;