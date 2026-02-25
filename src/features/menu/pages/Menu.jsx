import { useEffect } from "react"
import '../../../styles/Menu.css'
import { useState } from "react";
import { Modal } from "../components/Modal";
import { Tablas } from "../components/Tablas";
import { Filter } from "../components/Filter";
import { useFormStore } from "../../../store/useFormStore";
import { useAuthStore } from "../../../store/useAuthStore";
import { useDataStore } from "../../../store//useDataStore";
import { ActualizarPrecio } from "../components/ActualizarPrecio";


export const Menu = () => {

  const admin = useAuthStore((state) => state.admin);
  const local = useAuthStore((state) => state.local);
  const handleGetData = useDataStore((state) => state.handleGetData);
  const comidas = useFormStore((state) => state.comidas);
  const setComidas = useFormStore((state) => state.setComidas);
  const setAcceptSelection = useFormStore((state) => state.setAcceptSelection);
  const [showInputRow, setShowInputRow] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [selectAll, setSelectAll] = useState(false);

  const handleLocales = async () => {
    const result = await handleGetData(local);
    setComidas(result.data.comidas);
  }

  useEffect(() => {
    if (!admin) {
      handleLocales();
    }
  }, []);

  const handleShowForm = () => {
    setShowInputRow(true);

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

      <Filter />
      <div className="container-table__mainButtons">
        <button className="container-table__agregarcomida" onClick={handleShowForm}>Agregar Comida</button>
        <ActualizarPrecio setAcceptSelection={setAcceptSelection} handleLocales={handleLocales} setSelectAll={setSelectAll} />
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
