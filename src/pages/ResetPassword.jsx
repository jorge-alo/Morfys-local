import { useContext } from 'react'
import { useForm } from '../context/FormProvider'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DataContext } from '../context/DataContext';

export const ResetPassword = () => {
    const { handleChange, valueInput, resetForm } = useForm();
    const { handleResetPassword } = useContext(DataContext);
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
