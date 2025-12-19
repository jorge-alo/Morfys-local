import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

import { AuthContext } from './AuthContext';
import { useForm } from './FormProvider';
import { checkPayAPi, forgotEmailApi, logOutApi, updateLoginApi, verifyTokenApi } from '../api/request.api';



export const AuthProvider = ({ children }) => {
    const { resetForm, setComidas } = useForm()
    const [login, setLogin] = useState(false);
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState(null)
    const [admin, setAdmin] = useState(0);
    const [local, setLocal] = useState(null);
    const [localId, setLocalId] = useState(null);
    const [showForgotPassword, setShowForgotPassword] = useState(false); // Nuevo estado
    const [emailForReset, setEmailForReset] = useState(""); // Email para recuperación
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const checkAuth = async () => {
        try {
            const response = await verifyTokenApi();

            if (response.data.status === "expired") {
                setLogin(false);
                setUserId(response.data.userId);
                setLocal(null);
                setLocalId(null);
                navigate("/pago-vencido");
                return;
            }

            if (response.data.auth) {
                setAdmin(1);
            } else if (response.data.login) {
                setLogin(true);
                setUserId(response.data.userId);
                setLocal(response.data.local);
                setLocalId(response.data.localId)
                console.log("Valor de localId en AuthProvider", localId);
            }

        } catch (err) {
            console.log("Error en checkAuth:", err.response?.data);

            // ⛔ AQUI ESTABA EL PROBLEMA
            if (err.response?.data?.status === "expired") {
                setLogin(false);
                setUserId(err.response.data.userId);
                setLocal(null);
                setLocalId(null);
                navigate("/pago-vencido");  // 🔥 Redirige en caso de 403
                return;
            }

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);


    const handleLoginSubmit = async (credentials) => {
        setError(false);

        console.log(credentials);
        try {
            const response = await updateLoginApi(credentials);
            console.log("Valor de response en handleloginsubmit:", response);

            // 🔥 Guardamos token
            localStorage.setItem("token", response.data.token);

            if (response.data.auth) {
                setAdmin(response.data.auth)
                navigate('/admin/usuarios');
            } else {
                setLogin(response.data.login);
                navigate('/dashboard');
            }

        } catch (error) {
            console.error("Error:", error);
            setError(error.response?.data?.message);
        }
    }

    const handleForgotPassword = async (email) => {
        console.log("Valor de email en handleForgotPassword", email)
        try {
            const response = await forgotEmailApi(email);
            return response
        } catch (error) {
            console.log("Error:", error);
            return error;
        }
    };

    const handleLogOut = async (e) => {
        localStorage.removeItem("token");
        setAdmin(0);
        setLogin(false);
        setComidas(null);
        navigate("/");
    }

    const checkPay = async () => {
        try {
            const response = await checkPayAPi();
            return response.data;
        } catch (error) {
            console.log("Error:", error);
        }

    }
    return (
        <AuthContext.Provider value={{ localId, checkPay, loading, success, setSuccess, showForgotPassword, setShowForgotPassword, emailForReset, setEmailForReset, handleForgotPassword, setAdmin, local, setLocal, error, setError, admin, handleLoginSubmit, handleLogOut, login, setLogin, userId, checkAuth }}>
            {children}
        </AuthContext.Provider>
    )
}


