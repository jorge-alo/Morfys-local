import { AgregarVariantes } from "./AgregarVariantes";
import { ComidaData } from "./ComidaData";
import { ConAcompañamiento } from "./ConAcompañamiento";
import { ListaVariantes } from "./ListaVariantes";
import { PrecioPromoFinal } from "./PrecioPromoFinal";
import { PrecioUnidad } from "./PrecioUnidad";

export const InputAgregarComidas = (
    {
        imageFile,
        handleChange,
        handleClose,
        precioGlobalOpciones,
        setPrecioGlobalOpciones,
        handleSaveComidas,
        handleOpcionChange,
        valueInput,
        setValueInput,
        acepto,
        setAcepto,
        productMode,
        agregarNuevaVariante
    }) => {
    return (
        <>
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

            <AgregarVariantes
                productMode={productMode}
                acepto={acepto}
                agregarNuevaVariante={agregarNuevaVariante}
            />

            <div className="form__buttons">
                <button type='button' className="btn-cancel" onClick={handleClose}>Cancelar</button>
                <button type='button' className="btn-submit" onClick={handleSaveComidas}>Guardar Producto</button>
            </div>
        </>
    )
}
