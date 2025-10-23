import { useContext, useEffect, useState } from "react"
import { DataContext } from "../context/DataContext"

export const TablaUser = () => {
    const { getUsers } = useContext(DataContext);
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
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={i}>
              {Object.values(user).map((val, j) => (
                <td key={j}>{String(val)}</td>
              ))}
            </tr>
          ))}
        </tbody>
            </table>
        </div>
    )
}
