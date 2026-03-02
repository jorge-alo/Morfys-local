
export const PrecioUnidad = (
    {
        productMode,
        precioGlobalOpciones,
        setPrecioGlobalOpciones
    }
) => {
    return (
        <>
            {productMode === 'unit' && (
                <div className='form__item'>
                    <label>Precio por Unidad</label>
                    <input type="number" value={precioGlobalOpciones} onChange={(e) => setPrecioGlobalOpciones(Number(e.target.value))} />
                </div>
            )}
        </>
    )
}
