import { useContext, useState } from 'react';
import '../styles/Modal.css'
import { Form } from './Form';
import { useForm } from '../context/FormProvider';
import { AgregarComidas } from './AgregarComidas';
import { AuthContext } from '../context/AuthContext';
import { useFormStore } from '../store/useFormStore';

export const Modal = ({ setEditIndex, showInputRow, setShowInputRow}) => {
    //const { resetForm } = useForm();
    const resetForm = useFormStore((state) => state.resetForm);

    const handleClose = () => {
        resetForm()
        setEditIndex(null);
        setShowInputRow(false);
        
    }
    const handleOverlayCloseModal = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            handleClose()
        }
    }


    return (
        <div className='modal-overlay' onClick={handleOverlayCloseModal}>
            <div className='modal-container' onClick={(e) => e.stopPropagation()}>
                <span className='close' onClick={handleClose}>X</span>
                {
                    showInputRow
                        ? <AgregarComidas handleClose = {handleClose} />
                        : <Form handleClose={handleClose} />
                }

            </div>
        </div>
    )
}
