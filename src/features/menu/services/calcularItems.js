

export const calcularItems = (comidas, acceptSelection, porcentage) => {
    let updateItem = [];
    comidas.forEach(comida => {
        if (acceptSelection[`item-${comida.id}`]) {
            updateItem.push({
                idItem: comida.id,
                newPrice: Math.round(((comida.price * porcentage / 100) + Number(comida.price)) / 100) * 100
            })
        }
        if ((comida.tamanio == 1 && Array.isArray(comida.variantes)) || (comida.price == 0 && Array.isArray(comida.variantes))) {
            comida.variantes[0].opciones.forEach(op => {
                if (acceptSelection[`op-${op.id}`]) {
                    updateItem.push({
                        idOp: op.id,
                        newPrice: Math.round((Number((op.precio_adicional * porcentage / 100)) + Number(op.precio_adicional)) / 100) * 100
                    })
                }
            })
        }
    })
    return updateItem
}
