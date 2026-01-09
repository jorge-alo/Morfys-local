import { create } from 'zustand';
import { verifyTokenApi, updateLoginApi, forgotEmailApi, checkPayAPi } from '../api/request.api';
import { useFormStore } from './useFormStore'; // Para limpiar comidas al salir

export const useAuthStore = create((set, get) => ({

    login: false,
    isExpired: false,
    userId: null,
    admin: 0,
    local: null,
    localId: null,
    error: null,
    loading: true,
    success: "",
    showForgotPassword: false,
    emailForReset: "",

    // ACCIONES
    setSuccess: (msg) => set({ success: msg }),
    setError: (msg) => set({ error: msg }),
    setShowForgotPassword: (bool) => set({ showForgotPassword: bool }),
    setEmailForReset: (email) => set({emailForReset: email}),

    checkAuth: async (navigate) => {
        try {
            const response = await verifyTokenApi();
            if (response.data.auth) {
                set({ admin: 1, isExpired: false });
                navigate('/admin/usuarios'); // Redirige al admin si todo está OK
            } else if (response.data.login) {
                set({
                    login: true,
                    isExpired: false,
                    userId: response.data.userId,
                    local: response.data.local,
                    localId: response.data.localId
                });
                navigate('/dashboard'); // Redirige al usuario si todo está OK
            }
        } catch (err) {
            // SI EL PAGO ESTÁ VENCIDO (Error 403 del backend)
            if (err.response?.data?.status === "expired") {
                set({
                    login: true,
                    isExpired: true,
                    userId: err.response.data.userId,
                    local: err.response.data.local,
                    loading: false
                });
                navigate("/pago-vencido");
                return; // Salimos sin hacer Logout
            }

            // SI EL TOKEN ES INVÁLIDO (Error 401)
            if (err.response?.status === 401) {
                get().handleLogOut(navigate, "/");
            }
        } finally {
            set({ loading: false });
        }
    },

    handleLoginSubmit: async (credentials, navigate) => {
        set({ error: null });
        try {
            const response = await updateLoginApi(credentials);
            localStorage.setItem("token", response.data.token);
            // 2. Delegar toda la responsabilidad a checkAuth
            // Esta función verificará si está vencido o no y hará el navigate correspondiente
            await get().checkAuth(navigate);
        } catch (error) {
            set({ error: error.response?.data?.message });
        }
    },

    handleForgotPassword: async (email) => {
        console.log("Valor de email en handleForgotPassword", email);
        try {
            const response = await forgotEmailApi(email);
            // Opcional: puedes guardar un mensaje de éxito en el estado
            set({ success: response.data.message, error: null });
            return response;
        } catch (error) {
            console.log("Error en forgotPassword:", error);
            set({ error: error.response?.data?.message || "Error al enviar el correo" });
            throw error; // Lanzamos el error para que el componente lo atrape si es necesario
        }
    },

    handleLogOut: (navigate, redirectTo = "/") => {
        localStorage.removeItem("token");
        // Usamos la otra store para limpiar datos de comida
        useFormStore.getState().setComidas(null);

        set({
            admin: 0,
            login: false,
            userId: null,
            local: null,
            localId: null,
            error: null,
            loading: false
        });
        if (typeof navigate === 'function') {
            navigate(redirectTo);
        }
    },

    checkPay: async () => {
        try {
            const response = await checkPayAPi();
            return response.data;
        } catch (error) {
            console.log("Error en checkPay:", error);
        }
    }
}));






