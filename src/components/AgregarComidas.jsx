import { useEffect, useRef, useState } from 'react'
import '../styles/AgregarComidas.css'
import { useFormStore } from '../store/useFormStore';
import { useDataStore } from '../store/useDataStore';

/*export const AgregarComidas = ({ handleClose, handleLocales }) => {
  const valueInput = useFormStore((state) => state.valueInput);
  const setValueInput = useFormStore((state) => state.setValueInput);
  const handleChange = useFormStore((state) => state.handleChange);
  const imageFile = useFormStore((state) => state.imageFile);
  const handleCargarComidas = useDataStore((state) => state.handleCargarComidas);

  // 'unit' será para gustos sueltos (precio final 0)
  // 'selection' será para Promos (precio final fijo, ej: $15000)
  const [productMode, setProductMode] = useState('simple');
  const [precioGlobalOpciones, setPrecioGlobalOpciones] = useState(0);
  const [acepto, setAcepto] = useState(false);

  useEffect(() => {
    if (valueInput.tamanio === 1) {
      setProductMode('sizes');
    } else if (valueInput.variantes?.length > 0) {
      if (valueInput.price == 0) setProductMode('unit'); // Es venta por unidad
      else setProductMode('selection'); // Es una promo con precio fijo
    } else {
      setProductMode('simple');
    }
  }, []);

  const handleSaveEdit = async () => {
    setAcepto(false);
    const formData = new FormData();
    if (imageFile) formData.append('image', imageFile);

    // Creamos copias locales para no mutar el estado global directamente
    let variantesFinales = [...valueInput.variantes];
    let precioFinal = valueInput.price;
    let tamanioFinal = valueInput.tamanio;

    if (productMode === 'simple') {
      tamanioFinal = 0;
      variantesFinales = [];
    } else if (productMode === 'unit') {
      precioFinal = 0; // Obligamos a 0 porque se cobra por unidad
      tamanioFinal = 0;
      variantesFinales = valueInput.variantes.map(v => ({
        ...v,
        limite: 0,
        opciones: v.opciones.map(op => ({ ...op, precio_adicional: precioGlobalOpciones }))
      }));
    } else if (productMode === 'selection') {
      tamanioFinal = 0;
      // En Promo, las opciones NO suman precio (precio_adicional: 0)
      variantesFinales = valueInput.variantes.map(v => ({
        ...v,
        opciones: v.opciones.map(op => ({ ...op, precio_adicional: 0 }))
      }));
    } else if (productMode === 'sizes') {
      precioFinal = 0;
      tamanioFinal = 1;
      variantesFinales = valueInput.variantes.map(v => ({ ...v, limite: 0 }));
    } else if (productMode === 'addons') {
      tamanioFinal = 0;
      variantesFinales = valueInput.variantes.map(v => ({ ...v, limite: 0 }));
    }

    formData.append('id', valueInput.id);
    formData.append('name', valueInput.name);
    formData.append('description', valueInput.description);
    formData.append('price', precioFinal);
    formData.append('categoria', valueInput.categoria);
    formData.append('tamanio', tamanioFinal);
    formData.append('variantes', JSON.stringify(variantesFinales));

    const result = await handleCargarComidas(formData);
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
    setValueInput({ variantes: nuevasVariantes });
  };

  const agregarVarianteInicial = (nombreDefecto = "Opciones") => {
    setValueInput({
      variantes: [{ nombre: nombreDefecto, limite: 0, opciones: [{ nombre: "", precio_adicional: 0 }] }]
    });
  };

  // Función auxiliar para obtener textos de ayuda dinámicos
  const getHelperText = () => {
    switch (productMode) {
      case 'unit': return "Ideal para empanadas sueltas, porciones etc. El precio se calcula por cada unidad elegida.";
      case 'selection': return "Ideal para combos de comida con acompañamiento (Ej: 1 Pizza + 6 empanadas). Con límite de acompañamiento.";
      case 'sizes': return "Configura diferentes tamaños (Ej: Individual, Familiar) con sus respectivos precios.";
      case 'addons': return "Un producto base (Ej: Hamburguesa) al que se le pueden sumar extras con cargo.";
      default: return "Producto simple con un precio único.";
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
                if (mode === 'simple') setValueInput({ variantes: [], tamanio: 0 });
                else if (mode === 'unit') agregarVarianteInicial("Sabores/Gustos");
                else if (mode === 'selection') agregarVarianteInicial("Elegí tus sabores");
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
        <input type="text" name="name" value={valueInput.name} onChange={handleChange} placeholder="Ej: Pizza Muzarella" />
      </div>

      <div className='form__item'>
        <label>Descripción</label>
        <input type="text" name="description" value={valueInput.description} onChange={handleChange} />
      </div>

      <div className='form__item'>
        <label htmlFor="image">Imagen</label>
        <label htmlFor="image" className="agregararchivo">{imageFile ? imageFile.name : "cargar imagen"}</label>
        <input type="file" name="image" id="image" className="file" onChange={handleChange} />
      </div>

      <div className='form__item'>
        <label htmlFor="categoria">Categoria</label>
        <input type="text" name="categoria" id="categoria" value={valueInput.categoria} onChange={handleChange} />
      </div>

     //  Precio visible para Simple, Addons y Promos 
      {(productMode === 'simple' || productMode === 'addons' || productMode === 'selection') && (
        <div className='form__item'>
          <label>{productMode === 'selection' ? 'Precio de la Promo' : 'Precio Final'}</label>
          <input type="number" name="price" value={valueInput.price} onChange={handleChange} />
        </div>
      )}

      //Precio global solo para Venta por Unidad 
      {productMode === 'unit' && (
        <div className='form__item'>
          <label>Precio por Unidad (se aplica a cada gusto)</label>
          <input type="number" value={precioGlobalOpciones} onChange={(e) => setPrecioGlobalOpciones(Number(e.target.value))} />
        </div>
      )}
      {
        productMode == 'selection' &&
        <div>
          <label htmlFor="acompañiamiento">¿Tiene acompañamiento?</label>
          <input type="checkbox" name="acompañamiento" id="acompañiamiento" checked={acepto} onChange={(e) => setAcepto(e.target.checked)} />
        </div>

      }
      {
        productMode == 'selection' && acepto && (
          <div className='form__item variantes' key={i}>
              <div className='nombre-grupo'>
                <label>Nombre de acompañamiento</label>
                <input
                  type="text"
                  placeholder="Ej: Elegí tus sabores"
                  value={variante.nombre}
                  onChange={(e) => {
                    const nuevas = valueInput.variantes.map((v, index) =>
                      index === i ? { ...v, nombre: e.target.value } : v
                    );
                    setValueInput({ variantes: nuevas });
                  }}
                />
              </div>

             // {/* Solo en Promo mostramos el límite (ej: incluye 6 empanadas) 
              {productMode === 'selection' && (
                <div className='form__item'>
                  <label>¿Cuántas unidades puede elegir el cliente?</label>
                  <input
                    type="number"
                    min="1"
                    value={variante.limite}
                    onChange={(e) => {
                      const nuevas = valueInput.variantes.map((v, index) =>
                        index === i ? { ...v, limite: Number(e.target.value) } : v
                      );
                      setValueInput({ variantes: nuevas });
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
                      {(productMode == 'selection' || productMode == 'unit') &&
                        (<button type="button" className="btn-remove" onClick={() => {
                          const nuevas = valueInput.variantes.map((v, vIdx) => {
                            if (vIdx !== i) return v;
                            return { ...v, opciones: v.opciones.filter((_, oIdx) => oIdx !== j) };
                          });
                          setValueInput({ variantes: nuevas });
                        }}>✕</button>)
                      }
                    </div>
                  </div>
                </div>
              ))}

              <button type='button' className="btn-add-opcion" onClick={() => {
                const nuevas = valueInput.variantes.map((v, index) => {
                  if (index === i) {
                    return { ...v, opciones: [...v.opciones, { nombre: "", precio_adicional: 0 }] };
                  }
                  return v;
                });
                setValueInput({ variantes: nuevas });
              }}>
                + Añadir Opción
              </button>
            </div>
        )
       
       }
          {productMode !== 'simple' && productMode !== 'selection' && valueInput.variantes.map((variante, i) => (
            <div className='form__item variantes' key={i}>
              <div className='nombre-grupo'>
                <label>Nombre de acompañamiento</label>
                <input
                  type="text"
                  placeholder="Ej: Elegí tus sabores"
                  value={variante.nombre}
                  onChange={(e) => {
                    const nuevas = valueInput.variantes.map((v, index) =>
                      index === i ? { ...v, nombre: e.target.value } : v
                    );
                    setValueInput({ variantes: nuevas });
                  }}
                />
              </div>

             // {/* Solo en Promo mostramos el límite (ej: incluye 6 empanadas) 
              {productMode === 'selection' && (
                <div className='form__item'>
                  <label>¿Cuántas unidades puede elegir el cliente?</label>
                  <input
                    type="number"
                    min="1"
                    value={variante.limite}
                    onChange={(e) => {
                      const nuevas = valueInput.variantes.map((v, index) =>
                        index === i ? { ...v, limite: Number(e.target.value) } : v
                      );
                      setValueInput({ variantes: nuevas });
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
                      {(productMode == 'selection' || productMode == 'unit') &&
                        (<button type="button" className="btn-remove" onClick={() => {
                          const nuevas = valueInput.variantes.map((v, vIdx) => {
                            if (vIdx !== i) return v;
                            return { ...v, opciones: v.opciones.filter((_, oIdx) => oIdx !== j) };
                          });
                          setValueInput({ variantes: nuevas });
                        }}>✕</button>)
                      }
                    </div>
                  </div>

               //   {/* El precio individual se oculta en Promo (porque es fijo) y en Unit (porque es global) 
                  {(productMode !== 'selection' && productMode !== 'unit') && (
                    <div className='precio-opcion'>
                      <label htmlFor={`precioopcion-${i}-${j}`}>Precio</label>
                      <div className='container-input-precioAdicional'>
                        <input
                          type="number"
                          id={`precioopcion-${i}-${j}`}
                          value={op.precio_adicional}
                          onChange={(e) => handleOpcionChange(i, j, 'precio_adicional', Number(e.target.value))}
                        />
                        <button type="button" className="btn-remove" onClick={() => {
                          const nuevas = valueInput.variantes.map((v, vIdx) => {
                            if (vIdx !== i) return v;
                            return { ...v, opciones: v.opciones.filter((_, oIdx) => oIdx !== j) };
                          });
                          setValueInput({ variantes: nuevas });
                        }}>✕</button>
                      </div>
                    </div>
                  )}


                </div>
              ))}

              <button type='button' className="btn-add-opcion" onClick={() => {
                const nuevas = valueInput.variantes.map((v, index) => {
                  if (index === i) {
                    return { ...v, opciones: [...v.opciones, { nombre: "", precio_adicional: 0 }] };
                  }
                  return v;
                });
                setValueInput({ variantes: nuevas });
              }}>
                + Añadir Opción
              </button>
            </div>
          ))}

          <button type='button' className="btn-cancel" onClick={handleClose}>Cancelar</button>
          <button type='button' className="btn-submit" onClick={handleSaveEdit}>Guardar Producto</button>
        </form>
  );
};*/

