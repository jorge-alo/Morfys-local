
export const OpcionesPrecios = (
    {
        i,
        op,
        j,
        productMode,
        handleOpcionChange,
        onRemove,
        precioGlobalOpciones
    }
) => {
    return (
        <div key={j} className='opcion-container'>
            <div className='nombreOpcion'>
                <label>Opciones:</label>
                <div className='container-input-opciones'>
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={op.nombre}
                        onChange={(e) => handleOpcionChange(i, j, 'nombre', e.target.value)}
                    />
                    {(productMode === 'selection' || productMode === 'unit') &&
                        (<button type="button" className="btn-remove" onClick= {onRemove} >✕</button>)
                    }
                </div>
            </div>

            {(productMode !== 'selection') && (
                <div className='precio-opcion'>
                    <label>Precio {productMode === 'unit' ? 'Especial' : 'Adicional'}</label>
                    <input
                        type="number"
                        value={op.precio_adicional}
                        placeholder={precioGlobalOpciones} // El global aparece como guía
                        onChange={(e) => handleOpcionChange(i, j, 'precio_adicional', Number(e.target.value))}
                    />
                    {productMode === 'unit' && op.precio_adicional === 0 && (
                        <small style={{ fontSize: '10px', color: 'gray' }}>Usando precio global</small>
                    )}
                </div>
            )}

        </div>
    )
}
