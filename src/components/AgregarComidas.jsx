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
  const [acepto, setAcepto] = useState(false);
  const [aceptoTamanio, setAceptoTamanio] = useState(false);
  const variantesBackup = useRef([]);
  const handleSaveEdit = async () => {
    const formData = new FormData();
    if (imageFile) {
      formData.append('image', imageFile);
    }
    formData.append('id', valueInput.id);
    formData.append('name', valueInput.name);
    formData.append('description', valueInput.description);
    formData.append('price', valueInput.price);
    formData.append('categoria', valueInput.categoria);
    formData.append('tamanio', valueInput.tamanio);
    formData.append('variantes', JSON.stringify(valueInput.variantes));
    const result = await handleCargarComidas(formData);
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

      const nuevasVariantes = variantesBackup.current.length > 0
        ? variantesBackup.current
        : (valueInput.variantes && valueInput.variantes.length > 0)
          ? valueInput.variantes
          : [{ nombre: "", limite: 0, opciones: [{ nombre: "", precio_adicional: 0 }] }]
      setValueInput({ variantes: nuevasVariantes });
    } else {
      variantesBackup.current = valueInput.variantes;
      setValueInput({ variantes: [] })
    }
  }

  const handleChangeTamanio = (checked) => {
    setAceptoTamanio(checked)
    setValueInput(
      {
        tamanio: checked ? 1 : 0
      }
    )
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
        <label htmlFor="image" className="agregararchivo">{imageFile ? imageFile.name : "cargar imagen"}</label>
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
      <div className='form__item '>
        <div className='checkbox-tamanio'>
          <label htmlFor="tamanio">¿Tiene tamaño?</label>
          <input
            type='checkbox'
            name="tamanio"
            id="tamanio"
            checked={aceptoTamanio}
            value={valueInput.tamanio}
            onChange={(e) => handleChangeTamanio(e.target.checked)}
          />
        </div>
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
            <label htmlFor="nombreVariante">Nombre de variante</label>
            <input
              type="text"
              name="nombre"
              id="nombreVariante"
              value={variante.nombre}
              onChange={(e) => {
                const nuevas = [...valueInput.variantes];
                nuevas[i].nombre = e.target.value;
                setValueInput({ variantes: nuevas });
              }}
            />
            <label htmlFor="cantidadVariante">Cantidad de variantes</label>
            <input
              type="number"
              name="nombrevariante"
              id="cantidadVariante"
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
                    onChange={(e) => handleOpcionChange(i, j, 'precio_adicional', Number(e.target.value))}
                  />
                </div>
              </div>
            ))}

            <button type='button' onClick={() => {

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

export const AgregarComidas = ({ handleClose, handleLocales }) => {
  const valueInput = useFormStore((state) => state.valueInput);
  const setValueInput = useFormStore((state) => state.setValueInput);
  const handleChange = useFormStore((state) => state.handleChange);
  const imageFile = useFormStore((state) => state.imageFile);
  const handleCargarComidas = useDataStore((state) => state.handleCargarComidas);

  // 'unit' será para gustos sueltos (precio final 0)
  // 'selection' será para Promos (precio final fijo, ej: $15000)
  const [productMode, setProductMode] = useState('simple');
  const [precioGlobalOpciones, setPrecioGlobalOpciones] = useState(0);

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

      {/* Precio visible para Simple, Addons y Promos */}
      {(productMode === 'simple' || productMode === 'addons' || productMode === 'selection') && (
        <div className='form__item'>
          <label>{productMode === 'selection' ? 'Precio de la Promo' : 'Precio Final'}</label>
          <input type="number" name="price" value={valueInput.price} onChange={handleChange} />
        </div>
      )}

      {/* Precio global solo para Venta por Unidad */}
      {productMode === 'unit' && (
        <div className='form__item'>
          <label>Precio por Unidad (se aplica a cada gusto)</label>
          <input type="number" value={precioGlobalOpciones} onChange={(e) => setPrecioGlobalOpciones(Number(e.target.value))} />
        </div>
      )}

      {productMode !== 'simple' && valueInput.variantes.map((variante, i) => (
        <div className='form__item variantes' key={i}>
          <div className='nombre-grupo'>
            <label>Nombre del Grupo</label>
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

          {/* Solo en Promo mostramos el límite (ej: incluye 6 empanadas) */}
          {productMode === 'selection' && (
            <div className='form__item'>
              <label>Cantidad incluida en la promo</label>
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
};
