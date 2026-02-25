import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../../../store/useAuthStore";



export const PrivatePage = ({ children }) => {

  const { login, loading, admin, isExpired } = useAuthStore();
  if (loading) return <p>Cargando...</p>; // ✅ Esperamos a verificar
  // 1. Si está vencido, no dejar ver los hijos (Sidebar/Dashboard/etc)
  if (isExpired) {
    return <Navigate to="/pago-vencido" replace />;
  }
  // Solo si estamos seguros de que NO hay acceso, redirigimos
  if (!login && admin !== 1) {
    return <Navigate to="/" replace />;
  }

  return children;
}
