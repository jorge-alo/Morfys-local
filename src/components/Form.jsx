import { useRef, useState } from 'react'
import '../styles/Form.css'
import { useFormStore } from '../store/useFormStore';
import { useDataStore } from '../store/useDataStore';

export const Form = ({ handleClose }) => {
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
        await handleUpdate(formData);
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
                                        onChange={(e) => handleOpcionChange(i,j, 'nombre', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`precioopcion-${i}-${j}`}>Precio</label>
                                    <input
                                        type="number"
                                        name="precioopcion"
                                        id={`precioopcion-${i}-${j}`}
                                        value={op.precio_adicional}
                                        onChange={(e) => handleOpcionChange(i,j, 'precio_adicional', e.target.value)}
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
                                setValueInput({  variantes: nuevas });
                            
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
