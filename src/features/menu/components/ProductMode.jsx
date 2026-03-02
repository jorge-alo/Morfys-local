
export const ProductMode = ({
    productMode,
    setProductMode,
    getHelperText,
    setAcepto,
    setValueInput,
    agregarNuevaVariante
}) => {
    return (
        <div className="product-mode-selector">
            <label>¿Qué productMode de producto es?</label>
            <div className="mode-options">
                {['simple', 'unit', 'selection', 'sizes', 'addons'].map((mode) => (
                    <button
                        key={mode}
                        type="button"
                        className={productMode === mode ? 'active' : ''}
                        onClick={() => {
                            setProductMode(mode);
                            setAcepto(false);
                            if (mode === 'simple' || mode === 'selection') {
                                setValueInput({ variantes: [], tamanio: 0 });
                            } else if (mode === 'unit') agregarNuevaVariante("Sabores/Gustos", true);
                            else if (mode === 'sizes') agregarNuevaVariante("Tamaño", true);
                            else if (mode === 'addons') agregarNuevaVariante("Agregados", true);
                        }}
                    >
                        {mode === 'simple' && 'Simple'}
                        {mode === 'unit' && 'Unidad'}
                        {mode === 'selection' && 'Promo'}
                        {mode === 'sizes' && 'Tamaños'}
                        {mode === 'addons' && 'Base + Agregados'}
                    </button>
                ))}
            </div>
            <p className="mode-helper-text">{getHelperText()}</p>
        </div>
    )
}
