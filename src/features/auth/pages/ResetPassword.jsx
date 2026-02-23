
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormStore } from '../../../store/useFormStore';
import { useDataStore } from '../../../store/useDataStore';
import { useAuthStore } from '../../../store/useAuthStore';

export const ResetPassword = () => {
   /* const { handleChange, valueInput, resetForm } = useForm();*/

    const handleChange = useFormStore((state) => state.handleChange);
    const valueInput = useFormStore((state) => state.valueInput);
    const resetForm = useFormStore((state) => state.resetForm);
    const handleResetPassword = useDataStore((state) => state.handleResetPassword);
    const setShowForgotPassword = useAuthStore((state) => state.setShowForgotPassword);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const { token } = useParams();
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (valueInput.password !== valueInput.passwordConfirm) {
            setError("Error al confirmar la contraseña, por favor escriba la misma contraseña")
            return
        }
        try {
            const response = await handleResetPassword(valueInput.password, token)
            console.log("Contraseña generada con exito");
            resetForm();
            setError("");
            setTimeout(() => navigate("/"), 2000);
        } catch (error) {
            console.log("ERROR:", error);
            setError(error);
        }

    }
    return (
        <div className="container-addData">

            <form className="container-form" onSubmit={(e) => handleSubmit(e)}>
                <h2> Cambiar contraseña</h2>
                <input
                    name="password"
                    placeholder='Ingrese contraseña'
                    value={valueInput.password}
                    onChange={(e) => handleChange(e)}
                />

                <input
                    name="passwordConfirm"
                    placeholder='Confirme contraseña'
                    value={valueInput.passwordConfirm}
                    onChange={(e) => handleChange(e)}
                />
                <button >Enviar</button>
                {error && <p className='error'>{error}</p>}

            </form>
        </div>
    )
}
