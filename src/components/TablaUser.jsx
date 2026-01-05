import { useEffect, useState } from "react"

import { useDataStore } from "../store/useDataStore";

export const TablaUser = ({onEdit}) => {

  const getUsers = useDataStore((state) => state.getUsers);
  const [users, setUsers] = useState([]);

  const handleGetUsers = async () => {
    const users = await getUsers();
    setUsers(users.users);
    console.log("Valor de users en TablaUser", users);
  }

  useEffect(() => {
    handleGetUsers()
  }, [])


  return (
    <div>
      <table>
        <thead>
          <tr>
            {users.length > 0 &&
              Object.keys(users[0]).map((key, index) => (
                <th key={index}>{key}</th>
              ))}
            <th>acciones</th>
          </tr>

        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={i}>
              {Object.values(user).map((val, j) => (
                <td key={j}>{String(val)}</td>
              ))}
              <td>
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
