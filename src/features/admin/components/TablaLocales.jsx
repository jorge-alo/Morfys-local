import '../../../styles/TablaLocales.css'
import { useGetLocalesEffect } from "../hook/useGetLocalesEffect";

export const TablaLocales = () => {

    const { loading, locales } = useGetLocalesEffect();
    if (loading) return <p>Cargando locales...</p>;

    return (
        <div className="container-tablaLocales">
            <div className="container-tabalLocales__container-tabla">
                {/* Si el array está vacío, mostrar un mensaje */}
                {locales.length === 0 ? (
                    <p>No hay locales registrados o cargando...</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th >id</th>
                                <th >nombre</th>
                                <th >logo</th>
                                <th >celular</th>
                                <th >user_id</th>
                                <th >accion</th>

                            </tr>
                        </thead>
                        <tbody className='tbody-tablaLocales'>
                            {locales.map((res) => (
                                <tr key={res.id}>
                                    <td>{res.id}</td>
                                    <td>{res.local}</td>
                                    <td>
                                        <div className="local-info">
                                            <div>
                                                {res.logo && <img src={res.logo} alt="logo" className="mini-logo" />}
                                            </div>
                                            <strong>{res.local}</strong>
                                        </div>
                                    </td>
                                    <td>{res.cel}</td>
                                    <td>{res.user_id ? `Asignado (ID: ${res.user_id})` : "Sin Dueño"}</td>
                                    <td>
                                        <button className="btn-edit">Configurar Horarios</button>
                                        <button className="btn-delete">Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

            </div>

        </div>
    )
}
