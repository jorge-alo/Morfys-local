
import { useCallback, useEffect, useState } from 'react';
import { useDataStore } from '../../../store/useDataStore';

export const useGetLocalesEffect = () => {
    const [locales, setLocales] = useState([]);
    const [loading, setLoading] = useState(true);
    const getLocales = useDataStore((state) => state.getLocales);

    const handleGetLocales = useCallback(async () => {

            try {
                setLoading(true);
                const result = await getLocales();
                const lista = result?.data.locales || result || [];
                setLocales(lista);
            } catch (error) {
                console.error("Error al obtener locales:", error);
            }finally{
                setLoading(false);
            }

        }, [getLocales])

    useEffect(() => {
        handleGetLocales()
    }, [handleGetLocales])

    return {
        locales,
        loading
    }
}
