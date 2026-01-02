import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useAuthStore } from "../../store/useAuthStore";



export const PrivatePage = ({ children }) => {

  const { login, loading, admin } = useAuthStore();
  if (loading) return <p>Cargando...</p>; // ✅ Esperamos a verificar
  // Solo si estamos seguros de que NO hay acceso, redirigimos
  if (!login && admin !== 1) {
    return <Navigate to="/" replace />;
  }

  return children;
}
