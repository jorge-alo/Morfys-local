import { useEffect, useRef, useState } from 'react';
import '../styles/Filter.css'
import { useForm } from '../context/FormProvider';
import { useFormStore } from '../store/useFormStore';

export const Filter = () => {

    //const { comidas, setComidas, inputFilter, setInputFilter, categoria, setCategoria } = useForm();

    const comidas = useFormStore((state) => state.comidas);
    const setComidas = useFormStore((state) => state.setComidas);
    const inputFilter = useFormStore((state) => state.inputFilter);
    const setInputFilter = useFormStore((state) => state.setInputFilter);
    const categoria = useFormStore((state) => state.categoria);
    const setCategoria = useFormStore((state) => state.setCategoria);


    const comidasBackup = useRef([]);

    useEffect(() => {
        if (Array.isArray(comidas) && comidas.length > 0 && !comidasBackup.current.length) {
            comidasBackup.current = [...comidas];
        }
    }, [comidas])

    const getComidas = () => comidasBackup.current.length > 0 ? comidasBackup.current : (Array.isArray(comidas).length > 0 ? comidas : []);
    const handleOnChange = (e) => {
        const value = e.target.value
        setCategoria(value);
        if (value == 'todas') {
            const comidasactualizadas = getComidas().filter(item => (
                (item.name || "").toString().toLowerCase().includes(inputFilter.trim().toLowerCase())
            )
            )
            setComidas(comidasactualizadas);
        }
    }
    const handleOnChangeInput = (e) => {
        const value = e.target.value
        setInputFilter(value);
        if (categoria != 'todas') {
            if (value == "") {
                setComidas(getComidas());
            }
            const Comidasactualizadas = getComidas().filter(item => (
                (item.categoria || "").toString().toLowerCase().includes(value.trim().toLowerCase())
            )
            )
            setComidas(Comidasactualizadas);
            return
        }
        setComidas(getComidas());
        const Comidasactualizadas = getComidas().filter(item => (
            (item.name || "").toString().toLowerCase().includes(value.trim().toLowerCase())
        )
        )
        setComidas(Comidasactualizadas);
    }
    console.log('Valor de inputFilter en Filte', inputFilter);

    return (
        <div className="container-filter">
            <select className='selectFilter' name="selectFilter" onChange={(e) => handleOnChange(e)}>
                <option value="todas">Todas</option>
                <option value="categoria">Categorias</option>
            </select>
            <label htmlFor="filter">🔎</label>
            <input
                name="inputFilter"
                id="filter"
                placeholder='Buscar...'
                value={inputFilter}
                onChange={(e) => handleOnChangeInput(e)}
            />
        </div>
    )
}
