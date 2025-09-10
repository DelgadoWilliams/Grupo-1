// src/api.js
import axios from "axios";

// Configura la URL de tu backend Django
const api = axios.create({
  baseURL: "http://localhost:8000", // 👈 cambia si tu backend corre en otro puerto
});

// Interceptor para manejar errores (ej: token inválido)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Aquí detectamos cuando el token está malo
      alert("⚠️ Token inválido o expirado");
    }
    return Promise.reject(error);
  }
);

export default api;
