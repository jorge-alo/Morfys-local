import '../../../styles/ModalLocal.css'
import { useClickSend } from '../hook/useClickSend';
import { FormModalLocal } from './FormModalLocal';

export const ModalLocal = ({ userId, setShowModalLocal }) => {
  
   const {  handleOverlayCloseModal } = useClickSend(userId, setShowModalLocal);
    return (
        <div className='modalLocal-container' onClick={handleOverlayCloseModal}>
            <div onClick={(e) => e.stopPropagation()}>
                <FormModalLocal userId={userId} setShowModalLocal = {setShowModalLocal} />
            </div>
        </div>

    )
}
