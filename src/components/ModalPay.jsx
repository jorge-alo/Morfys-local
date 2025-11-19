import { useContext, useState } from 'react';
import '../styles/ModalPay.css';
import { DataContext } from '../context/DataContext';

export const ModalPay = ({ showModalPay, setShowModalPay }) => {
  const { getPreferencePay } = useContext(DataContext);
  const[touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  // Comienza el gesto
  const handleTouchStart = (e) => {
    setTouchStartX(e.changedTouches[0].clientX);
  };

  // Durante el gesto
  const handleTouchMove = (e) => {
    setTouchEndX(e.changedTouches[0].clientX);
  };

  // Cuando finaliza el gesto
  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;

    const distance = touchEndX - touchStartX;

    // Si se movió más de 80px → cerrar modal
    if (Math.abs(distance) > 80) {
      setShowModalPay(false);
    }

    // Reset
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const handleCloseModal = () => {
    setShowModalPay(false)
  }

  const handleOverlayCloseModal = (e) => {
    if (e.target.classList.contains('container-modal-pay')) {
      setShowModalPay(false)
    }
  }

  const handleGetPreferencePay = async () => {
    const response = await getPreferencePay();
    console.log('valor de init_point en handleGetPreferencePay', response.data.init_point);
    if (response?.data?.init_point) {
      // redirige al checkout de Mercado Pago
      window.open(response.data.init_point, '_blank');
    }
  }
  return (
    <div
      className="container-modal-pay"
      onClick={(e) => handleOverlayCloseModal(e)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="container-pay" onClick={(e) => e.stopPropagation()}>
        <span onClick={handleCloseModal}> X </span>
        <p onClick={handleGetPreferencePay}>Haga click aqui para hacer el pago</p>
      </div>
    </div>
  )
}
