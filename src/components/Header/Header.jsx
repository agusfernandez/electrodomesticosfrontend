import { BrowserRouter as Router, Routes, Route, Link, } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import { IoIosCart } from "react-icons/io";
import Home from '../Main/Home/Home';
import Products from '../Main/Products/Products';
import CartPage from '../Main/CartPage/CartPage'; 
import Register from '../Main/Register/Register';
import Login from '../Main/Login/Login';
import MyAccount from '../Main/MyAccount/MyAccount';
import './styles/header.css';
import axios from 'axios';
import Contacto from '../Main/Contacto/Contacto'

const Header = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.get('http://localhost:8081/auth/user', { 
            headers: { Authorization: `Bearer ${token}` } 
        })
        .then(response => {
            setUser(response.data.user); // Asegúrate de que el backend devuelva la data del usuario
        })
        .catch(error => {
            console.error('Error al obtener los datos del usuario:', error);
        });
    }
}, []);

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

  const handleLogout = async () => {
    // Hacer logout
    try {
      await axios.post('http://localhost:8081/auth/logout');
      localStorage.removeItem('token'); // Limpiar token del localStorage
      setUser(null); // Actualizar estado
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <Router>
      <Navbar bg="light" variant="light" expand="lg">
        <Container fluid className="container-nav">
          <Image src="/img/logo/logo.png" className="logo" />
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggle" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link><Link to='/'>Home</Link></Nav.Link>
              <Nav.Link><Link to="/electrodomesticos">Electrodomesticos</Link></Nav.Link>
              <NavDropdown title={user ? 'Mi Cuenta' : 'Cuenta'} id="basic-nav-dropdown">
                {user ? (
                    <>
                    <NavDropdown.Item as={Link} to="/myaccount">Mi Cuenta</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/login" onClick={handleLogout}>Cerrar Sesión</NavDropdown.Item>
                    </>
                ) : (
                    <>
                    <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/register">Registro</NavDropdown.Item>
                    </>
                )}
                </NavDropdown>
              <Nav.Link><Link to="/contacto">Contacto</Link></Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Nav.Item className="cart"><Link to="/cart"><IoIosCart className='cart-icon'/> ({cartItems.length})</Link></Nav.Item>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/electrodomesticos" element={<Products addToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cartItems={cartItems} removeFromCart={removeFromCart} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/myaccount" element={<MyAccount cartItems={cartItems} removeFromCart={removeFromCart} user={user} />} />
      </Routes>
    </Router>
  );
};

export default Header;
