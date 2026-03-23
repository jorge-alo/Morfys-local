import { Link, useNavigate } from "react-router-dom";
import { useDataStore } from "../../store/useDataStore";

export const RendelLiMobile = (
    {
        handleClickMenu,
        openMenu,
        setOpenMenu,
        handleLogOut,
        admin,
        payStatus,
        handleShowModalPay,
        activeUntil,
        handleStandby
    }
) => {
    const standby = useDataStore((state) => state.standby);
    const navigate = useNavigate();
    return (
        <nav className="nav-mobile">
            <div className="nav-mobile__container-icon">
                <span className="material-symbols-outlined" onClick={handleClickMenu}>
                    menu
                </span>
                <ul className={`ul-menu-mobile ${openMenu ? "open" : ""}`}>
                    {admin ? <>
                        <li><Link to="/admin/locales" onClick={() => setOpenMenu(false)}>Gestionar Locales</Link></li>
                        <li><Link to="/admin/usuarios" onClick={() => setOpenMenu(false)}>Gestionar Usuarios</Link></li>
                        {/* Si quieres que el admin vea estadísticas globales */}
                        <li><Link to="/dashboard" onClick={() => setOpenMenu(false)}>Estadísticas Globales</Link></li>
                    </>
                        :
                        <>
                            <li onClick={() => setOpenMenu(prev => !prev)}> <Link to="/dashboard">Dashboard</Link> </li>
                            <li onClick={() => setOpenMenu(prev => !prev)}> <Link to="/menu">Menu</Link> </li>
                            <li onClick={() => setOpenMenu(prev => !prev)}> <Link to="/ajustes">Ajustes</Link> </li>
                            <li>
                                <label className="standby-toggle">
                                    <input
                                        type="checkbox"
                                        checked={standby}
                                        onChange={(e) => handleStandby(e.target.checked)}
                                    />
                                    Standby
                                </label>
                            </li>
                        </>
                    }
                    {
                        payStatus.show && (
                            <li>
                                <div className={`container-pagar ${payStatus.isExpired ? 'vencido' : ''}`} onClick={handleShowModalPay}>
                                    <h3 >Pagar</h3>
                                    <h5 className="h5-pagar"> {payStatus.message} ({new Date(activeUntil).toLocaleDateString("es-AR")})</h5>
                                </div>
                            </li>
                        )
                    }
                    <button onClick={() => handleLogOut(navigate)}>Cerra sesion</button>
                </ul>

            </div>

        </nav>
    )
}
