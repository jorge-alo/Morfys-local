import { useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const PagoExitoso = () => {
  const { checkAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const refresh = async () => {
      await checkAuth(); // 🔥 ACTUALIZA login, admin, local, etc.
      navigate("/menu"); // 🔥 Te manda al panel
    };

    refresh();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h2>Procesando pago...</h2>
      <p>Un momento por favor...</p>
    </div>
  );
};