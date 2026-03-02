
export const useVariantesAgregar = (setValueInput) => {

    const removeGrupo = (i) => {
        setValueInput(prev => {

                return {
                    ...prev,
                    variantes: prev.variantes.filter((_, idx) => idx !== i)
                }
            
            })
            
    };

const addOpcion = (varianteIndex) => {
    setValueInput((prev) => {
        const nuevasVariantes = prev.variantes.map((v, idx) =>
            idx === varianteIndex
                ? {
                    ...v,
                    opciones: [
                        ...v.opciones,
                        { nombre: "", precio_adicional: 0 }
                    ]
                }
                : v
        );

        return {
            ...prev,
            variantes: nuevasVariantes
        };
    });
};

const removeOpcion = (i, j) => {
    setValueInput(prev => ({
        ...prev,
        variantes: prev.variantes.map((v, idx) =>
            idx === i
                ? {
                    ...v,
                    opciones: v.opciones.filter((_, ido) => ido !== j)
                }
                : v
        )
    }));
};

return {
    removeOpcion,
    addOpcion,
    removeGrupo
};

}
