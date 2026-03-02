import { useEffect, useRef, useState } from 'react';
import '../../../styles/Filter.css'

import { useFormStore } from '../../../store/useFormStore';
import { useFilter } from '../hook/useFilter';

export const Filter = () => {

    //const { comidas, setComidas, inputFilter, setInputFilter, categoria, setCategoria } = useForm();

    const comidas = useFormStore((state) => state.comidas);
    const setComidas = useFormStore((state) => state.setComidas);
    const inputFilter = useFormStore((state) => state.inputFilter);
    const setInputFilter = useFormStore((state) => state.setInputFilter);
    const categoria = useFormStore((state) => state.categoria);
    const setCategoria = useFormStore((state) => state.setCategoria);


    const { handleOnChange,
        handleOnChangeInput
    } = useFilter(comidas, setComidas, inputFilter, setInputFilter, categoria, setCategoria, useRef)

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
