
export const TrSinVariantes = (
    {
        acceptSelection,
        item,
        handleAcceptSelection,
        aceptarHeaderCheck,
        acepto,
        handleChangeStandby,
        handleEdit,
        handleEliminar,
        index
    }
) => {
    return (
        <tr >
            <td>
                <input
                    type="checkbox"
                    checked={!!acceptSelection[`item-${item.id}`]}
                    onChange={(e) =>
                        handleAcceptSelection(item, e.target.checked)
                    }
                />
            </td>

            {Object.entries(item).map(([key, value], i) => {
                if (
                    key === "id" ||
                    key == "description" ||
                    key === "variantes" ||
                    key === "tamanio" ||
                    key === "image" ||
                    key == "productMode"
                )
                    return null;

                return (
                    <td
                        className={key === "standby" ? "inputStandby" : key === "name" ? 'name' : "other"}
                        key={i}
                    >
                        {key === "standby" ? (
                            <input
                                type="checkbox"
                                name="standby"
                                checked={
                                    aceptarHeaderCheck
                                        ? acepto[`item-${item.id}`]?.check
                                            ? aceptarHeaderCheck
                                            : acepto[`item-${item.id}`]?.check
                                        : acepto[`item-${item.id}`]?.check !== undefined
                                            ? acepto[`item-${item.id}`]?.check
                                            : value == 1
                                }
                                onChange={(e) =>
                                    handleChangeStandby(e.target.checked, item)
                                }
                            />
                        ) : (
                            key == "price"
                                ? `$${value} `
                                : value
                        )}
                    </td>
                );
            })}

            <td className="td-button">
                <button className='td-button__editar' onClick={() => handleEdit(index)}>Editar</button>
                <button className='td-button__eliminar' onClick={() => handleEliminar(item.id)}>Eliminar</button>
            </td>
        </tr>
    )
}
