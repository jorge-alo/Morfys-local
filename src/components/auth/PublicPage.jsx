import { Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";



export const PublicPage = ( {children} ) => {
  
    const { login, admin, local, checkAuth, loading} = useContext(AuthContext);
       useEffect(() => {
        checkAuth(); // ✅ Ahora se ejecuta después del renderizado
    }, [checkAuth]);

    if(loading){
      return <p>Cargando...</p>
    }
    console.log( "este es el valor de login:", login);
    console.log( "este es el valor de local:", local);
  return login ? <Navigate to='/dashboard'/>  : admin ? <Navigate to='/admin/usuarios'/> : children
}
