import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";
import { useEffect } from "react";

export const usePagoExitoso = () => {
    const checkAuth = useAuthStore((state) => state.checkAuth);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const refresh = async () => {
            try {
                setLoading(true);
                // ✅ Ejecutamos la verificación
                const response = await checkAuth(navigate);
                // Damos un pequeño respiro para que el estado se asiente antes de navegar
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1500);
            } catch (error) {
                console.error("Error al refrescar tras el pago:", error);
                navigate("/"); // Si falla, al inicio
            }finally {
            setLoading(false); // 🔹 Siempre vuelve a false
        }
        };

        refresh();
    }, [checkAuth, navigate]);
    return {
        loading
    }
}
