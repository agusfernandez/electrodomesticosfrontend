import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import '../styles/miniaturas.css'; 

function Miniaturas() {
  const [mainImage, setMainImage] = useState('/img/miniaturas/miniatura1.avif');

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  const thumbnails = [
    '/img/miniaturas/miniatura1.avif',
    '/img/miniaturas/miniatura2.avif',
    '/img/miniaturas/miniatura3.avif',
    '/img/miniaturas/miniatura4.jpg',
  ];

  return (
    <div className="contenedor-main-mini">
    <Container fluid>
      <h2 className="subtitles">Galeria de Productos</h2>

      {/* Imagen principal */}
      <Row className="main-image-container">
        <Col xs={12} md={5}>
          <Image src={mainImage} className="main-image" fluid />
        </Col>
      </Row>

      {/* Imágenes miniaturas */}
      <Row className="thumbnail-container">
        {thumbnails.map((thumbnail, index) => (
          <Col xs={3} md={2} key={index} className="thumbnail">
            <Image
              src={thumbnail}
              rounded
              thumbnail
              onClick={() => handleImageClick(thumbnail)}
            />
          </Col>
        ))}
      </Row>
    </Container>
    </div>
  );
}

export default Miniaturas;
