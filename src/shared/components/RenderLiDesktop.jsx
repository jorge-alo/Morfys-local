import { Link, useNavigate } from "react-router-dom";

export const RenderLiDesktop = (
    {
        local,
        handleLogOut,
        admin,
        payStatus,
        handleShowModalPay,
        activeUntil
    }
) => {
    
    const navigate = useNavigate();
    return (
        <nav className="nav">
            <h3>¡Hola {local}!</h3>
            <ul>
                {admin ? <>
                    <li><Link to="/admin/locales" >Gestionar Locales</Link></li>
                    <li><Link to="/admin/usuarios" >Gestionar Usuarios</Link></li>
                    {/* Si quieres que el admin vea estadísticas globales */}
                    <li><Link to="/admin/dashboard" >Estadísticas Globales</Link></li>
                </> :
                    <>
                        <li> <Link to="/dashboard">Dashboard</Link> </li>
                        <li> <Link to="/menu">Menu</Link> </li>
                        <li> <Link to="/ajustes">Ajustes</Link> </li>
                        {payStatus.show && (
                            <li>
                                <div className={`container-pagar ${payStatus.isExpired ? 'vencido' : ''}`} onClick={handleShowModalPay}>
                                    <h3 >Pagar</h3>
                                    <h5 className="h5-pagar"> {payStatus.message} ({new Date(activeUntil).toLocaleDateString("es-AR")})</h5>
                                </div>

                            </li>
                        )}
                    </>
                }
            </ul>
            <button onClick={() => handleLogOut(navigate)}>Cerra sesion</button>
        </nav>
    )
}
