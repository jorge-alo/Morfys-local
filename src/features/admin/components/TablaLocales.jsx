import { useEffect, useState } from "react"
import { useDataStore } from "../../../store/useDataStore";
import '../../../styles/TablaLocales.css'

export const TablaLocales = () => {
    const getLocales = useDataStore((state) => state.getLocales);
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
                        <tbody>
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
