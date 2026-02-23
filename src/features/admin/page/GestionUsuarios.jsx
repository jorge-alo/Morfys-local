import { useState } from "react";
import { TablaUser } from "../components/TablaUser"
import { ModalUSer } from "../components/ModalUSer";
import { ModalLocal } from "../components/ModalLocal";




export const GestionUsuarios = () => {
    const [showModalUser, setShowModalUser] = useState(false);
    const [showModalLocal, setShowModalLocal] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null)
    const [userId, setUserId] = useState(null)
    const handleAddUser = () => {
        setUserToEdit(null);
        setShowModalUser(true);
    }

    const handleEditUser = (user) => {
        setUserToEdit(user); // Guardamos el usuario seleccionado
        setShowModalUser(true);
    }

    const handleAddLocal = (user) => {
        setUserId(user); // Guardamos el usuario seleccionado
        setShowModalLocal(true);
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

            {
                showModalLocal &&
                <ModalLocal 
                userId={userId}
                setShowModalLocal={setShowModalLocal}
                 />
            }

            <div>
                <button onClick={handleAddUser}> Agregar usuario </button>
            </div>
            <TablaUser
                onEdit={handleEditUser}
                handleAddLocal={handleAddLocal}
            />
        </div>
    )
}
