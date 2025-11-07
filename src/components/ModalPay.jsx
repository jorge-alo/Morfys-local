import { useContext } from 'react';
import '../styles/ModalPay.css';
import { DataContext } from '../context/DataContext';

export const ModalPay = ({showModalPay, setShowModalPay}) => {
  const { getPreferencePay } = useContext(DataContext);
    const handleCloseModal = () => {
        setShowModalPay(false)
    }

    const handleClickPay = async() => {
      const response = await getPreferencePay();
    }
  return (
    <div className="container-modal-pay">
        <div className="container-pay">
            <span onClick={handleCloseModal}> X </span>
            <p onClick={handleClickPay}>Haga click aqui para hacer el pago</p>
        </div>
    </div>
  )
}
