import { useState, useEffect } from 'react';
import '../styles/Form.css';
import { useFormStore } from '../store/useFormStore';
import { useDataStore } from '../store/useDataStore';

export const Form = ({ handleClose, handleLocales }) => {
    const valueInput = useFormStore((state) => state.valueInput);
    const setValueInput = useFormStore((state) => state.setValueInput);
    const handleChange = useFormStore((state) => state.handleChange);
    const imageFile = useFormStore((state) => state.imageFile);
    const handleUpdate = useDataStore((state) => state.handleUpdate);

    const [productMode, setProductMode] = useState('simple');
    const [precioGlobalOpciones, setPrecioGlobalOpciones] = useState(0);
    const [acepto, setAcepto] = useState(false);

    useEffect(() => {
        if (valueInput.productMode) {
            const modoGuardado = valueInput.productMode;
            setProductMode(modoGuardado);

            if (modoGuardado === 'selection') {
                setAcepto(true);
            }

            if (modoGuardado === 'unit' && valueInput.variantes?.[0]?.opciones?.[0]) {
                setPrecioGlobalOpciones(valueInput.variantes[0].opciones[0].precio_adicional);
            }
        } else {
            setProductMode('simple');
        }
    }, [valueInput.productMode]);

    // Función unificada para agregar variantes sin romper el estado previo
    const agregarVariante = (nombreDefecto = "Opciones", reset = false) => {
        const nuevaVariante = { 
            nombre: nombreDefecto, 
            limite: 0, 
            opciones: [{ nombre: "", precio_adicional: 0 }] 
        };

        if (reset) {
            setValueInput({ ...valueInput, variantes: [nuevaVariante] });
        } else {
            setValueInput({ 
                ...valueInput, 
                variantes: [...(valueInput.variantes || []), nuevaVariante] 
            });
        }
    };

    const handleSaveEdit = async () => {
        const formData = new FormData();
        if (imageFile) formData.append('image', imageFile);

        let variantesFinales = [...(valueInput.variantes || [])];
        let precioFinal = valueInput.price;
        let tamanioFinal = 0;

        if (productMode === 'simple' || (productMode === 'selection' && !acepto)) {
            variantesFinales = [];
        } else if (productMode === 'unit') {
            precioFinal = 0;
            variantesFinales = valueInput.variantes.map(v => ({
                ...v,
                limite: 0,
                opciones: v.opciones.map(op => ({ ...op, precio_adicional: precioGlobalOpciones }))
            }));
        } else if (productMode === 'selection' && acepto) {
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
        formData.append('variantes', JSON.stringify(variantesFinales));
        formData.append('productMode', productMode);

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
            case 'unit': return "Ideal para empanadas sueltas o porciones. El precio se calcula por unidad.";
            case 'selection': return "Ideal para combos (Ej: 1 Pizza + 6 empanadas).";
            case 'sizes': return "Configura diferentes tamaños (Ej: Individual, Familiar).";
            case 'addons': return "Producto base con extras opcionales.";
            default: return "Producto simple con precio único.";
        }
    };

    return (
        <form className='form' onSubmit={(e) => e.preventDefault()}>
            <div className="product-mode-selector">
                <label>¿Qué tipo de producto es?</label>
                <div className="mode-options">
                    {['simple', 'unit', 'selection', 'sizes', 'addons'].map((mode) => (
                        <button
                            key={mode}
                            type="button"
                            className={productMode === mode ? 'active' : ''}
                            onClick={() => {
                                setProductMode(mode);
                                setAcepto(false);
                                if (mode === 'simple') {
                                    setValueInput({ ...valueInput, variantes: [], tamanio: 0 });
                                } else if (mode === 'unit') agregarVariante("Sabores/Gustos", true);
                                else if (mode === 'sizes') agregarVariante("Tamaño", true);
                                else if (mode === 'addons') agregarVariante("Agregados", true);
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

            <div className='form__item'>
                <label>Nombre del producto</label>
                <input type="text" name="name" value={valueInput.name} onChange={handleChange} />
            </div>

            <div className='form__item'>
                <label>Descripción</label>
                <input type="text" name="description" value={valueInput.description} onChange={handleChange} />
            </div>

            <div className='form__item'>
                <label htmlFor="image">Imagen</label>
                <label htmlFor="image" className="agregararchivo">
                    {imageFile ? imageFile.name : (valueInput.image || "cargar imagen")}
                </label>
                <input type="file" name="image" id="image" className="file" onChange={handleChange} />
            </div>

            <div className='form__item'>
                <label htmlFor="categoria">Categoría</label>
                <input type="text" name="categoria" id="categoria" value={valueInput.categoria} onChange={handleChange} />
            </div>

            {(productMode === 'simple' || productMode === 'addons' || productMode === 'selection') && (
                <div className='form__item'>
                    <label>{productMode === 'selection' ? 'Precio de la Promo' : 'Precio Final'}</label>
                    <input type="number" name="price" value={valueInput.price} onChange={handleChange} />
                </div>
            )}

            {productMode === 'unit' && (
                <div className='form__item'>
                    <label>Precio por Unidad</label>
                    <input
                        type="number"
                        value={precioGlobalOpciones}
                        onChange={(e) => setPrecioGlobalOpciones(Number(e.target.value))}
                    />
                </div>
            )}

            {productMode === 'selection' && (
                <div className='form__item checkbox-container'>
                    <label>
                        <input
                            type="checkbox"
                            checked={acepto}
                            onChange={(e) => {
                                setAcepto(e.target.checked);
                                if (e.target.checked) agregarVariante("Elegí tus sabores", true);
                                else setValueInput({ ...valueInput, variantes: [] });
                            }}
                        />
                        ¿Tiene acompañamiento o elección de sabores?
                    </label>
                </div>
            )}

            {productMode !== 'simple' && valueInput.variantes?.map((variante, i) => (
                <div className='form__item variantes' key={i}>
                    <div className='nombre-grupo'>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <label>Nombre del grupo</label>
                            {valueInput.variantes.length > 1 && (
                                <button type="button" className="btn-remove" onClick={() => {
                                    const nuevas = valueInput.variantes.filter((_, idx) => idx !== i);
                                    setValueInput({ ...valueInput, variantes: nuevas });
                                }}>Eliminar Grupo</button>
                            )}
                        </div>
                        <input
                            type="text"
                            value={variante.nombre}
                            onChange={(e) => {
                                const nuevas = valueInput.variantes.map((v, idx) => idx === i ? { ...v, nombre: e.target.value } : v);
                                setValueInput({ ...valueInput, variantes: nuevas });
                            }}
                        />
                    </div>

                    {productMode === 'selection' && (
                        <div className='form__item'>
                            <label>Límite de unidades a elegir</label>
                            <input
                                type="number"
                                min="1"
                                value={variante.limite}
                                onChange={(e) => {
                                    const nuevas = valueInput.variantes.map((v, idx) => idx === i ? { ...v, limite: Number(e.target.value) } : v);
                                    setValueInput({ ...valueInput, variantes: nuevas });
                                }}
                            />
                        </div>
                    )}

                    {variante.opciones.map((op, j) => (
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
                                    <button type="button" className="btn-remove" onClick={() => {
                                        const nuevas = valueInput.variantes.map((v, vIdx) => {
                                            if (vIdx !== i) return v;
                                            return { ...v, opciones: v.opciones.filter((_, oIdx) => oIdx !== j) };
                                        });
                                        setValueInput({ ...valueInput, variantes: nuevas });
                                    }}>✕</button>
                                </div>
                            </div>

                            {(productMode !== 'selection' && productMode !== 'unit') && (
                                <div className='precio-opcion'>
                                    <label>Precio Adicional</label>
                                    <input
                                        type="number"
                                        value={op.precio_adicional}
                                        onChange={(e) => handleOpcionChange(i, j, 'precio_adicional', Number(e.target.value))}
                                    />
                                </div>
                            )}
                        </div>
                    ))}

                    <button type='button' className="btn-add-opcion" onClick={() => {
                        const nuevas = valueInput.variantes.map((v, idx) =>
                            idx === i ? { ...v, opciones: [...v.opciones, { nombre: "", precio_adicional: 0 }] } : v
                        );
                        setValueInput({ ...valueInput, variantes: nuevas });
                    }}>
                        + Añadir Opción
                    </button>
                </div>
            ))}

            {/* BOTÓN PARA AGREGAR NUEVOS GRUPOS EN MODO PROMO */}
            {productMode === 'selection' && acepto && (
                <button 
                    type="button" 
                    className="btn-add-opcion" 
                    style={{marginBottom: '20px', width: '100%', background: '#f0f0f0', color: '#333', border: '1px solid #ccc'}}
                    onClick={() => agregarVariante("Nuevo Grupo (ej. Bebidas)")}
                >
                    + Añadir otro Grupo de Selección (Bebida, Postre, etc.)
                </button>
            )}

            <div className="form__buttons">
                <button type='button' className="btn-cancel" onClick={handleClose}>Cancelar</button>
                <button type='button' className="btn-submit" onClick={handleSaveEdit}>Actualizar Producto</button>
            </div>
        </form>
    );
};