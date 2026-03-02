import { useEffect } from "react";

export const useTablas = (
    {setSelectAll, setEditIndex,
    handleLocales, handleDestroy,
    addStandbyAll, setValueInput,
    valueInput, setAcceptSelection,
    categoria, userId, setAceptarHeaderCheck,
    setacepto, comidas, acepto, aceptarHeaderCheck}
) => {

    const handleEdit = (index) => {
        setEditIndex(index);
        console.log("Valor de comidas en handleEdit", comidas[index]);
        setValueInput({
            ...comidas[index]
        })
    }

    const handleEliminar = async (id, opId = null) => {
        const confirmar = confirm("Esta seguro de quere eliminar esta comida");
        if (confirmar) {
            const result = await handleDestroy(id, opId)
            handleLocales(userId);
        } else {
            // Si hace clic en "Cancelar"
            console.log("Eliminación cancelada");
        }

    }
    const handleAddStandBy = async () => {
        try {
            const result = await addStandbyAll(categoria, acepto);
            console.log("📡 Respuesta backend:", result?.data);
        } catch (error) {
            console.log("Error:", error);
        }
    }

    useEffect(() => {
        handleAddStandBy()
    }, [acepto])

    const handleChangeAceptarHeader = (checked) => {
        setAceptarHeaderCheck(checked);
        setacepto(prev => {
            const newAcepto = { ...prev };
            comidas.forEach(item => {
                if ((item.tamanio == 1 && Array.isArray(item.variantes)) || (item.price == 0 && Array.isArray(item.variantes))) {
                    item.variantes[0].opciones.forEach(op => {
                        newAcepto[`op-${op.id}`] = { opId: op.id, check: checked };
                    })
                } else {
                    newAcepto[`item-${item.id}`] = { itemId: item.id, check: checked };
                }
            });
            return newAcepto;
        });
    }

    const handleChangeStandby = (checked, valor, op = null) => {
        setacepto(item => {
            if ((valor.tamanio == 1 && Array.isArray(valor.variantes)) || (valor.price == 0 && Array.isArray(valor.variantes))) {
                return {
                    ...item,
                    [`op-${op.id}`]: { opID: op.id, check: checked }
                }

            } else {
                return {
                    ...item,
                    [`item-${valor.id}`]: { itemId: valor.id, check: checked }
                }
            }
        })
    }

    const handleChangeSelectAll = (checked) => {
        setSelectAll(checked);
        const newSelectAll = {};
        comidas.forEach(item => {
            if (item.tamanio == 1 || item.price == 0) {
                item.variantes[0].opciones.forEach(op => {
                    newSelectAll[`op-${op.id}`] = checked
                })
            } else {
                newSelectAll[`item-${item.id}`] = checked;
            }

        })
        setAcceptSelection(newSelectAll);
    }
const getCheckedValue = (op) => {
      return  aceptarHeaderCheck
            ? acepto[`op-${op.id}`]?.check
                ? aceptarHeaderCheck
                : acepto[`op-${op.id}`]?.check
            : acepto[`op-${op.id}`]?.check !== undefined
                ? acepto[`op-${op.id}`]?.check
                : op.standby == 1
    };

    return {
        handleChangeSelectAll,
        handleEdit,
        handleChangeStandby,
        handleChangeAceptarHeader,
        handleEliminar,
        getCheckedValue
    }
}
