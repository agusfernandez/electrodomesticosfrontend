import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

const Banners = () => {
    return (
        <>
            <Container className="bannersContainers">
                <Row>
                    <Col xs={12} md={6} lg={6} className="colBanner">
                        <Image rounded src="/img/banner/banner4.png"></Image>
                        <Button variant="primary" size="lg" className="btn-banner" >
                            Ver Más
                        </Button>
                    </Col>
                    <Col xs={12} md={6} lg={6} className="colBanner">
                        <Image rounded src="/img/banner/banner5.png"></Image>
                        <Button variant="primary" size="lg" className="btn-banner" >
                            Ver Más
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Banners;
