import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "../context/FormProvider";
import { DataContext } from "../context/DataContext";

export const PagoVencido = () => {
  const { handleLogOut, userId } = useContext(AuthContext);
 // const { setShowModalPay } = useForm();

  const { getPreferencePay } = useContext(DataContext)

    const handleGetPreferencePay = async () => {
    const response = await getPreferencePay({userId});
    console.log('valor de init_point en handleGetPreferencePay', response.data.init_point);
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

      <button onClick={handleLogOut} style={{ marginTop: 10 }}>
        Cerrar sesión
      </button>
    </div>
  );
};