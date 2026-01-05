import { useRef, useState } from 'react'
import '../styles/AgregarComidas.css'
import { useFormStore } from '../store/useFormStore';
import { useDataStore } from '../store/useDataStore';

export const AgregarComidas = ({ handleClose }) => {

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
}
