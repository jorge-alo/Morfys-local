
import { useAuthStore } from "../../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useDataStore } from "../../../store/useDataStore";

export const PagoVencido = () => {

  const handleLogOut = useAuthStore((state) => state.handleLogOut);
  const userId = useAuthStore((state) => state.userId);
  const getPreferencePay = useDataStore((state) => state.getPreferencePay)
  const navigate = useNavigate();
  const handleGetPreferencePay = async () => {
    const response = await getPreferencePay({ userId });
    if (response?.data?.init_point) {
      // redirige al checkout de Mercado Pago
      window.open(response.data.init_point, '_blank');
    }
  }

  return (
    <div style={{
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      height: "100vh", textAlign: "center", padding: "20px"
    }}>

      <h1>Tu suscripción ha vencido 😕</h1>
      <p>Para seguir usando el sistema, es necesario realizar el pago de la suscripción.</p>

      <button onClick={handleGetPreferencePay} style={{ marginTop: 20 }}>
        Realizar pago
      </button>

      <button onClick={() => handleLogOut(navigate)} style={{ marginTop: 10 }}>
        Cerrar sesión
      </button>
    </div>
  );
};