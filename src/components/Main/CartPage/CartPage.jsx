import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import './styles/cart.css'

const CartPage = ({ cartItems, removeFromCart }) => {
    return (
        <Container className="containerCart">
            <h2 className="subtitles">Carrito de Compras</h2>
            {cartItems.length === 0 ? (
        
                <p className='cartempty'>El carrito está vacío</p>
            ) : (
                <Row className="cartRow">
                    {cartItems.map((item) => (
                        <Col key={item.id} sm={12} md={6} lg={4} className="mb-4">
                            <Card>
                                <Card.Img variant="top" src={item.pictures[0]?.secure_url} className="imageCard"/>
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Text>
                                        Precio: ${item.price}
                                    </Card.Text>
                                    <Card.Text>
                                        Cantidad: {item.quantity}
                                    </Card.Text>
                                    <Button
                                        variant="danger"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        Eliminar
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default CartPage;