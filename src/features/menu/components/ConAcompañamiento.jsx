
export const ConAcompañamiento = (
    {
        productMode,
        acepto,
        setAcepto,
        agregarNuevaVariante,
        setValueInput,
    }
) => {
    return (
        <>
            {productMode === 'selection' && (
                <div className='form__item checkbox-container'>
                    <label>
                        <input
                            type="checkbox"
                            checked={acepto}
                            onChange={(e) => {
                                setAcepto(e.target.checked);
                                if (e.target.checked) agregarNuevaVariante("Elegí tus sabores", true);
                                else setValueInput(prev => ({...prev, variantes: [] }));
                            }}
                        />
                        ¿Tiene acompañamiento o elección de sabores?
                    </label>
                </div>
            )}
        </>
    )
}
