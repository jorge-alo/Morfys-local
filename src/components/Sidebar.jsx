import { Link } from "react-router-dom"
import "../styles/Sidebar.css"
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";

export const Sidebar = () => {
  const { login, handleLogOut, local } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState(false);

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
        </ul>
        <button onClick={handleLogOut}>Cerra sesion</button>
      </nav>

      <nav className="nav-mobile">
        <div className="nav-mobile__container-icon">
          <span className="material-symbols-outlined" onClick={handleClickMenu}>
            menu
          </span>           
              <ul className={`ul-menu-mobile ${openMenu ? "open" : ""}`}>
                <li onClick={() => setOpenMenu(prev=> !prev)}> <Link to="/dashboard">Dashboard</Link> </li>
                <li onClick={() => setOpenMenu(prev=> !prev)}> <Link to="/menu">Menu</Link> </li>
                <li onClick={() => setOpenMenu(prev=> !prev)}> <Link to="/ajustes">Ajustes</Link> </li>
                <button onClick={handleLogOut}>Cerra sesion</button>
              </ul>
        </div>

      </nav>
    </>

  )
}
