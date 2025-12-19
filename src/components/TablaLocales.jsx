import { useContext, useEffect, useState } from "react"
import { DataContext } from "../context/DataContext"

export const TablaLocales = () => {
    const { getLocales } = useContext(DataContext);
    const [locales, setLocales] = useState([]);

    const handleGetLocales = async () => {

        try {
            const result = await getLocales();
            const lista = result?.data.locales || result || [];
            setLocales(lista);
        } catch (error) {
            console.error("Error al obtener locales:", error);
        }

        console.log("Valor de locales en TablaUser", locales);
    }

    useEffect(() => {
        handleGetLocales()
    }, [])


    return (
        <div>

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
                    <tbody>
                        {locales.map((res) => (
                            <tr key={res.id}>
                                <td>{res.id}</td>
                                <td>{res.local}</td>
                                <td>
                                    <div className="local-info">
                                        {res.logo && <img src={res.logo} alt="logo" className="mini-logo" />}
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
    )
}
