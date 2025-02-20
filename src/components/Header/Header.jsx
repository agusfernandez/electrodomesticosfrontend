import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { Container, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import { IoIosCart } from "react-icons/io";
import { AuthContext } from '../context/AuthContext';
import Home from '../Main/Home/Home';
import Products from '../Main/Products/Products';
import CartPage from '../Main/CartPage/CartPage'; 
import Register from '../Main/Register/Register';
import Login from '../Main/Login/Login';
import MyAccount from '../Main/MyAccount/MyAccount';
import ProductosDestacados from '../Main/ProductDestacados/ProductDestacados';
import AdminProductos from  '../Main/Admin/Admin';
import Contacto from '../Main/Contacto/Contacto';
import PrivateRoute from './privateRoute/PrivateRoute';
import './styles/header.css';

const Header = () => {
  const { user, logout, loading } = useContext(AuthContext); 
  const [cartItems, setCartItems] = useState([]);
  const [isNavOpen, setIsNavOpen] = useState(false);

  if(loading){
    return <div>Loading...</div>
  }

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);
      return itemExists
        ? prevItems.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const handleLogout = () => {
    logout();
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <Navbar bg="light" variant="light" expand="lg">
        <Container fluid className="container-nav">
          <Image src="/img/logo/logo.png" className="logo" />
          <Navbar.Toggle onClick={toggleNav} aria-controls="basic-navbar-nav" className="navbar-toggle" />
          <Navbar.Collapse id="basic-navbar-nav" className={isNavOpen ? 'show' : ''}>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/electrodomesticos">Electrodomésticos</Nav.Link>
              <Nav.Link as={Link} to="/destacados">Destacados</Nav.Link>
              {user?.role === "admin" && <Nav.Link as={Link} to="/admin">Admin</Nav.Link>}
              <NavDropdown title={user ? 'Mi Cuenta' : 'Cuenta'} id="basic-nav-dropdown">
                {user ? (
                  <>
                    <NavDropdown.Item as={Link} to="/myaccount">Mi Cuenta</NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}>Cerrar Sesión</NavDropdown.Item>
                  </>
                ) : (
                  <>
                    <NavDropdown.Item as={Link} to="/login">Iniciar Sesión</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/register">Registro</NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
              <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Nav.Item className="cart">
            <Link to="/cart"><IoIosCart className='cart-icon'/> ({cartItems.length})</Link>
          </Nav.Item>
        </Container>
      </Navbar>


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/electrodomesticos" element={<Products addToCart={addToCart} />} />
          <Route path="/destacados" element={<ProductosDestacados />} />
          <Route path="/admin" element={<PrivateRoute element={<AdminProductos />} roles={["admin"]} />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/cart" element={<CartPage cartItems={cartItems} removeFromCart={removeFromCart} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/myaccount" element={<MyAccount user={user} />} />
        </Routes>
    </>
  );
};

export default Header;
