import '../styles/ModalPay.css';

export const ModalPay = ({showModalPay, setShowModalPay}) => {
    const handleCloseModal = () => {
        setShowModalPay(false)
    }
  return (
    <div className="container-modal-pay">
        <div className="container-pay">
            <span onClick={handleCloseModal}> X </span>
            <p>Haga click aqui para hacer el pago</p>
        </div>
    </div>
  )
}
