import { useAuthStore } from '../../../store/useAuthStore';
import { useDataStore } from '../../../store/useDataStore';
import { useFormStore } from '../../../store/useFormStore';
import { useState } from 'react';
export const useModalPay = () => {

    const getPreferencePay = useDataStore((state) => state.getPreferencePay);
    const setShowModalPay = useFormStore((state) => state.setShowModalPay);
    const userId = useAuthStore((state) => state.userId)
    const [touchStartX, setTouchStartX] = useState(null);
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
        const response = await getPreferencePay({ userId });
        console.log('valor de init_point en handleGetPreferencePay', response.data.init_point);
        if (response?.data?.init_point) {
            // redirige al checkout de Mercado Pago
            window.location.href = response.data.init_point;
        }
    }
    return {
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        handleCloseModal,
        handleOverlayCloseModal,
        handleGetPreferencePay
    }
}
