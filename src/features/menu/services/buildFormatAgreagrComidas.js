
export const buildFormatAgreagrComidas = (imageFile, valueInput, productMode, acepto, precioGlobalOpciones) => {
    const formData = new FormData();
    if (imageFile) formData.append('image', imageFile);

    let variantesFinales = [...valueInput.variantes];
    let precioFinal = valueInput.price;
    let tamanioFinal = 0;

    if (productMode === 'simple' || (productMode === 'selection' && !acepto)) {
        variantesFinales = [];
    } else if (productMode === 'unit') {
        precioFinal = 0;
        variantesFinales = valueInput.variantes.map(v => ({
            ...v,
            limite: 0,
            opciones: v.opciones.map(op => ({ ...op, precio_adicional: op.precio_adicional > 0 ? op.precio_adicional : precioGlobalOpciones }))
        }));
    } else if (productMode === 'selection' && acepto) {
        // En promos, las opciones internas suelen ser precio 0 porque el precio es el de la promo
        variantesFinales = valueInput.variantes.map(v => ({
            ...v,
            opciones: v.opciones.map(op => ({ ...op, precio_adicional: 0 }))
        }));
    } else if (productMode === 'sizes') {
        precioFinal = 0;
        tamanioFinal = 1;
    }

    formData.append('id', valueInput.id);
    formData.append('name', valueInput.name);
    formData.append('description', valueInput.description);
    formData.append('price', precioFinal);
    formData.append('categoria', valueInput.categoria);
    formData.append('tamanio', tamanioFinal);
    formData.append('productMode', productMode);
    formData.append('variantes', JSON.stringify(variantesFinales));

    return formData
}
