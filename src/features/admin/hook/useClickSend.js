import { useState } from "react";
import { buildFormat } from "../service/buildFormat";
import { useFormStore } from "../../../store/useFormStore";
import { useDataStore } from "../../../store/useDataStore";

export const useClickSend = (userId, setShowModalLocal) => {
    const sendDataNewLocal = useDataStore((state) => state.sendDataNewLocal);
    const resetForm = useFormStore((state) => state.resetForm);
    const [loading, setLoading] = useState(false)

    const handleClickSend = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { valueInput, fileLogo, fileBanner } = useFormStore.getState();
        const formData = buildFormat(fileLogo, fileBanner, userId, valueInput)
        try {
            await sendDataNewLocal(formData);
            resetForm(); // limpia state después de enviar
            setShowModalLocal(false);
        } catch (error) {
            console.error("Error enviando datos:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleClose = () => {
        resetForm()
        setShowModalLocal(false)
    }
    const handleOverlayCloseModal = (e) => {
        if (e.target.classList.contains('modalLocal-container')) {
            handleClose()
        }
    }

    return {
        handleClickSend,
        loading,
        handleClose,
        handleOverlayCloseModal
    }
}
