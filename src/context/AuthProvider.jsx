import { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom'

import { AuthContext } from './AuthContext';
import { useForm } from './FormProvider';
import { forgotEmailApi, updateLoginApi, verifyTokenApi } from '../api/request.api';



export const AuthProvider = ({ children }) => {
    const { resetForm, setComidas } = useForm()
    const [login, setLogin] = useState(false);
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState(null)
    const [admin, setAdmin] = useState(0);
    const [local, setLocal] = useState(null);
    const [showForgotPassword, setShowForgotPassword] = useState(false); // Nuevo estado
    const [emailForReset, setEmailForReset] = useState(""); // Email para recuperación
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

   const checkAuth = async () => {
        try {
            const response = await verifyTokenApi();
            console.log("Respuesta de verificación:", response.data);
            if(response.data.auth){
                setAdmin(1)
                setLoading(true);
            console.log("Adentro del if de auth")   
            }
           else if (response.data.login) {
                console.log("Adentro del else if de login")
                setLogin(true);
                setUserId(response.data.userId);
                setLocal(response.data.local);
            }
        } catch (err) {
            console.log("error:", err);
        } finally {
        setLoading(false); // ✅ Importante: terminamos de verificar
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
            if(response.data.auth){
                setAdmin(response.data.auth)
            }
            setLogin(response.data.login);
             navigate('/menu');
        } catch (error) {
            console.error("Error:", error);
            setError(error.response?.data?.message);
        }
    }

    const handleForgotPassword = async (email) => {
        console.log("Valor de email en handleForgotPassword",email)
        try {
            const response = await forgotEmailApi(email);
            return response
        } catch (error) {
            console.log("Error:", error);
            return error;
        }
    };
const handleResetPassword = async (token, newPassword) => {
   
   
}
    const handleLogOut = (e) => {
        e.preventDefault();
        document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setAdmin(0);
        setLogin(false);
        navigate("/");
        setComidas(null);
    }

    return (
        <AuthContext.Provider value={{loading, handleResetPassword, success, setSuccess, showForgotPassword, setShowForgotPassword, emailForReset, setEmailForReset, handleForgotPassword, setAdmin, local, setLocal, error, setError, admin, handleLoginSubmit, handleLogOut, login, setLogin, userId, checkAuth}}>
            {children}
        </AuthContext.Provider>
    )
}


