import { useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import { DataContext } from "../context/DataContext";
import '../styles/Menu.css'
import { useState } from "react";
import { useForm } from "../context/FormProvider";
import { Modal } from "../components/Modal";
import { Tablas } from "../components/Tablas";
import { Filter } from "../components/Filter";
import { TablaUser } from "../components/TablaUser";
import { ModalUSer } from "../components/ModalUSer";
import { ModalPay } from "../components/ModalPay";


export const Menu = () => {

  const { local, admin, localId } = useContext(AuthContext);
  const { handleGetData, sendPorcentage } = useContext(DataContext);
  const { comidas, setComidas, acceptSelection, setAcceptSelection, showModalPay, setShowModalPay } = useForm();
  const [showInputRow, setShowInputRow] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [selectItem, setSelectItem] = useState({});
  const [porcentage, setPorcentage] = useState("");
  const [selectAll, setSelectAll] = useState(false);
 

  console.log("Valor de localId en menu", localId);

  const handleLocales = async () => {
    const result = await handleGetData(local);
    setComidas(result.data.comidas);
  }

  useEffect(() => {
    handleSendPorcentageAPi();
    setAcceptSelection({})
    if (!admin) {
      handleLocales();
    }

  }, [selectItem])

  useEffect(() => {
    if (!admin) {
      handleLocales();
    }
  }, [selectItem])

  const handleShowForm = () => {
    setShowInputRow(true);

  }

  const handleChangePercentage = (value) => {
    setPorcentage(value);
  }

  const handleSendPorcentageAPi = async () => {
    const response = await sendPorcentage(selectItem);
  }

  const handleSendChangePorsentage = () => {
    if (porcentage == null) return
    const updateItem = [];
    comidas.forEach(comida => {
      if (acceptSelection[`item-${comida.id}`]) {
        updateItem.push({
          idItem: comida.id,
          newPrice: Math.round(((comida.price * porcentage / 100) + Number(comida.price)) / 100) * 100
        })
      }
      if ((comida.tamanio == 1 && Array.isArray(comida.variantes)) || (comida.price == 0 && Array.isArray(comida.variantes)) ) {
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

    setSelectItem(updateItem);
    setPorcentage("");
    setSelectAll(false);
  }

  return (
    <div className="container-table">
      {(editIndex != null || showInputRow) &&
        <Modal
          setEditIndex={setEditIndex}
          showInputRow={showInputRow}
          setShowInputRow={setShowInputRow}
          handleLocales={handleLocales}
        />
      }

      {
        showModalPay &&
        <ModalPay showModalPay={showModalPay} setShowModalPay={setShowModalPay}/>
      }
      
       
          
            <Filter />
            <div className="container-table__mainButtons">
              <button className="container-table__agregarcomida" onClick={handleShowForm}>Agregar Comida</button>
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
            </div>
          

          <Tablas
            comidas={comidas}
            setEditIndex={setEditIndex}
            handleLocales={handleLocales}
            selectAll={selectAll}
            setSelectAll={setSelectAll}
          />
    </div>

  )
}
