import { usePagoExitoso } from "../hooks/usePagoExitoso";

export const PagoExitoso = () => {

  const {loading} = usePagoExitoso();



  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <div className="loader"></div> {/* Opcional: un spinner visual */}
      <h2>¡Pago procesado con éxito!</h2>
      { loading && <p>Estamos actualizando tu cuenta, un momento por favor...</p>}
    </div>
  );
};