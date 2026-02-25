import { useAuthStore } from "../../../store/useAuthStore";


export const ForgotPasswordForm = () => {
    const setEmailForReset = useAuthStore((state) => state.setEmailForReset);
    const setShowForgotPassword = useAuthStore((state) => state.setShowForgotPassword);
    const emailForReset = useAuthStore((state) => state.emailForReset);

    return (
        <>
            <input
                type="email"
                name="email"
                placeholder="Ingrese su email registrado"
                value={emailForReset}
                onChange={(e) => setEmailForReset(e.target.value)}
                required
            />
            <button type="submit" >Enviar enlace</button>
            <button
                type="button"
                onClick={() => setShowForgotPassword(false)}
                className="secondary-btn"
            >
                Volver a Login
            </button>
        </>
    )
}
