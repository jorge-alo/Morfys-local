import { Link, useNavigate } from "react-router-dom"
import "../styles/Sidebar.css"
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useForm } from "../context/FormProvider";
import { useFormStore } from "../store/useFormStore";
import { useAuthStore } from "../store/useAuthStore";

export const Sidebar = () => {
  
  const admin = useAuthStore((state) => state.admin);
  const local = useAuthStore((state) => state.local);
  const handleLogOut = useAuthStore((state) => state.handleLogOut);
  const checkPay = useAuthStore((state) => state.checkPay);
  const showModalPay = useFormStore((state) => state.showModalPay);
  const setShowModalPay = useFormStore((state) => state.setShowModalPay);
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [activeUntil, setActiveUntil] = useState(null);


  useEffect(() => {

    if (!admin) {
      const fetchPay = async () => {
        const res = await checkPay();
        console.log("Respuesta checkPay:", res);

        if (res?.active_until) {
          setActiveUntil(res.active_until);
        }
      };

      fetchPay();
    }

  }, []);

  /*const showPayButton = (() => {
    if (!activeUntil || admin) return false

    const hoy = new Date();
    const vencimiento = new Date(activeUntil);

    const diferenciaMs = vencimiento - hoy;
    const diasRestantes = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));
    console.log("Valor de de dias Restantes", diasRestantes);
    return diasRestantes <= 7;

  })()*/

  const payStatus = (() => {
  if (!activeUntil || admin) return { show: false, message: "", isExpired: false };

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0); // Normalizamos hoy a medianoche
  
  const vencimiento = new Date(activeUntil);
  vencimiento.setHours(0, 0, 0, 0); // Normalizamos vencimiento

  const diferenciaMs = vencimiento - hoy;
  const diasRestantes = Math.round(diferenciaMs / (1000 * 60 * 60 * 24));

  let message = "";
  let isExpired = false;

  if (diasRestantes < 0) {
    message = "Tu factura ha vencido";
    isExpired = true;
  } else if (diasRestantes === 0) {
    message = "Tu factura vence hoy";
  } else if (diasRestantes <= 7) {
    message = `Tu factura vence en ${diasRestantes} día${diasRestantes > 1 ? 's' : ''}`;
  }

  // Mostramos el bloque si ya venció o faltan 7 días o menos
  return {
    show: diasRestantes <= 7,
    message,
    isExpired
  };
})();

  const handleShowModalPay = () => {
    setShowModalPay(true);
    setOpenMenu(prev => !prev);
  }

  const handleClickMenu = () => {
    setOpenMenu(prev => !prev)
  }

  const renderLinksMobile = () => {
    if (admin) {
      // Links para el SUPER ADMINISTRADOR
      return (
        <>
          <li><Link to="/admin/locales" onClick={() => setOpenMenu(false)}>Gestionar Locales</Link></li>
          <li><Link to="/admin/usuarios" onClick={() => setOpenMenu(false)}>Gestionar Usuarios</Link></li>
          {/* Si quieres que el admin vea estadísticas globales */}
          <li><Link to="/dashboard" onClick={() => setOpenMenu(false)}>Estadísticas Globales</Link></li>
        </>
      );
    }
    return (
      <>
        <li onClick={() => setOpenMenu(prev => !prev)}> <Link to="/dashboard">Dashboard</Link> </li>
        <li onClick={() => setOpenMenu(prev => !prev)}> <Link to="/menu">Menu</Link> </li>
        <li onClick={() => setOpenMenu(prev => !prev)}> <Link to="/ajustes">Ajustes</Link> </li>
        {
          payStatus.show && (
            <li>
              <div className={`container-pagar ${payStatus.isExpired ? 'vencido' : ''}`}>
                <h3 onClick={handleShowModalPay}>Pagar</h3>
                <h5 className="h5-pagar"> {payStatus.message} ({new Date(activeUntil).toLocaleDateString("es-AR")})</h5>
              </div>
            </li>
          )
        }
      </>

    )
  }
  const renderLinksDesktop = () => {
    if (admin) {
      return (
        <>
          <li><Link to="/admin/locales" >Gestionar Locales</Link></li>
          <li><Link to="/admin/usuarios" >Gestionar Usuarios</Link></li>
          {/* Si quieres que el admin vea estadísticas globales */}
          <li><Link to="/admin/dashboard" >Estadísticas Globales</Link></li>
        </>
      )
    }

    return (
      <>
        <li> <Link to="/dashboard">Dashboard</Link> </li>
        <li> <Link to="/menu">Menu</Link> </li>
        <li> <Link to="/ajustes">Ajustes</Link> </li>
        {payStatus.show && (
          <li>
            <div className={`container-pagar ${payStatus.isExpired ? 'vencido' : ''}`}>
              <h3 onClick={handleShowModalPay}>Pagar</h3>
              <h5 className="h5-pagar"> {payStatus.message} ({new Date(activeUntil).toLocaleDateString("es-AR")})</h5>
            </div>

          </li>
        )}
      </>
    )
  }
  return (
    <>
      <nav className="nav">
        <h3>¡Hola {local}!</h3>
        <ul>
          {renderLinksDesktop()}
        </ul>
        <button onClick={() => handleLogOut(navigate)}>Cerra sesion</button>
      </nav>

      <nav className="nav-mobile">
        <div className="nav-mobile__container-icon">
          <span className="material-symbols-outlined" onClick={handleClickMenu}>
            menu
          </span>
          <ul className={`ul-menu-mobile ${openMenu ? "open" : ""}`}>
            {renderLinksMobile()}
            <button onClick={() => handleLogOut(navigate)}>Cerra sesion</button>
          </ul>
        </div>

      </nav>
    </>

  )
}
