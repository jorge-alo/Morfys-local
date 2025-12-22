import { useContext } from "react";
import { useForm } from "../context/FormProvider"
import '../styles/ModalUser.css'
import { DataContext } from "../context/DataContext";
import { useFormStore } from "../store/useFormStore";
export const ModalUSer = ({ setShowModalUser }) => {
    //const { valueInput, resetForm, handleChange } = useForm();

    const valueInput = useFormStore((state) => state.valueInput);
    const resetForm = useFormStore((state) => state.resetForm);
    const handleChange = useFormStore((state) => state.handleChange);

    const { sendDataNewUser } = useContext(DataContext);

    const handleClose = () => {
        resetForm()
        setShowModalUser(false)
    }
    const handleOverlayCloseModal = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            handleClose()
        }
    }

    const handleEnviarUser = async (e) => {
        e.preventDefault()
        const response = await sendDataNewUser(valueInput);
        handleClose();
    }
    return (
        <div className='modal-overlay' onClick={handleOverlayCloseModal}>
            <div className='modal-container' onClick={(e) => e.stopPropagation()}>
                <span className='close' onClick={handleClose}>X</span>
                <form className="form-user">
                    <div className="form-user__container-data">
                        <label htmlFor="name"> Nombre de usuario</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={valueInput.name}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="form-user__container-data">
                        <label htmlFor="email"> Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={valueInput.email}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="form-user__container-data">
                        <label htmlFor="password"> Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={valueInput.password}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <button onClick={handleEnviarUser}>enviar</button>
                </form>

            </div>
        </div>
    )
}
