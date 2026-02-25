import { useNavigate } from "react-router-dom";
import { useFormStore } from "../../../store/useFormStore";
import { useEffect, useState } from "react";
import { useDataStore } from "../../../store/useDataStore";


export const useHandleSubmitResetPassword = (valueInput, token) => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const resetForm = useFormStore((state) => state.resetForm);
    const handleResetPassword = useDataStore((state) => state.handleResetPassword);

    useEffect(() => {
        resetForm();
    }, [resetForm]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("");
        setSuccess(false);

       if (valueInput.password.trim().length < 8) {
            setError("La contraseña debe tener al menos 6 caracteres");
            return; // 🛑 Se detiene aquí
        }

        if (valueInput.password !== valueInput.passwordConfirm) {
            setError("Error al confirmar la contraseña, por favor escriba la misma contraseña")
            return
        }
        try {
            const response = await handleResetPassword(valueInput.password, token)
            // Si tu handleResetPassword en el store ya maneja los status "Error"
            console.log("Valor de response en handleSubmit", response);
            if (response?.data?.status === "OK") {
                setSuccess(true);
                resetForm();
                setTimeout(() => navigate("/"), 3000);
            }else {
                // Si el backend responde 200 pero con status "Error"
                setError(response?.data?.message || "No se pudo cambiar la contraseña");
            }

        } catch (err) {
            // Extraer mensaje real del backend
            const msg = err.response?.data?.message || "Error al cambiar la contraseña";
            setError(msg);
        }

    }
    return {
        handleSubmit,
        error,
        success
    }
}
