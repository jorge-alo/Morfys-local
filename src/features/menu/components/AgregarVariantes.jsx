
export const AgregarVariantes = ({
    productMode,
    acepto,
    agregarNuevaVariante
}) => {
    return (
        <>
            {/* NUEVO BOTÓN: Solo aparece en selección/promo para agregar más grupos */}
            {productMode === 'selection' && acepto && (
                <button
                    type="button"
                    className="btn-add-opcion"
                    style={{ marginBottom: '20px', width: '100%', background: '#f0f0f0', color: '#333' }}
                    onClick={() => agregarNuevaVariante("Nuevo Grupo (ej. Bebidas)")}
                >
                    + Añadir otro Grupo de Selección (Bebida, Postre, etc.)
                </button>
            )}
        </>
    )
}
