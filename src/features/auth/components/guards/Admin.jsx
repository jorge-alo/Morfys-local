import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../../../store/useAuthStore";

export const Admin = ({ children }) => {
  
  const login = useAuthStore((state) => state.login);
  const admin = useAuthStore((state) => state.admin);
  const loading = useAuthStore((state) => state.loading);
  
   if (loading) return <p>Cargando...</p>; // ✅ Esperamos a verificar
   if (!login && admin !== 1) {
    return <Navigate to="/" replace />;
  }

  return children;
   
}
