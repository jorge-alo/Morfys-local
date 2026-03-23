import "../../styles/Sidebar.css"
import { useFormStore } from "../../store/useFormStore";
import { useAuthStore } from "../../store/useAuthStore";
import { RendelLiMobile } from "./RendelLiMobile";
import { RenderLiDesktop } from "./RenderLiDesktop";
import { useSiderBar } from "../hooks/useSiderBar";
import { useDataStore } from "../../store/useDataStore";

export const Sidebar = () => {

  const admin = useAuthStore((state) => state.admin);
  const local = useAuthStore((state) => state.local);
  const handleLogOut = useAuthStore((state) => state.handleLogOut);
  const checkPay = useAuthStore((state) => state.checkPay);
  const setShowModalPay = useFormStore((state) => state.setShowModalPay);
  const setStandby = useDataStore((state) => state.setStandby);
 

  const {
    activeUntil,
    payStatus,
    handleShowModalPay,
    handleClickMenu,
    openMenu,
    setOpenMenu
  } = useSiderBar(checkPay, admin, setShowModalPay);

  const handleStandby = async (value) => {
    await setStandby(value);
  };

  return (
    <>
      <RendelLiMobile
        handleClickMenu={handleClickMenu}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        handleLogOut={handleLogOut}
        admin={admin}
        payStatus={payStatus}
        handleShowModalPay={handleShowModalPay}
        activeUntil={activeUntil}
      />
      <RenderLiDesktop
        local={local}
        handleLogOut={handleLogOut}
        admin={admin}
        payStatus={payStatus}
        handleShowModalPay={handleShowModalPay}
        activeUntil={activeUntil}
        handleStandby={handleStandby}
      />

    </>

  )
}
