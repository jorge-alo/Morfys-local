import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { useForm } from '../context/FormProvider';
import { AuthContext } from '../context/AuthContext';
import '../styles/Tablas.css'
import { useFormStore } from '../store/useFormStore';
import { useAuthStore } from '../store/useAuthStore';

export const Tablas = ({ setEditIndex, handleLocales, selectAll, setSelectAll }) => {
  const { handleDestroy, addStandbyAll } = useContext(DataContext);
  const comidas = useFormStore((state) => state.comidas);
  const setValueInput = useFormStore((state) => state.setValueInput);
  const valueInput = useFormStore((state) => state.valueInput);
  const acceptSelection = useFormStore((state) => state.acceptSelection);
  const setAcceptSelection = useFormStore((state) => state.setAcceptSelection);
  const categoria = useFormStore((state) => state.categoria);
  const handleAcceptSelection = useFormStore((state) => state.handleAcceptSelection);
  const userId = useAuthStore((state) => state.userId)
  const [acepto, setacepto] = useState({});
  const [aceptarHeaderCheck, setAceptarHeaderCheck] = useState(false);

  const handleEdit = (index) => {
    setEditIndex(index);
    setValueInput({
      ...comidas[index]
    })
  }

  const handleEliminar = async (id) => {
    const confirmar = confirm("Esta seguro de quere eliminar esta comida");
    if (confirmar) {
      const result = await handleDestroy(id)
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



  return (
    <div className="scroll-table-wrapper">
      <table className="table-getdata">
        <thead>
          <tr>
            <th className="check-col">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={(e) => handleChangeSelectAll(e.target.checked)}
              />
            </th>
            {
              comidas && comidas.length > 0 &&
              Object.keys(comidas[0]).map((key, index) => {
                if (key == "id" || key == "description" || key == "variantes" || key == "tamanio" || key == "image") return null;
                return <th key={index} className={key === 'name' ? 'name' : 'other'}>
                  {key == "standby" ?
                    <>
                      <div className="standby" >
                        <input
                          type="checkbox"
                          checked={aceptarHeaderCheck}
                          onChange={(e) => handleChangeAceptarHeader(e.target.checked)}
                        />
                        {key}
                      </div>

                    </>

                    :
                    key
                  }   </th>
              })

            }

            <th>Accion</th>

          </tr>

        </thead>
        <tbody>
          {comidas &&
            comidas.map((item, index) => {
              // ✅ Caso especial: cuando hay tamanio y variantes
              if ((item.tamanio === 1 && Array.isArray(item.variantes)) || (item.price == 0 && Array.isArray(item.variantes))) {
                return item.variantes.flatMap((v, idxVar) =>   // 🔹 abre flatMap
                  v.opciones.map((op, idxOp) => (              // 🔹 abre map
                    <tr key={`${item.id}-${v.id}-${op.id}`}>
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
                          key == "description"
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
                                checked={
                                  aceptarHeaderCheck
                                    ? acepto[`op-${op.id}`]?.check
                                      ? aceptarHeaderCheck
                                      : acepto[`op-${op.id}`]?.check
                                    : acepto[`op-${op.id}`]?.check !== undefined
                                      ? acepto[`op-${op.id}`]?.check
                                      : op.standby == 1
                                }
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
                        <button className='td-button__eliminar' onClick={() => handleEliminar(item.id)}>Eliminar</button>
                      </td>
                    </tr>
                  ))                                          // 🔹 cierra map
                );                                            // 🔹 cierra flatMap
              }                                               // 🔹 cierra if

              // ✅ Caso normal (sin variantes)
              return (
                <tr key={item.id}>
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
                    if (key === "id" || key == "description" || key === "variantes" || key === "tamanio" || key === "image")
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
              );
            })}
        </tbody>
      </table>
    </div>
  )
}
