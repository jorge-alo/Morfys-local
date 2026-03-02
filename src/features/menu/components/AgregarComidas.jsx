import { useState } from 'react'
import '../../../styles/AgregarComidas.css'
import { useFormStore } from '../../../store/useFormStore';
import { useAgregarComidas } from '../hook/useAgregarComidas';
import { ProductMode } from './ProductMode';
import { InputAgregarComidas } from './InputAgregarComidas';

export const AgregarComidas = ({ handleClose, handleLocales }) => {
  const valueInput = useFormStore((state) => state.valueInput);
  const setValueInput = useFormStore((state) => state.setValueInput);
  const handleChange = useFormStore((state) => state.handleChange);
  const imageFile = useFormStore((state) => state.imageFile);
  const [acepto, setAcepto] = useState(false);

  const {
    productMode,
    setProductMode,
    precioGlobalOpciones,
    setPrecioGlobalOpciones,
    agregarNuevaVariante,
    handleSaveComidas,
    handleOpcionChange,
    getHelperText
  } = useAgregarComidas(acepto, setAcepto, valueInput, setValueInput, imageFile, handleLocales, handleClose)

  return (
    <form className='form' onSubmit={(e) => e.preventDefault()}>
      <ProductMode
        productMode={productMode}
        setProductMode={setProductMode}
        getHelperText={getHelperText}
        setAcepto={setAcepto}
        setValueInput={setValueInput}
        agregarNuevaVariante={agregarNuevaVariante}
      />

      <InputAgregarComidas
        imageFile={imageFile}
        handleChange={handleChange}
        handleClose={handleClose}
        precioGlobalOpciones={precioGlobalOpciones}
        setPrecioGlobalOpciones={setPrecioGlobalOpciones}
        handleSaveComidas={handleSaveComidas}
        handleOpcionChange={handleOpcionChange}
        agregarNuevaVariante={agregarNuevaVariante}
        valueInput={valueInput}
        setValueInput={setValueInput}
        acepto={acepto}
        productMode={productMode}
        setAcepto={setAcepto}
      />
    </form>
  );
};