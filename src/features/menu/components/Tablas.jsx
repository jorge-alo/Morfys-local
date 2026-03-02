import { useEffect, useState } from 'react'
import '../../../styles/Tablas.css'
import { useFormStore } from '../../../store/useFormStore';
import { useAuthStore } from '../../../store/useAuthStore';
import { useDataStore } from '../../../store/useDataStore';
import { useTablas } from '../hook/useTablas';
import { TheadTablas } from './TheadTablas';
import { TbodyTablas } from './TbodyTablas';

export const Tablas = ({ setEditIndex, handleLocales, selectAll, setSelectAll }) => {

  const handleDestroy = useDataStore((state) => state.handleDestroy);
  const addStandbyAll = useDataStore((state) => state.addStandbyAll);
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

  const { handleChangeSelectAll,
    handleEdit,
    handleChangeStandby,
    handleChangeAceptarHeader,
    handleEliminar, getCheckedValue
  } = useTablas(
    {
      setSelectAll, setEditIndex,
      handleLocales, handleDestroy,
      addStandbyAll, setValueInput,
      valueInput, setAcceptSelection,
      categoria, userId, setAceptarHeaderCheck,
      setacepto, comidas, acepto, aceptarHeaderCheck
    }
  );


  return (
    <div className="scroll-table-wrapper">
      <table className="table-getdata">
        <TheadTablas
          handleChangeSelectAll={handleChangeSelectAll}
          selectAll={selectAll}
          comidas={comidas}
          aceptarHeaderCheck={aceptarHeaderCheck}
          handleChangeAceptarHeader={handleChangeAceptarHeader}
        />
        <TbodyTablas
          comidas = {comidas}
          acceptSelection = {acceptSelection}
          handleAcceptSelection = { handleAcceptSelection}
          aceptarHeaderCheck = {aceptarHeaderCheck}
          acepto = {acepto}
          handleChangeStandby = {handleChangeStandby}
          handleEdit = {handleEdit}
          handleEliminar = {handleEliminar}
          getCheckedValue = {getCheckedValue}
        />
      </table>
    </div>
  )
}
