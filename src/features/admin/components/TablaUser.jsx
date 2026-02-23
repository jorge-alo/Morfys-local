import { useEffect, useState } from "react"
import '../../../styles/TablaUser.css'
import { useDataStore } from "../../../store/useDataStore";

export const TablaUser = ({onEdit, handleAddLocal}) => {

  const getUsers = useDataStore((state) => state.getUsers);
  const users = useDataStore((state) => state.users);

  useEffect(() => {
   getUsers()
  }, [])


  return (
    <div className="container-tablaUser">
      <table className="container-tablaUser__table">
        <thead className="container-tablaUser-table__thead">
          <tr>
            {users.length > 0 &&
              Object.keys(users[0]).map((key, index) => (
                <th key={index}>{key}</th>
              ))}
            <th>acciones</th>
          </tr>

        </thead>
        <tbody className="container-tablaUser-table__tbody">
          {users?.map((user, i) => (
            <tr key={i}>
              {Object.values(user).map((val, j) => (
                <td key={j}>{String(val)}</td>
              ))}
              <td>
                <button onClick={() => handleAddLocal(user.id)}>Datos del local</button>
                <button onClick={() => onEdit(user)}>Editar</button>
                <button onClick={() => handleDelete(user.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
