import { Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useAuthStore } from "../../store/useAuthStore";



export const PublicPage = ( {children} ) => {
  
    const { login, admin, local, checkAuth, loading} = useAuthStore();

    if(loading){
      return <p>Cargando...</p>
    }
   
  return login ? <Navigate to='/dashboard'/>  : admin ? <Navigate to='/admin/usuarios'/> : children
}
