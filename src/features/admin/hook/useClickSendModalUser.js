import { useEffect } from "react";
import { useDataStore } from "../../../store/useDataStore";
import { useFormStore } from "../../../store/useFormStore";

export const useClickSendModalUser = (setShowModalUser, userToEdit, valueInput) => {
    const setFormValues = useFormStore((state) => state.setFormValues);
    const sendDataNewUser = useDataStore((state) => state.sendDataNewUser);
    const updateUserData = useDataStore((state) => state.updateUserData);
    const resetForm = useFormStore((state) => state.resetForm);
    const setError = useDataStore((state) => state.setError);


    const handleClose = () => {
        resetForm()
        setShowModalUser(false)
        setError(false);
    }
    const handleOverlayCloseModal = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            handleClose()
        }
    }

    const handleEnviarUser = async (e) => {
        e.preventDefault();
        let response
        if (userToEdit) {
            // Lógica para EDITAR (deberías pasar el ID o Email único)
            await updateUserData(valueInput, userToEdit.id);
        } else {
            // Lógica para CREAR
            response = await sendDataNewUser(valueInput);
        }
        
        if (response) {
            handleClose();
        }

    };
  
        // Efecto para cargar datos si es edición
        useEffect(() => {
            if (userToEdit) {
                // Creamos una copia para no mutar el original
                const dataForForm = { ...userToEdit };

                // Si existe la fecha, la formateamos a YYYY-MM-DD
                if (dataForForm.active_until) {
                    dataForForm.active_until = dataForForm.active_until.split('T')[0];
                }

                setFormValues(dataForForm);
            } else {
                resetForm();
            }
        }, [userToEdit]);
    
    return {
        handleClose,
        handleOverlayCloseModal,
        handleEnviarUser,
        handleUseEffectModalUser
    }
}
