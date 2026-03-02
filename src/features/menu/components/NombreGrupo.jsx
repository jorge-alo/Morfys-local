import { useVariantesAgregar } from "../hook/useVariantesAgregar";

export const NombreGrupo = (
    {
        valueInput,
        setValueInput,
        variante,
        i,
        j
    }
) => {
    const { removeGrupo } = useVariantesAgregar(setValueInput);
    return (
        <div className='nombre-grupo'>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label>Nombre del grupo (Ej: Gustos, Bebidas)</label>
                {/* Botón para borrar el grupo entero si hay más de uno */}
                {valueInput.variantes.length > 1 && (
                    <button type="button" className="btn-remove" onClick={ () => removeGrupo(i)}>Eliminar Grupo</button>
                )}
            </div>
            <input
                type="text"
                value={variante.nombre}
                onChange={(e) => {
                    const nuevas = valueInput.variantes.map((v, idx) => idx === i ? { ...v, nombre: e.target.value } : v);
                    setValueInput({ variantes: nuevas });
                }}
            />
        </div>
    )
}
