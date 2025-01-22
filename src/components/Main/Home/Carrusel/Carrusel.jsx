import Carousel from 'react-bootstrap/Carousel';

const Carrusel = () => {
    return (
        <>
            <Carousel data-bs-theme="dark">
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/img/carrusel/bannerpp.png"
                        alt="Electro"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/img/carrusel/bannerpp1.png"
                        alt="Second slide"
                    />
        
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/img/carrusel/bannerpp3.png"
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
        </>
    )
}

export default Carrusel;