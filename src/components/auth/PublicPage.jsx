import { Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useAuthStore } from "../../store/useAuthStore";



export const PublicPage = ( {children} ) => {
  
    const { login, admin, isExpired, loading} = useAuthStore();

    if(loading){
      return <p>Cargando...</p>
    }

    // Si está logueado pero vencido, dejar que vea la página pública o mandarlo a pago-vencido
  if (login && isExpired) {
    return <Navigate to='/pago-vencido'/>;
  }
   
  return login ? <Navigate to='/dashboard'/>  : admin ? <Navigate to='/admin/usuarios'/> : children
}
