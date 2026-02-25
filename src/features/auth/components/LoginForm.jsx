import { useEffect } from "react";
import { useFormStore } from "../../../store/useFormStore";
import { useAuthStore } from "../../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { InputLogin } from "./InputLogin";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
export const LoginForm = () => {

    const handleLoginSubmit = useAuthStore((state) => state.handleLoginSubmit);
    const handleForgotPassword = useAuthStore((state) => state.handleForgotPassword);
    const error = useAuthStore((state) => state.error);
    const setError = useAuthStore((state) => state.setError);
    const showForgotPassword = useAuthStore((state) => state.showForgotPassword);
    const setShowForgotPassword = useAuthStore((state) => state.setShowForgotPassword);
    const emailForReset = useAuthStore((state) => state.emailForReset);
    const setEmailForReset = useAuthStore((state) => state.setEmailForReset);
    const navigate = useNavigate();
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
        <form className="container-form" onSubmit={showForgotPassword ? handleSubmitForgotPassword : handleSubmit}>
            <h2>{showForgotPassword ? "Recuperar Contraseña" : "Login"}</h2>

            {showForgotPassword ? (

                <ForgotPasswordForm />
            ) : (
                <>
                    <InputLogin />

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
    )

}
