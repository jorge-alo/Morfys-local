import { useState } from "react";
import { TablaUser } from "../components/TablaUser"
import { ModalUSer } from "../components/ModalUSer";




export const GestionUsuarios = () => {
    const [showModalUser, setShowModalUser] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null)
    const handleAddUser = () => {
        setUserToEdit(null);
        setShowModalUser(true);
    }

    const handleEditUser = (user) => {
        setUserToEdit(user); // Guardamos el usuario seleccionado
        setShowModalUser(true);
    }

    return (
        <div className="container-table">
            {
                showModalUser &&
                <ModalUSer
                    setShowModalUser={setShowModalUser}
                    userToEdit={userToEdit}
                />
            }
            <div>
                <button onClick={handleAddUser}> Agregar usuario </button>
            </div>
            <TablaUser onEdit={handleEditUser} />
        </div>
    )
}
