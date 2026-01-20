/*import { useRef, useState } from 'react'
import '../styles/Form.css'
import { useFormStore } from '../store/useFormStore';
import { useDataStore } from '../store/useDataStore';

export const Form = ({ handleClose, handleLocales }) => {
    const [acepto, setAcepto] = useState(false);
    const valueInput = useFormStore((state) => state.valueInput);
    const setValueInput = useFormStore((state) => state.setValueInput);
    const handleChange = useFormStore((state) => state.handleChange);
    const imageFile = useFormStore((state) => state.imageFile);

    const handleUpdate = useDataStore((state) => state.handleUpdate);
    const variantesBackup = useRef([]);


    const handleSaveEdit = async () => {
        console.log("Valor real de valueInput antes de enviar:", valueInput);
        const formData = new FormData();
        if (imageFile) {
            formData.append('image', imageFile);
        }
        formData.append('id', valueInput.id);
        formData.append('name', valueInput.name);
        formData.append('description', valueInput.description);
        formData.append('price', valueInput.price);
        formData.append('categoria', valueInput.categoria);
        formData.append('variantes', JSON.stringify(valueInput.variantes));
        const result = await handleUpdate(formData);
        if (result) {
            // Refrescar los datos en el store global antes de cerrar
            await handleLocales();
            handleClose();
        }
        handleClose()
    }

    const handleToggleVariantes = (checked) => {
        setAcepto(checked);
        if (checked) {
            setValueInput(prev => ({
                ...prev,
                variantes: variantesBackup.current.length > 0
                    ? variantesBackup.current
                    : (prev.variantes && prev.variantes.length > 0)
                        ? prev.variantes
                        : [{ nombre: "", limite: 0, opciones: [{ nombre: "", precio_adicional: 0 }] }]
            }))
        } else {
            variantesBackup.current = valueInput.variantes;
            setValueInput(prev => ({ ...prev, variantes: [] }))
        }
    }

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

        setValueInput({ variantes: nuevasVariantes });
    };
    return (
        <form className='form'>
            <div className='form__item'>
                <label htmlFor="name">Nombre del producto</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={valueInput.name}
                    onChange={handleChange}
                />
            </div>
            <div className='form__item'>
                <label htmlFor="description">Descripcion</label>
                <input
                    type="text"
                    name="description"
                    id="description"
                    value={valueInput.description}
                    onChange={handleChange}
                />
            </div>
            <div className='form__item'>
                <label htmlFor="image">Imagen</label>
                <label htmlFor="image" className="agregararchivo">{imageFile ? imageFile.name : valueInput.image ? valueInput.image : "cargar imagen"}</label>
                <input
                    type="file"
                    name="image"
                    id="image"
                    className="file"
                    onChange={handleChange}
                />
            </div>
            <div className='form__item'>
                <label htmlFor="categoria">Categoria</label>
                <input
                    type="text"
                    name="categoria"
                    id="categoria"
                    value={valueInput.categoria}
                    onChange={handleChange}
                />
            </div>
            <div className='form__item'>
                <label htmlFor="price" >Precio</label>
                <input
                    type="number"
                    name="price"
                    id="price"
                    value={valueInput.price}
                    onChange={handleChange}
                />
            </div>
            <div className='form__item'>
                <div className='form__item__variantes'>
                    <label htmlFor="variantes" >Variantes</label>
                    <input
                        type="checkbox"
                        checked={acepto || Array.isArray(valueInput.variantes) && valueInput.variantes.length > 0}
                        onChange={(e) => { handleToggleVariantes(e.target.checked) }}
                        name="variantes"
                        id="variantes"
                    />
                </div>
            </div>

            {
                valueInput.variantes.map((variante, i) => (
                    <div className='form__item variantes' key={i}>
                        <label htmlFor={`nombreVariante-${i}`}>Nombre de variante</label>
                        <input
                            type="text"
                            name="nombre"
                            id={`nombreVariante-${i}`}
                            value={variante.nombre}
                            onChange={(e) => {

                                const nuevas = [...valueInput.variantes];
                                nuevas[i].nombre = e.target.value;
                                setValueInput({ variantes: nuevas });

                            }}
                        />
                        <label htmlFor={`cantidadVariante-${i}`}>Cantidad de variantes</label>
                        <input
                            type="number"
                            name="nombrevariante"
                            id={`cantidadVariante-${i}`}
                            value={variante.limite}
                            onChange={(e) => {

                                const nuevas = [...valueInput.variantes];
                                nuevas[i].limite = e.target.value;
                                setValueInput({ variantes: nuevas });

                            }}
                        />

                        {variante.opciones.map((op, j) => (

                            <div key={j} className='opcion-container'>
                                <div>
                                    <label htmlFor={`nombreopcion-${i}-${j}`}>Nombre de opcion</label>
                                    <input
                                        type="text"
                                        name="nombreopcion"
                                        id={`nombreopcion-${i}-${j}`}
                                        value={op.nombre}
                                        onChange={(e) => handleOpcionChange(i, j, 'nombre', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`precioopcion-${i}-${j}`}>Precio</label>
                                    <input
                                        type="number"
                                        name="precioopcion"
                                        id={`precioopcion-${i}-${j}`}
                                        value={op.precio_adicional}
                                        onChange={(e) => handleOpcionChange(i, j, 'precio_adicional', e.target.value)}
                                    />
                                </div>
                            </div>
                        ))}

                        <button className='button-opcion' type='button' onClick={() => {

                            const nuevas = valueInput.variantes.map((v, index) => {
                                if (index === i) {
                                    return {
                                        ...v,
                                        opciones: [...v.opciones, { nombre: "", precio_adicional: 0 }]
                                    };
                                }
                                return v;
                            });
                            setValueInput({ variantes: nuevas });

                        }}>
                            +opcion
                        </button>
                    </div>
                )
                )

            }

            <button type='button' onClick={handleSaveEdit}>Enviar</button>
        </form>
    )
}*/
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

    // Lógica para detectar el modo del producto al cargar los datos del store
   useEffect(() => {
    // 1. Caso Tamaños: Basado en el flag 'tamanio'
    if (valueInput.tamanio === 1) {
        setProductMode('sizes');
    } 
    // Si tiene variantes, determinamos cuál de los 3 modos es
    else if (valueInput.variantes?.length > 0) {
        
        // 2. Caso Unidad: Precio base es 0
        if (Number(valueInput.price) === 0) {
            setProductMode('unit');
            const primerPrecio = valueInput.variantes[0].opciones[0]?.precio_adicional || 0;
            setPrecioGlobalOpciones(primerPrecio);
        } 
        else {
            // Diferenciamos entre 'Promo' (selection) y 'Addons' (agregados)
            // Revisamos si alguna opción tiene precio extra
            const tienePreciosAdicionales = valueInput.variantes.some(v => 
                v.opciones.some(op => Number(op.precio_adicional) > 0)
            );

            if (tienePreciosAdicionales) {
                // 3. Caso Addons: El producto tiene un precio base Y las opciones cuestan extra
                setProductMode('addons');
            } else {
                // 4. Caso Selection (Promo): Tiene precio base pero las opciones son "gratis" (límite de sabores)
                setProductMode('selection');
                setAcepto(true);
            }
        }
    } 
    // 5. Caso Simple: Sin variantes ni flags especiales
    else {
        setProductMode('simple');
    }
}, []);

    const agregarVarianteInicial = (nombreDefecto = "Opciones") => {
        setValueInput({
            ...valueInput,
            variantes: [{ nombre: nombreDefecto, limite: 0, opciones: [{ nombre: "", precio_adicional: 0 }] }]
        });
    };

    const handleSaveEdit = async () => {
        const formData = new FormData();
        if (imageFile) formData.append('image', imageFile);

        let variantesFinales = [...(valueInput.variantes || [])];
        let precioFinal = valueInput.price;
        let tamanioFinal = 0;

        // Lógica de limpieza según el modo
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
                                } else if (mode === 'unit') agregarVarianteInicial("Sabores/Gustos");
                                else if (mode === 'sizes') agregarVarianteInicial("Tamaño");
                                else if (mode === 'addons') agregarVarianteInicial("Agregados");
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
                                if (e.target.checked) agregarVarianteInicial("Elegí tus sabores");
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
                        <label>Nombre del grupo</label>
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

            <div className="form__buttons">
                <button type='button' className="btn-cancel" onClick={handleClose}>Cancelar</button>
                <button type='button' className="btn-submit" onClick={handleSaveEdit}>Actualizar Producto</button>
            </div>
        </form>
    );
};