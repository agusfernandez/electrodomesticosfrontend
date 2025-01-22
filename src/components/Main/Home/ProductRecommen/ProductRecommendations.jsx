import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/home.css';


const ProductRecommendations = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('../electrodomesticos.json')
      .then(response => response.json())
      .then(data => setProductos(data))
  }, []);


    // Slider Breakpoints
    const settings = {
        dots: true,
        infinite: true,
        lazyLoad: true,
        speed: 500,
        slidesToShow: 4, 
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 2,
                }
            }
        ],
    };

    return (
        <>
            <h2 className="subtitles">Productos Recomendados</h2>
            <Container  className="productsContainer">
                {/* Carrusel de productos */}
                <Slider {...settings}>
                    {productos.map((producto) => (
                        <div key={producto.id} className="card-wrapper">
                            <Card className="cards-home">
                                <Card.Text className='conditiontag'>{producto.categoria}</Card.Text>
                                <Card.Img variant="center" src={producto.img} className="imageCardHome"/>
                                <Card.Body>
                                    <Card.Title>{producto.nombre}</Card.Title>
                                    <Card.Text>${producto.precio}</Card.Text>
                                    <Button variant="primary" className="btn-primary-card">Comprar</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </Slider>
            </Container>
        </>
    );
}

export default ProductRecommendations;