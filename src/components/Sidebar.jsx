import { Link } from "react-router-dom"
import "../styles/Sidebar.css"
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useForm } from "../context/FormProvider";

export const Sidebar = () => {
  const { login, handleLogOut, local, checkPay } = useContext(AuthContext);
  const { showModalPay, setShowModalPay } = useForm();
  const [openMenu, setOpenMenu] = useState(false);
  const [activeUntil, setActiveUntil] = useState(null);

  useEffect(() => {
    const fetchPay = async () => {
      const res = await checkPay();
      console.log("Respuesta checkPay:", res);

      if (res?.active_until) {
        setActiveUntil(res.active_until);
      }
    };

    fetchPay();
  }, []);

  const isExpired = activeUntil ? new Date(activeUntil) < new Date() : true;

  const handleShowModalPay = () => {
    setShowModalPay(true);
    setOpenMenu(prev => !prev);
  }

  const handleClickMenu = () => {
    setOpenMenu(prev => !prev)
  }
  return (
    <>
      <nav className="nav">
        <h3>¡Hola {local}!</h3>
        <ul>
          <li> <Link to="/dashboard">Dashboard</Link> </li>
          <li> <Link to="/menu">Menu</Link> </li>
          <li> <Link to="/ajustes">Ajustes</Link> </li>
          {isExpired && (
            <li>
              <h3 onClick={handleShowModalPay}>Pagar</h3>
            </li>
          )}
        </ul>
        <button onClick={handleLogOut}>Cerra sesion</button>
      </nav>

      <nav className="nav-mobile">
        <div className="nav-mobile__container-icon">
          <span className="material-symbols-outlined" onClick={handleClickMenu}>
            menu
          </span>
          <ul className={`ul-menu-mobile ${openMenu ? "open" : ""}`}>
            <li onClick={() => setOpenMenu(prev => !prev)}> <Link to="/dashboard">Dashboard</Link> </li>
            <li onClick={() => setOpenMenu(prev => !prev)}> <Link to="/menu">Menu</Link> </li>
            <li onClick={() => setOpenMenu(prev => !prev)}> <Link to="/ajustes">Ajustes</Link> </li>
            {isExpired && (
              <li>
                <h3 onClick={handleShowModalPay}>Pagar</h3>
              </li>
            )}
            <button onClick={handleLogOut}>Cerra sesion</button>
          </ul>
        </div>

      </nav>
    </>

  )
}
