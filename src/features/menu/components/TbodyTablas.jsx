import { TrSinVariantes } from "./TrSinVariantes";
import { TrTamañoVariante } from "./TrTamañoVariante";

export const TbodyTablas = ({
    comidas, acceptSelection, handleAcceptSelection,
    aceptarHeaderCheck, acepto, handleChangeStandby, handleEdit, handleEliminar, getCheckedValue
}) => {
    return (
        <tbody>
            {comidas &&
                comidas.map((item, index) => {
                    // ✅ Caso especial: cuando hay tamanio y variantes
                    if ((item.tamanio === 1 && Array.isArray(item.variantes)) || (item.price == 0 && Array.isArray(item.variantes))) {
                        return item.variantes.flatMap((v, idxVar) =>   // 🔹 abre flatMap
                            v.opciones.map((op, idxOp) => (              // 🔹 abre map
                                <TrTamañoVariante
                                    key={`${item.id}-${v.id}-${op.id}`}
                                    item={item}
                                    v={v}
                                    op={op}
                                    acceptSelection={acceptSelection}
                                    handleAcceptSelection={handleAcceptSelection}
                                    aceptarHeaderCheck={aceptarHeaderCheck}
                                    acepto={acepto}
                                    handleChangeStandby={handleChangeStandby}
                                    handleEdit={handleEdit}
                                    handleEliminar={handleEliminar}
                                    index={index}
                                    getCheckedValue={getCheckedValue}
                                />
                            ))                                          // 🔹 cierra map
                        );                                            // 🔹 cierra flatMap
                    }                                               // 🔹 cierra if

                    // ✅ Caso normal (sin variantes)
                    return (
                        <TrSinVariantes
                            key={item.id}
                            acceptSelection={acceptSelection}
                        item= {item}
                        handleAcceptSelection = { handleAcceptSelection}
                        aceptarHeaderCheck = {aceptarHeaderCheck}
                        acepto = {acepto}
                        handleChangeStandby = {handleChangeStandby}
                        handleEdit = {handleEdit}
                        handleEliminar = {handleEliminar}
                        index = { index}
                        />
                    );
                })}
        </tbody>
    )
}
