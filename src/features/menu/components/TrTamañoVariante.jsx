
export const TrTamañoVariante = (
    {
        item, v, op, acceptSelection, handleAcceptSelection,
        aceptarHeaderCheck, acepto, handleChangeStandby,
        handleEdit, handleEliminar, index, getCheckedValue
    }
) => {
    return (
        <tr >
            {/* Checkbox de selección */}
            <td className="check-col">
                <input
                    type="checkbox"
                    checked={!!acceptSelection[`op-${op.id}`]}
                    onChange={(e) =>
                        handleAcceptSelection(item, e.target.checked, op)
                    }
                />
            </td>

            {/* Celdas dinámicas */}
            {Object.keys(item).map((key, i) => {
                if (
                    key === "id" ||
                    key === "variantes" ||
                    key === "tamanio" ||
                    key === "image" ||
                    key == "description" ||
                    key == "productMode"
                )
                    return null; // ⬅️ este return es solo para saltar keys

                return (
                    <td
                        className={key === "standby" ? "inputStandby" : key === 'name' ? 'name' : "other"}
                        key={i}
                    >
                        {key === "standby" ? (
                            <input
                                type="checkbox"
                                name="standby"
                                checked={getCheckedValue(op)}
                                onChange={(e) =>
                                    handleChangeStandby(e.target.checked, item, op)
                                }
                            />
                        ) : key === "name" ? (
                            // 👉 nombre = comida + variante + opción
                            `${item.name} - ${v.nombre} ${op.nombre}`
                        ) : key === "price" ? (
                            // 👉 precio de la opción
                            `$${Number(op.precio_adicional)}`
                        ) : (
                            item[key]
                        )}
                    </td>
                );
            })}

            {/* Acciones */}
            <td className="td-button">
                <button className='td-button__editar' onClick={() => handleEdit(index)}>Editar</button>
                <button className='td-button__eliminar' onClick={() => handleEliminar(item.id, op.id)}>Eliminar</button>
            </td>
        </tr>
    )
}
