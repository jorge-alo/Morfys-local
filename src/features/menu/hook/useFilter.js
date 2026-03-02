import { useEffect } from "react";

export const useFilter = (
    comidas,
    setComidas,
    inputFilter,
    setInputFilter,
    categoria,
    setCategoria,
    useRef
) => {

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
    return {
        handleOnChange,
        handleOnChangeInput
    }
}
