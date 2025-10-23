import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const Admin = ({ children }) => {
  const { login, admin, loading } = useContext(AuthContext);
  console.log( "valor de admin", admin);
   if (loading) return <p>Cargando...</p>; // ✅ Esperamos a verificar
  return admin ? children : login ? children : <Navigate to='/'></Navigate>;
}
