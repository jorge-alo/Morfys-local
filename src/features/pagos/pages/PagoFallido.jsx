
export const PagoFallido = () => {
  return (
    <div className="pago-container" style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h2>❌ El pago no se completó</h2>
      <p>Podés intentar nuevamente desde el panel.</p>
      <a href="/menu" className="btn">Volver al panel</a>
    </div>
  );
};