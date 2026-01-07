import { create } from 'zustand';
import { verifyTokenApi, updateLoginApi, forgotEmailApi, checkPayAPi } from '../api/request.api';
import { useFormStore } from './useFormStore'; // Para limpiar comidas al salir

export const useAuthStore = create((set, get) => ({

    login: false,
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

    checkAuth: async (navigate) => {
        try {
            const response = await verifyTokenApi();
            if (response.data.status === "expired") {
                set({
                    login: true, // Mantenemos el login
                    userId: response.data.userId,
                    local: response.data.local,
                    localId: response.data.localId
                });
                navigate("/pago-vencido"); // Redirigimos pero seguimos logueados
                return;
            }

            if (response.data.auth) {
                set({ admin: 1 });
            } else if (response.data.login) {
                set({
                    login: true,
                    userId: response.data.userId,
                    local: response.data.local,
                    localId: response.data.localId
                });
            }
        } catch (err) {
            // SI EL PAGO ESTÁ VENCIDO (Error 403 del backend)
        if (err.response?.data?.status === "expired") {
            set({
                login: true, 
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

            if (response.data.auth) {
                set({ admin: response.data.auth });
                navigate('/admin/usuarios');
            } else {
                set({
                    login: response.data.login,
                    userId: response.data.userId,
                    local: response.data.local,
                    localId: response.data.localId
                });
                navigate('/dashboard');
            }
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






