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

  const [productMode, setProductMode] = useState('simple');
  const [precioGlobalOpciones, setPrecioGlobalOpciones] = useState(0);

  useEffect(() => {
    if (valueInput.tamanio === 1) {
      setProductMode('sizes');
    } else if (valueInput.variantes?.length > 0) {
      if (valueInput.price == 0) setProductMode('selection');
      else setProductMode('addons');
    } else {
      setProductMode('simple');
    }
  }, []);

  const handleSaveEdit = async () => {
    const formData = new FormData();
    if (imageFile) formData.append('image', imageFile);

    const finalData = { ...valueInput };

    if (productMode === 'simple') {
      finalData.tamanio = 0;
      finalData.variantes = [];
    } else if (productMode === 'sizes') {
      finalData.price = 0;
      finalData.tamanio = 1;
      // Forzamos límite 0 para tamaños
      finalData.variantes = finalData.variantes.map(v => ({ ...v, limite: 0 }));
    } else if (productMode === 'addons') {
      finalData.tamanio = 0;
      // Forzamos límite 0 para agregados
      finalData.variantes = finalData.variantes.map(v => ({ ...v, limite: 0 }));
    } else if (productMode === 'selection') {
      finalData.price = 0;
      finalData.tamanio = 0;
      finalData.variantes = finalData.variantes.map(v => ({
        ...v,
        opciones: v.opciones.map(op => ({ ...op, precio_adicional: precioGlobalOpciones }))
      }));
    }

    formData.append('id', finalData.id);
    formData.append('name', finalData.name);
    formData.append('description', finalData.description);
    formData.append('price', finalData.price);
    formData.append('categoria', finalData.categoria);
    formData.append('tamanio', finalData.tamanio);
    formData.append('variantes', JSON.stringify(finalData.variantes));

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
    // Por defecto el límite es 0, excepto si el negocio requiere lo contrario.
    // Para 'selection' (promo) se actualizará manualmente en el input.
    setValueInput({
      variantes: [{ nombre: nombreDefecto, limite: 0, opciones: [{ nombre: "", precio_adicional: 0 }] }]
    });
  };

  return (
    <form className='form' onSubmit={(e) => e.preventDefault()}>
      <div className="product-mode-selector">
        <label>¿Qué tipo de producto es?</label>
        <div className="mode-options">
          {['simple', 'sizes', 'selection', 'addons'].map((mode) => (
            <button
              key={mode}
              type="button"
              className={productMode === mode ? 'active' : ''}
              onClick={() => {
                setProductMode(mode);
                if (mode === 'simple') setValueInput({ variantes: [], tamanio: 0 });
                else if (mode === 'sizes') agregarVarianteInicial("Tamaño");
                else if (mode === 'selection') agregarVarianteInicial("Sabores");
                else if (mode === 'addons') agregarVarianteInicial("Extras");
              }}
            >
              {mode === 'simple' && 'Simple / Promo'}
              {mode === 'sizes' && 'Por Tamaños'}
              {mode === 'selection' && 'Empanadas / Sabores'}
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

      {(productMode === 'simple' || productMode === 'addons') && (
        <div className='form__item'>
          <label>{productMode === 'addons' ? 'Precio Base' : 'Precio Final'}</label>
          <input type="number" name="price" value={valueInput.price} onChange={handleChange} />
        </div>
      )}

      {productMode === 'selection' && (
        <div className='form__item'>
          <label>Precio por Unidad (se aplicará a todos los sabores)</label>
          <input type="number" value={precioGlobalOpciones} onChange={(e) => setPrecioGlobalOpciones(Number(e.target.value))} />
        </div>
      )}

      {productMode !== 'simple' && valueInput.variantes.map((variante, i) => (
        <div className='form__item variantes-container' key={i}>
          <div className="variante-header">
            <div className="input-group">
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

            {/* SOLO MOSTRAR LÍMITE EN MODO SELECCIÓN (PROMOS) */}
            {productMode === 'selection' && (
              <div className="input-group-limit">
                <label>Cantidad incluida</label>
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
          </div>



          {variante.opciones.map((op, j) => (
            <div key={j} className='opcion-container'>
              <div>
                <label>Opciones:</label>
                <input
                  type="text"
                  placeholder="Nombre"
                  value={op.nombre}
                  onChange={(e) => handleOpcionChange(i, j, 'nombre', e.target.value)}
                />
              </div>
              {productMode !== 'selection' && (
                <div>
                  <label htmlFor={`precioopcion-${i}-${j}`}>Precio</label>
                  <input
                    type="number"
                    id={`precioopcion-${i}-${j}`}
                    placeholder="Precio"
                    value={op.precio_adicional}
                    onChange={(e) => handleOpcionChange(i, j, 'precio_adicional', Number(e.target.value))}
                  />
                </div>
              )}
              {/* Botón opcional para eliminar opción individual */}
              <button type="button" className="btn-remove" onClick={() => {
                const nuevas = valueInput.variantes.map((v, vIdx) => {
                  if (vIdx !== i) return v;
                  return { ...v, opciones: v.opciones.filter((_, oIdx) => oIdx !== j) };
                });
                setValueInput({ variantes: nuevas });
              }}>✕</button>
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

      <div className="form-actions">
        <button type='button' className="btn-cancel" onClick={handleClose}>Cancelar</button>
        <button type='button' className="btn-submit" onClick={handleSaveEdit}>Guardar Producto</button>
      </div>
    </form>
  );
};
