import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; // Importa el contexto de autenticación
import "./Styles/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext); // Usa el contexto de autenticación
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8081/auth/login", formData);
      console.log('respuesta del servidor!!!', response.data.user);

      // Guarda el token y el usuario en el contexto
      login(response.data.token, response.data.user);


      // Redirige según el rol del usuario
      if (response.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/myaccount");
      }

    } catch (err) {
      console.log('Error al loguearse', err);
      setError(err.response?.data?.message || "Error al iniciar sesión");
     
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