export const AgregarComidas = ({ handleClose, handleLocales }) => {
  const valueInput = useFormStore((state) => state.valueInput);
  const setValueInput = useFormStore((state) => state.setValueInput);
  const handleChange = useFormStore((state) => state.handleChange);
  const imageFile = useFormStore((state) => state.imageFile);
  const handleCargarComidas = useDataStore((state) => state.handleCargarComidas);

  const [productMode, setProductMode] = useState('simple');
  const [precioGlobalOpciones, setPrecioGlobalOpciones] = useState(0);
  const [acepto, setAcepto] = useState(false);

  useEffect(() => {
    if (valueInput.tamanio === 1) {
      setProductMode('sizes');
    } else if (valueInput.variantes?.length > 0) {
      if (valueInput.price == 0) setProductMode('unit');
      else {
        setProductMode('selection');
        setAcepto(true);
      }
    } else {
      setProductMode('simple');
    }
  }, []);

  const agregarVarianteInicial = (nombreDefecto = "Opciones") => {
    setValueInput({
      variantes: [{ nombre: nombreDefecto, limite: 0, opciones: [{ nombre: "", precio_adicional: 0 }] }]
    });
  };

  const handleSaveEdit = async () => {
    const formData = new FormData();
    if (imageFile) formData.append('image', imageFile);

    let variantesFinales = [...valueInput.variantes];
    let precioFinal = valueInput.price;
    let tamanioFinal = 0;

    // Lógica de limpieza según el modo antes de enviar
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

    const result = await handleCargarComidas(formData);
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
    setValueInput({ variantes: nuevasVariantes });
  };

  // Función auxiliar para obtener textos de ayuda dinámicos
  const getHelperText = () => {
    switch (productMode) {
      case 'unit': return "Ideal para empanadas sueltas, porciones etc. El precio se calcula por cada unidad elegida.";
      case 'selection': return "Ideal para combos de comida con acompañamiento (Ej: 1 Pizza + 6 empanadas). Con límite de acompañamiento.";
      case 'sizes': return "Configura diferentes tamaños (Ej: Individual, Familiar) con sus respectivos precios.";
      case 'addons': return "Un producto base (Ej: Hamburguesa) al que se le pueden sumar extras con cargo.";
      default: return "Producto simple con un precio único.";
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
                if (mode === 'simple' || mode === 'selection') {
                  setValueInput({ variantes: [], tamanio: 0 });
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
        <label htmlFor="image" className="agregararchivo">{imageFile ? imageFile.name : "cargar imagen"}</label>
        <input type="file" name="image" id="image" className="file" onChange={handleChange} />
      </div>

      <div className='form__item'>
        <label htmlFor="categoria">Categoria</label>
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
          <input type="number" value={precioGlobalOpciones} onChange={(e) => setPrecioGlobalOpciones(Number(e.target.value))} />
        </div>
      )}

      {/* Lógica del Checkbox para Promos */}
      {productMode === 'selection' && (
        <div className='form__item checkbox-container'>
          <label>
            <input
              type="checkbox"
              checked={acepto}
              onChange={(e) => {
                setAcepto(e.target.checked);
                if (e.target.checked) agregarVarianteInicial("Elegí tus sabores");
                else setValueInput({ variantes: [] });
              }}
            />
            ¿Tiene acompañamiento o elección de sabores?
          </label>
        </div>
      )}

      {/* Renderizado UNIFICADO de variantes */}
      {productMode !== 'simple' && valueInput.variantes.map((variante, i) => (
        <div className='form__item variantes' key={i}>
          <div className='nombre-grupo'>
            <label>Nombre del grupo (Ej: Sabores, tamaños, gustos)</label>
            <input
              type="text"
              value={variante.nombre}
              onChange={(e) => {
                const nuevas = valueInput.variantes.map((v, idx) => idx === i ? { ...v, nombre: e.target.value } : v);
                setValueInput({ variantes: nuevas });
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
                  setValueInput({ variantes: nuevas });
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
                  {(productMode == 'selection' || productMode == 'unit') &&
                    (<button type="button" className="btn-remove" onClick={() => {
                      const nuevas = valueInput.variantes.map((v, vIdx) => {
                        if (vIdx !== i) return v;
                        return { ...v, opciones: v.opciones.filter((_, oIdx) => oIdx !== j) };
                      });
                      setValueInput({ variantes: nuevas });
                    }}>✕</button>)
                  }
                </div>
              </div>

              {/* El precio individual se oculta en Promo (porque es fijo) y en Unit (porque es global) */}
              {(productMode !== 'selection' && productMode !== 'unit') && (
                <div className='precio-opcion'>
                  <label htmlFor={`precioopcion-${i}-${j}`}>Precio</label>
                  <div className='container-input-precioAdicional'>
                    <input
                      type="number"
                      id={`precioopcion-${i}-${j}`}
                      value={op.precio_adicional}
                      onChange={(e) => handleOpcionChange(i, j, 'precio_adicional', Number(e.target.value))}
                    />
                    <button type="button" className="btn-remove" onClick={() => {
                      const nuevas = valueInput.variantes.map((v, vIdx) => {
                        if (vIdx !== i) return v;
                        return { ...v, opciones: v.opciones.filter((_, oIdx) => oIdx !== j) };
                      });
                      setValueInput({ variantes: nuevas });
                    }}>✕</button>
                  </div>
                </div>
              )}


            </div>
          ))}

          <button type='button' className="btn-add-opcion" onClick={() => {
            const nuevas = valueInput.variantes.map((v, idx) =>
              idx === i ? { ...v, opciones: [...v.opciones, { nombre: "", precio_adicional: 0 }] } : v
            );
            setValueInput({ variantes: nuevas });
          }}>
            + Añadir Opción
          </button>
        </div>
      ))}

      <div className="form__buttons">
        <button type='button' className="btn-cancel" onClick={handleClose}>Cancelar</button>
        <button type='button' className="btn-submit" onClick={handleSaveEdit}>Guardar Producto</button>
      </div>
    </form>
  );
};