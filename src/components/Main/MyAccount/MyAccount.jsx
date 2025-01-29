import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Styles/MyAccount.css';

const MyAccount = ({ onLogout }) => {
  const [user, setUser ] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => { // Corregido aquí
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setMessage('No estás autenticado');
          return;
        }

        const response = await axios.get('http://localhost:8081/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data.user);
      } catch (error) {
        setMessage("Error al obtener los datos del usuario");
      }
    };

    fetchUserData(); // Asegúrate de que esta línea también esté correcta
  }, []);

  // Verifica si el usuario está cargando o no está disponible
  if (!user) {
    return <p>Cargando...</p>; // O puedes mostrar un mensaje de error
  }

  return (
    <div className="account-container">
      <h2>Mi Cuenta</h2>
      <div className="account-info">
        <p><strong>Nombre:</strong> {user.nombre}</p>
        <p><strong>Correo:</strong> {user.email}</p>
        <p><strong>Username:</strong> {user.username}</p>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
};

export default MyAccount;
