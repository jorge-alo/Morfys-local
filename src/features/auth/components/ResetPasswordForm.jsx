
import { useParams } from 'react-router-dom';
import { useFormStore } from '../../../store/useFormStore';
import { useHandleSubmitResetPassword } from '../hook/useHandleSubmitResetPassword';


export const ResetPasswordForm = () => {
    const handleChange = useFormStore((state) => state.handleChange);
    const valueInput = useFormStore((state) => state.valueInput);

    const { token } = useParams();

    const { handleSubmit, error, success } = useHandleSubmitResetPassword(valueInput, token);
    if (success) {
        return <p className="success-msg">✅ Contraseña cambiada. Redirigiendo...</p>;
    }

    return (
        <form className="container-form" onSubmit={handleSubmit}>
            <h2> Cambiar contraseña</h2>
            <input
                name="password"
                placeholder='Ingrese contraseña'
                value={valueInput.password}
                onChange={(handleChange)}
            />

            <input
                name="passwordConfirm"
                placeholder='Confirme contraseña'
                value={valueInput.passwordConfirm}
                onChange={handleChange}
            />
            <button >Enviar</button>
            {error && <p className='error'>{error}</p>}

        </form>
    )
}
