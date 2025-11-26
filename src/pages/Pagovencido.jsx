import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "../context/FormProvider";

export const PagoVencido = () => {
  const { handleLogOut } = useContext(AuthContext);
  const { setShowModalPay } = useForm();

  const handlePagar = () => {
    setShowModalPay(true);
  };

  return (
    <div style={{ 
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        height: "100vh", textAlign: "center", padding: "20px"
    }}>
      
      <h1>Tu suscripción ha vencido 😕</h1>
      <p>Para seguir usando el sistema, es necesario realizar el pago de la suscripción.</p>

      <button onClick={handlePagar} style={{ marginTop: 20 }}>
        Realizar pago
      </button>

      <button onClick={handleLogOut} style={{ marginTop: 10 }}>
        Cerrar sesión
      </button>
    </div>
  );
};