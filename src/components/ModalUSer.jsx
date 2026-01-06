
import '../styles/ModalUser.css'
import { useFormStore } from "../store/useFormStore";
import { useDataStore } from "../store/useDataStore";
import { useEffect } from 'react';
export const ModalUSer = ({ setShowModalUser, userToEdit }) => {

    const valueInput = useFormStore((state) => state.valueInput);
    const resetForm = useFormStore((state) => state.resetForm);
    const handleChange = useFormStore((state) => state.handleChange);
    const setFormValues = useFormStore((state) => state.setFormValues);
    const sendDataNewUser = useDataStore((state) => state.sendDataNewUser);
    const updateUserData = useDataStore((state) => state.updateUserData);

    // Efecto para cargar datos si es edición
    useEffect(() => {
        if (userToEdit) {
            // Creamos una copia para no mutar el original
            const dataForForm = { ...userToEdit };

            // Si existe la fecha, la formateamos a YYYY-MM-DD
            if (dataForForm.active_untill) {
                dataForForm.active_untill = dataForForm.active_untill.split('T')[0];
            }

            setFormValues(dataForForm);
        } else {
            resetForm();
        }
    }, [userToEdit]);

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
        e.preventDefault();

        if (userToEdit) {
            // Lógica para EDITAR (deberías pasar el ID o Email único)
            await updateUserData(valueInput, userToEdit.email);
        } else {
            // Lógica para CREAR
            await sendDataNewUser(valueInput);
        }

        handleClose();
    };
    return (
        <div className='modal-overlay' onClick={handleOverlayCloseModal}>
            <div className='modal-container' onClick={(e) => e.stopPropagation()}>
                <span className='close' onClick={handleClose}>X</span>

                <form className="form-user">
                    <h3>{userToEdit ? 'Editar Usuario' : 'Nuevo Usuario'}</h3>
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

                    <div className="form-user__container-data">
                        <label htmlFor="active_untill">Activo hasta:</label>
                        <input
                            type="date"
                            id="active_untill"
                            name="active_untill"
                            value={valueInput.active_untill || ""}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>


                    <button onClick={handleEnviarUser}>enviar</button>
                </form>

            </div>
        </div>
    )
}
