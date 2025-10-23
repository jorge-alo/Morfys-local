import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";



export const PrivatePage = ( {children} ) => {
    const { login, loading, admin } = useContext(AuthContext); 
    console.log("valor de login en privatePage:", login);
      if (loading) return <p>Cargando...</p>; // ✅ Esperamos a verificar
  return login ? children : admin ? children : <Navigate to='/'></Navigate>
}
