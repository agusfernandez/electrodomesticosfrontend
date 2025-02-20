import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Styles/MyAccount.css';

const MyAccount = ({ onLogout }) => {
  const [user, setUser ] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => { 
      try {
        const token = localStorage.getItem('token');
        console.log('le pasa el token', token);

        if (!token) {
          setMessage('No estás autenticado');
          return;
        }

        const response = await axios.get('http://localhost:8081/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


        if (response.data.user) {
          setUser(response.data.user);
        } else {
          setMessage("No se pudo obtener el usuario");
        }

        console.log('Respuesta del backend',response.data);



      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error.response || error);
        setMessage("Error al obtener los datos del usuario");
      }
    };

    fetchUserData(); 
  }, []);

  if (!user) {
    console.log('usuario1',user)
    return <p>Cargando Mi Cuenta</p>; 
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
