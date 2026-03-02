
import '../../../styles/ModalPay.css';
import { useModalPay } from '../hooks/useModalPay';


export const ModalPay = () => {

  const { 
    handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        handleCloseModal,
        handleOverlayCloseModal,
        handleGetPreferencePay
      } = useModalPay();


  return (
    <div
      className="container-modal-pay"
      onClick={handleOverlayCloseModal}
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
