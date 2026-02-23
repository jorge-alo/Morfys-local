import { useEffect } from "react";
import '../../../styles/Login.css'
import { useFormStore } from "../../../store/useFormStore";
import { useAuthStore } from "../../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export const Login = () => {

    const handleLoginSubmit = useAuthStore((state) => state.handleLoginSubmit);
    const handleForgotPassword = useAuthStore((state) => state.handleForgotPassword);
    const error = useAuthStore((state) => state. error);
    const setError = useAuthStore((state) => state.setError);
    const showForgotPassword = useAuthStore((state) => state.showForgotPassword);
    const setShowForgotPassword = useAuthStore((state) => state.setShowForgotPassword);
    const emailForReset = useAuthStore((state) => state.emailForReset);
    const setEmailForReset = useAuthStore((state) => state.setEmailForReset);
    const navigate = useNavigate();
    const handleChange = useFormStore((state) => state.handleChange);
    const valueInput = useFormStore((state) => state.valueInput);
    const resetForm = useFormStore((state) => state.resetForm);

    useEffect(() => {
        setError(null);
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await handleLoginSubmit(valueInput, navigate);
        resetForm();
    }

    const handleSubmitForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await handleForgotPassword(emailForReset); // Añade await aquí
            console.log("valor de response en login", response);
            alert(response.data.message);
            setShowForgotPassword(false);
            setEmailForReset("");
        } catch (error) {
            // El error ya fue manejado en handleForgotPassword
            console.error("Error en handleSubmitForgotPassword:", error);
        }
    };

    return (
        <div className="container-addData">
            <form className="container-form" onSubmit={showForgotPassword ? handleSubmitForgotPassword : handleSubmit}>
                <h2>{showForgotPassword ? "Recuperar Contraseña" : "Login"}</h2>

                {showForgotPassword ? (
                    <>
                        <input
                            type="email"
                            name="email"
                            placeholder="Ingrese su email registrado"
                            value={emailForReset}
                            onChange={(e) => setEmailForReset(e.target.value)}
                            required
                        />
                        <button type="submit" onClick={(e) => handleSubmitForgotPassword(e)}>Enviar enlace</button>
                        <button
                            type="button"
                            onClick={() => setShowForgotPassword(false)}
                            className="secondary-btn"
                        >
                            Volver a Login
                        </button>
                    </>
                ) : (
                    <>
                       
                        <input
                            type="email"
                            name="email"
                            placeholder="Ingrese email"
                            value={valueInput.email}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Ingrese password"
                            value={valueInput.password}
                            onChange={handleChange}
                        />
                        <button type="submit">Enviar</button>
                        <p
                            className="forgot-password-link"
                            onClick={() => setShowForgotPassword(true)}
                        >
                            ¿Olvidaste tu contraseña?
                        </p>
                    </>
                )}
                {error && <p className='error'>{error}</p>}
            </form>
        </div>
    )
}
