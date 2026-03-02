
export const LimiteUnidades = (
    {
        i,
        productMode,
        valueInput,
        setValueInput,
        variante
    }
) => {
    return (
        <>
            {productMode === 'selection' && (
                <div className='form__item'>
                    <label>Límite de unidades a elegir de este grupo</label>
                    <input
                        type="number"
                        min="1"
                        value={variante.limite}
                        onChange={(e) => {
                            const nuevas = valueInput.variantes.map((v, idx) => idx === i ? { ...v, limite: Number(e.target.value) } : v);
                            setValueInput({ variantes: nuevas });
                        }}
                    />
                </div>
            )}
        </>
    )
}
