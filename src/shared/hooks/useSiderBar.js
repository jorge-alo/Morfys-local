import { useEffect, useState } from "react";

export const useSiderBar = (checkPay, admin, setShowModalPay) => {
    const [activeUntil, setActiveUntil] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    useEffect(() => {

        if (!admin) {
            const fetchPay = async () => {
                const res = await checkPay();
                console.log("Respuesta checkPay:", res);

                if (res?.active_until) {
                    setActiveUntil(res.active_until);
                }
            };

            fetchPay();
        }

    }, []);

    const payStatus = (() => {
        if (!activeUntil || admin) return { show: false, message: "", isExpired: false };

        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); // Normalizamos hoy a medianoche

        const vencimiento = new Date(activeUntil);
        vencimiento.setHours(0, 0, 0, 0); // Normalizamos vencimiento

        const diferenciaMs = vencimiento - hoy;
        const diasRestantes = Math.round(diferenciaMs / (1000 * 60 * 60 * 24));

        let message = "";
        let isExpired = false;

        if (diasRestantes < 0) {
            message = "Tu factura ha vencido";
            isExpired = true;
        } else if (diasRestantes === 0) {
            message = "Tu factura vence hoy";
        } else if (diasRestantes <= 7) {
            message = `Tu factura vence en ${diasRestantes} día${diasRestantes > 1 ? 's' : ''}`;
        }

        // Mostramos el bloque si ya venció o faltan 7 días o menos
        return {
            show: diasRestantes <= 7,
            message,
            isExpired
        };
    })();

    const handleShowModalPay = () => {
        setShowModalPay(true);
        setOpenMenu(prev => !prev);
    }

    const handleClickMenu = () => {
        setOpenMenu(prev => !prev)
    }

    return {
        activeUntil,
        payStatus,
        handleShowModalPay,
        handleClickMenu,
        openMenu,
        setOpenMenu
    }
}
