import { useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export const PagoExitoso = () => {

  const checkAuth = useAuthStore((state) => state.checkAuth);
  const navigate = useNavigate();

  useEffect(() => {
    const refresh = async () => {
      try {
        // ✅ Ejecutamos la verificación
        await checkAuth(navigate);

        // Damos un pequeño respiro para que el estado se asiente antes de navegar
        setTimeout(() => {
          navigate("/menu");
        }, 1500);
      } catch (error) {
        console.error("Error al refrescar tras el pago:", error);
        navigate("/"); // Si falla, al inicio
      }
    };

    refresh();
  }, [checkAuth, navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <div className="loader"></div> {/* Opcional: un spinner visual */}
      <h2>¡Pago procesado con éxito!</h2>
      <p>Estamos actualizando tu cuenta, un momento por favor...</p>
    </div>
  );
};