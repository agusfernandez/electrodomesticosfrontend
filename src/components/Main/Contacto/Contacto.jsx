import FormContacto from './FormContact/FormContacto';
import Map from './Map/Map';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Contacto = () => {
    return (
        <>
          <Container fluid className="contact-form">
            <Row className="m-0">
              <Col xs={12} md={6} className="p-0">
                <FormContacto/>

              </Col>
              <Col xs={12} md={6} className="p-0">
                <Map/>
              </Col>
            </Row>
            
          </Container>
        </>
    )
}

export default Contacto;