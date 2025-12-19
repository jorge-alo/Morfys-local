import { useState } from "react";
import { TablaUser } from "../components/TablaUser"




export const GestionUsuarios = () => {
    const [showModalUser, setShowModalUser] = useState(false);
    const handleAddUser = () => {
        setShowModalUser(true);
    }
    return (
        <div className="container-table">
            {
                showModalUser &&
                <ModalUSer
                    setShowModalUser={setShowModalUser}
                />
            }
            <div>
                <button onClick={handleAddUser}> Agregar usuario </button>
            </div>
            <TablaUser></TablaUser>
        </div>
    )
}
