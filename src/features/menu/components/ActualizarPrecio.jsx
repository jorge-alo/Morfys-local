import { useState } from "react";
import { useFormStore } from "../../../store/useFormStore";
import { sendPorcentageApi } from "../../../api/request.api";
import { calcularItems } from "../services/calcularItems";


export const ActualizarPrecio = ({ handleLocales, setSelectAll, setAcceptSelection }) => {
    const [porcentage, setPorcentage] = useState("");
    const comidas = useFormStore((state) => state.comidas);
    const acceptSelection = useFormStore((state) => state.acceptSelection);
    
    const handleChangePercentage = async (value) => {
        setPorcentage(value);
    }
    const handleSendChangePorsentage = async() => {
        if (porcentage == null) return
        const updateItem = calcularItems(comidas, acceptSelection, porcentage);
        await sendPorcentageApi(updateItem);
        setAcceptSelection({})
        await handleLocales()
        setPorcentage("");
        setSelectAll(false);
    }
    return (
        <div className="container-table__update-porcentage">
            <div className="container-table__actualizarPrecio">
                <label htmlFor="percentagePrice">%</label>
                <input
                    type="number"
                    name="percentagePrice"
                    id="percentagePrice"
                    value={porcentage}
                    onChange={(e) => handleChangePercentage(e.target.value)}
                />
            </div>
            <button onClick={handleSendChangePorsentage}>Actualizar precio</button>
        </div>
    )
}
