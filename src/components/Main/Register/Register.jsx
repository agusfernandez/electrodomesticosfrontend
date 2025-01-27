import React, { useState } from "react";
import axios from "axios";
import './Styles/Register.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    username: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:8081/auth/register", formData);
      setMessage(response.data.message);
    } catch (err) {
      if (err.response) {
        // Manejar el error de duplicación de email
        if (err.response.status === 400 && err.response.data.message.includes("email")) {
          setError("El correo electrónico ya está registrado. Intenta con otro.");
        } else {
          setError(err.response.data.message);
        }
      } else {
        setError("Error al intentar registrarte. Por favor, intenta nuevamente.");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2 className="register-title">Registro de Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="form-control"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {message && <p className="register-message success">{message}</p>}
          {error && <p className="register-message error">{error}</p>}
          <button type="submit" className="btn register-button w-100">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
