import { useState } from "react";
import { useDataStore } from "../../../store/useDataStore";
import { useFormStore } from "../../../store/useFormStore";
import { buildFormData } from "../service/buildFormData";



export const useAjustesForm = () => {
    const resetForm = useFormStore((state) => state.resetForm);
    const handleSetTime = useDataStore((state) => state.handleSetTime);
    const valueInput = useFormStore((state) => state.valueInput);
    const fileLogo = useFormStore((state) => state.fileLogo);
    const fileBanner = useFormStore((state) => state.fileBanner);
    const [loading, setLoading] = useState(false);

    const handleClickSend = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = buildFormData(fileLogo, fileBanner, valueInput)
        try {
            await handleSetTime(formData);
            resetForm(); // limpia state después de enviar
        } catch (error) {
            console.error("Error enviando datos:", error);
        } finally {
            setLoading(false)
        }
    }
    return {
        handleClickSend,
        loading
    }
}
