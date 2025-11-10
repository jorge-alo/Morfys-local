export const PagoExitoso = () => {
  return (
    <div className="pago-container" style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h2>✅ ¡Pago recibido con éxito!</h2>
      <p>Tu servicio ha sido renovado por 30 días.</p>
      <a href="/menu" className="btn">Volver al panel</a>
    </div>
  );
};