import { useVariantesAgregar } from "../hook/useVariantesAgregar";
import { LimiteUnidades } from "./LimiteUnidades";
import { NombreGrupo } from "./NombreGrupo";
import { OpcionesPrecios } from "./OpcionesPrecios";

export const ListaVariantes = (
    {
        productMode,
        valueInput,
        setValueInput,
        handleOpcionChange,
        precioGlobalOpciones,

    }
) => {
    const { removeOpcion, addOpcion } = useVariantesAgregar(setValueInput);
    return (
        <>
            {productMode !== 'simple' && valueInput.variantes.map((variante, i) => (
                <div className='form__item variantes' key={i}>
                    <NombreGrupo valueInput={valueInput} setValueInput={setValueInput} variante = {variante} i={i} />
                    <LimiteUnidades  i = {i} variante= {variante} productMode={productMode} valueInput={valueInput} setValueInput={setValueInput} />
                    {variante.opciones.map((op, j) => (
                        <OpcionesPrecios
                            key={j}
                            i={i}
                            op={op}
                            j={j}
                            productMode={productMode}
                            handleOpcionChange={handleOpcionChange}
                            precioGlobalOpciones={precioGlobalOpciones}
                            onRemove={() => removeOpcion(i, j)}
                        />
                    ))}
                    <button type='button' className="btn-add-opcion" onClick={() => addOpcion(i)}>
                        + Añadir Opción
                    </button>
                </div>
            ))}
        </>

    )
}