import { useState, useEffect } from 'react';
import '../../../styles/Form.css';
import { useFormStore } from '../../../store/useFormStore';
import { useDataStore } from '../../../store/useDataStore';
import { useAgregarComidas } from '../hook/useAgregarComidas';
import { ProductMode } from './ProductMode';
import { ComidaData } from './ComidaData';
import { PrecioPromoFinal } from './PrecioPromoFinal';
import { AgregarVariantes } from './AgregarVariantes';
import { PrecioUnidad } from './PrecioUnidad';
import { ListaVariantes } from './ListaVariantes';
import { ConAcompañamiento } from './ConAcompañamiento';

export const Form = ({ handleClose, handleLocales }) => {
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
        handleSaveEdit,
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

            <ComidaData
                valueInput={valueInput}
                handleChange={handleChange}
                imageFile={imageFile}
            />

            <PrecioPromoFinal
                productMode={productMode}
                valueInput={valueInput}
                handleChange={handleChange}
            />

            <PrecioUnidad
                productMode={productMode}
                precioGlobalOpciones={precioGlobalOpciones}
                setPrecioGlobalOpciones={setPrecioGlobalOpciones}
            />

            <ConAcompañamiento
                productMode={productMode}
                acepto={acepto}
                setAcepto={setAcepto}
                agregarNuevaVariante={agregarNuevaVariante}
                setValueInput={setValueInput}
            />

            <ListaVariantes
                productMode={productMode}
                valueInput={valueInput}
                setValueInput={setValueInput}
                handleOpcionChange={handleOpcionChange}
                precioGlobalOpciones={precioGlobalOpciones}
            />

            {/* BOTÓN PARA AGREGAR NUEVOS GRUPOS EN MODO PROMO */}
            <AgregarVariantes
                productMode={productMode}
                acepto={acepto}
                agregarNuevaVariante={agregarNuevaVariante}
            />

            <div className="form__buttons">
                <button type='button' className="btn-cancel" onClick={handleClose}>Cancelar</button>
                <button type='button' className="btn-submit" onClick={handleSaveEdit}>Actualizar Producto</button>
            </div>
        </form>
    );
};