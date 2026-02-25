
import '../../../styles/ModalUser.css'
import { useFormStore } from "../../../store/useFormStore";
import { useClickSendModalUser } from '../hook/useClickSendModalUser';
import { FormModalUser } from './FormModalUser';
export const ModalUSer = ({ setShowModalUser, userToEdit }) => {

    const valueInput = useFormStore((state) => state.valueInput);
    const handleChange = useFormStore((state) => state.handleChange);

    const { handleClose,
        handleOverlayCloseModal,
        handleEnviarUser,
    } = useClickSendModalUser(setShowModalUser, userToEdit, valueInput)

    handleUseEffectModalUser();

    return (
        <div className='modal-overlay' onClick={handleOverlayCloseModal}>
            <div className='modal-container' onClick={(e) => e.stopPropagation()}>
                <span className='close' onClick={handleClose}>X</span>
                <FormModalUser
                    handleEnviarUser={handleEnviarUser}
                    valueInput={valueInput}
                    handleChange={handleChange}
                    userToEdit={userToEdit}
                />
            </div>
        </div>
    )
}
