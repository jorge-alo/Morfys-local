import { useContext, useEffect, useState } from "react"
import { DataContext } from "../context/DataContext"

export const TablaLocales = () => {
    const { getLocales } = useContext(DataContext);
    const [locales, setLocales] = useState([]);

    const handleGetLocales = async () => {
        const locales = await getLocales();
        setLocales(locales.locales);
        console.log("Valor de locales en TablaUser", locales);
    }

    useEffect(() => {
        handleGetLocales()
    }, [])


    return (
        <div>
            <table>
                <thead>
                    <tr>  
                    <th >id</th>
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
        </div>
    )
}
