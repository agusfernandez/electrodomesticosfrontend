import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import Home from '../Main/Home/Home';
import Contacto from '../Main/Contacto/Contacto';
import Products from '../Main/Products/Products';
import CartPage from '../Main/CartPage/CartPage';  // Importar la página del carrito
import { IoIosCart } from "react-icons/io";



import './styles/header.css';

const Header = () => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const itemExists = prevItems.find((item) => item.id === product.id);
            if (itemExists) {
                return prevItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.id !== productId)
        );
    };

    return (
        <Router>
            <Navbar bg="light" variant="light" expand="lg">
                <Container fluid className="container-nav">
                    <Image src="/img/logo/logo.png" className="logo"/>
    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggle" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link><Link to='/'>Home</Link></Nav.Link>
                            <Nav.Link><Link to="/electrodomesticos">Electrodomesticos</Link></Nav.Link>
                            <Nav.Link><Link to="/contacto">Contacto</Link></Nav.Link>
                            <NavDropdown title="Mi Cuenta" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Login</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Registro</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                   Admin
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                    <Nav.Item className="cart"><Link to="/cart"><IoIosCart className='cart-icon'/> ({cartItems.length})</Link></Nav.Item>

                </Container>
            </Navbar>


            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/electrodomesticos" element={<Products addToCart={addToCart} />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/cart" element={<CartPage cartItems={cartItems} removeFromCart={removeFromCart} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default Header;
