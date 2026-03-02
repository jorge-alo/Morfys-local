import { useEffect, useState } from "react";
import { buildFormatAgreagrComidas } from "../services/buildFormatAgreagrComidas";
import { useDataStore } from '../../../store/useDataStore'
export const useAgregarComidas = (
    acepto, setAcepto, valueInput,
    setValueInput, imageFile,
    handleLocales, handleClose
) => {
    const handleCargarComidas = useDataStore((state) => state.handleCargarComidas);
    const handleUpdate = useDataStore((state) => state.handleUpdate);
    const [productMode, setProductMode] = useState('simple');
    const [precioGlobalOpciones, setPrecioGlobalOpciones] = useState(0);


    useEffect(() => {
        // Verificamos si existe el productMode (que es el productMode guardado)
        if (valueInput.productMode) {
            const modoGuardado = valueInput.productMode;

            setProductMode(modoGuardado);

            // Si es una promo, activamos el flag visual de 'acepto'
            if (modoGuardado === 'selection') {
                setAcepto(true);
            }

            // Si es modo unidad, opcionalmente puedes setear el precio global 
            // tomando el valor de la primera opción encontrada
            if (modoGuardado === 'unit' && valueInput.variantes?.[0]?.opciones?.[0]) {
                setPrecioGlobalOpciones(valueInput.variantes[0].opciones[0].precio_adicional);
            }
        } else {
            // Si es un producto nuevo sin 'productMode' definido todavía
            setProductMode('simple');
        }
    }, [valueInput.productMode]); // Se dispara cuando carga la info del producto

    // MODIFICADO: Ahora permite añadir grupos sin borrar los anteriores
    const agregarNuevaVariante = (nombreDefecto = "Opciones", reset = false) => {
        const nuevaVariante = { nombre: nombreDefecto, limite: 0, opciones: [{ nombre: "", precio_adicional: 0 }] };
        if (reset) {
            setValueInput({ ...valueInput, variantes: [nuevaVariante] });
        } else {
            setValueInput({ variantes: [...(valueInput.variantes || []), nuevaVariante] });
        }
    };

    const handleSaveComidas = async () => {
        const formData = buildFormatAgreagrComidas(imageFile, valueInput, productMode, acepto, precioGlobalOpciones)

        const result = await handleCargarComidas(formData);
        if (result) {
            await handleLocales();
            handleClose();
        }
    };

    const handleSaveEdit = async () => {
        const formData = buildFormatAgreagrComidas(imageFile, valueInput, productMode, acepto, precioGlobalOpciones)

        const result = await handleUpdate(formData);
        if (result) {
            await handleLocales();
            handleClose();
        }
    };

    const handleOpcionChange = (vIndex, oIndex, campo, valor) => {
        const nuevasVariantes = valueInput.variantes.map((v, i) => {
            if (i !== vIndex) return v;
            return {
                ...v,
                opciones: v.opciones.map((op, j) =>
                    j === oIndex ? { ...op, [campo]: valor } : op
                )
            };
        });
        setValueInput({ ...valueInput, variantes: nuevasVariantes });
    };

    const getHelperText = () => {
        switch (productMode) {
            case 'unit': return "Ideal para empanadas sueltas, porciones etc. El precio se calcula por cada unidad elegida.";
            case 'selection': return "Ideal para combos (Ej: 1 Pizza + Bebida). Puedes agregar múltiples grupos de elección.";
            case 'sizes': return "Configura diferentes tamaños (Ej: Individual, Familiar) con sus respectivos precios.";
            case 'addons': return "Un producto base (Ej: Hamburguesa) al que se le pueden sumar extras con cargo.";
            default: return "Producto simple con un precio único.";
        }
    };
    return {
        productMode,
        setProductMode,
        precioGlobalOpciones,
        setPrecioGlobalOpciones,
        agregarNuevaVariante,
        handleSaveComidas,
        handleSaveEdit,
        handleOpcionChange,
        getHelperText
    }
}
