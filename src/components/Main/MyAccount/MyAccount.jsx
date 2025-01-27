import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import './Styles/MyAccount.css';

const MyAccount = ({ user, onLogout, removeFromCart, cartItems }) => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('No estás autenticado');
        return;
      }

      // Realizar la solicitud DELETE al backend con el token en la cabecera
      await axios.delete(`http://localhost:8081/auth/delete/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token
        },
      });

      setMessage("Cuenta eliminada con éxito");
      onLogout(); // Logout después de eliminar la cuenta
    } catch (error) {
      setMessage("Error al eliminar la cuenta");
    }
  };

  return (
    <div className="account-container">
      <h2>Mi Cuenta</h2>
      <div className="account-info">
        <p><strong>Nombre:</strong> {user.nombre}</p>
        <p><strong>Correo:</strong> {user.email}</p>
        <p><strong>Username:</strong> {user.username}</p>
      </div>
      
      <div className="cart-summary">
        <h3>Carrito de Compras</h3>
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              {item.title} - Cantidad: {item.quantity}
              <Button variant="danger" onClick={() => removeFromCart(item.id)}>Eliminar</Button>
            </li>
          ))}
        </ul>
      </div>
      
      <Button variant="danger" onClick={() => setShowModal(true)}>
        Eliminar mi cuenta
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={handleDeleteAccount}>Eliminar cuenta</Button>
        </Modal.Footer>
      </Modal>

      {message && <p>{message}</p>}
    </div>
  );
};

export default MyAccount;
