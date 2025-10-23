import React, { useContext, useRef, useState } from 'react'
import { use } from 'react';
import '../styles/Form.css'
import { useForm } from '../context/FormProvider';
import { DataContext } from '../context/DataContext';

export const Form = ({ handleClose }) => {
    const [acepto, setAcepto] = useState(false);
    const { valueInput, setValueInput, handleChange, file } = useForm();
    const { handleUpdate } = useContext(DataContext);
    const variantesBackup = useRef([]);
    console.log("valor de file en Form", file);
    console.log("valor de valueInput en Form", valueInput);

    const handleSaveEdit = async () => {
        const formData = new FormData();
        if (file) {
            formData.append('image', file);
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
                <label htmlFor="image" className="agregararchivo">{file ? file.name : valueInput.image ? valueInput.image : "cargar imagen"}</label>
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
                        <label htmlFor="nombreVariante">Nombre de variante</label>
                        <input
                            type="text"
                            name="nombre"
                            id="nombreVariante"
                            value={variante.nombre}
                            onChange={(e) => {
                                setValueInput(prev => {
                                    const nuevas = [...valueInput.variantes];
                                    nuevas[i].nombre = e.target.value;
                                    return { ...prev, variantes: nuevas }
                                })
                            }}
                        />
                        <label htmlFor="cantidadVariante">Cantidad de variantes</label>
                        <input
                            type="number"
                            name="nombrevariante"
                            id="cantidadVariante"
                            value={variante.limite}
                            onChange={(e) => {
                                setValueInput(prev => {
                                    const nuevas = [...valueInput.variantes];
                                    nuevas[i].limite = e.target.value;
                                    return { ...prev, variantes: nuevas }
                                })
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
                                        onChange={(e) => {
                                            setValueInput(prev => {
                                                const nuevas = prev.variantes.map((v, index) => {
                                                    if (index == i) {
                                                        return {
                                                            ...v,
                                                            opciones: v.opciones.map((op, jindex) => {
                                                                if (j == jindex) {
                                                                    return {
                                                                        ...op,
                                                                        nombre: e.target.value
                                                                    }
                                                                }
                                                                return op
                                                            })
                                                        }
                                                    }
                                                    return v;
                                                })
                                                return { ...prev, variantes: nuevas }
                                            })
                                        }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`precioopcion-${i}-${j}`}>Precio</label>
                                    <input
                                        type="number"
                                        name="precioopcion"
                                        id={`precioopcion-${i}-${j}`}
                                        value={op.precio_adicional}
                                        onChange={(e) => {
                                            setValueInput(prev => {
                                                const nuevas = prev.variantes.map((v, index) => {
                                                    if (index == i) {
                                                        return {
                                                            ...v,
                                                            opciones: v.opciones.map((op, jindex) => {
                                                                if (j == jindex) {
                                                                    return {
                                                                        ...op,
                                                                        precio_adicional: e.target.value
                                                                    }
                                                                }
                                                                return op
                                                            })
                                                        }
                                                    }
                                                    return v
                                                });
                                                return { ...prev, variantes: nuevas }
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                        ))}

                        <button className='button-opcion' type='button' onClick={() => {
                            setValueInput(prev => {
                                const nuevas = prev.variantes.map((v, index) => {
                                    if (index === i) {
                                        return {
                                            ...v,
                                            opciones: [...v.opciones, { nombre: "", precio_adicional: 0 }]
                                        };
                                    }
                                    return v;
                                });
                                return { ...prev, variantes: nuevas };
                            });
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
