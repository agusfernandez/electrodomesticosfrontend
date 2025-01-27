import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "./Styles/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Inicializa el hook useNavigate
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      // Hacer la solicitud al backend
      const response = await axios.post("http://localhost:8081/auth/login", formData);
      setMessage("Inicio de sesión exitoso.");

      // Guarda el token en localStorage
      localStorage.setItem("token", response.data.token);

      // Redirige al usuario a "Mi Cuenta" después de login exitoso
      navigate('/myaccount'); // Redirige a la página de Mi Cuenta

    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Error al iniciar sesión. Por favor, intenta nuevamente.");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2 className="register-title">Inicio de Sesión</h2>
        <form onSubmit={handleSubmit}>
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
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

