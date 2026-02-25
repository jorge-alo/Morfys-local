import { useDataStore } from "../../../store/useDataStore";

export const FormModalUser = ({ handleEnviarUser, valueInput, handleChange, userToEdit }) => {
    const error = useDataStore((state) => state.error);
    return (
        <form className="form-user" onSubmit={handleEnviarUser}>
            <input type="hidden" name="id" value={valueInput.user_id || ""} />
            <h3>{userToEdit ? 'Editar Usuario' : 'Nuevo Usuario'}</h3>
            <div className="form-user__container-data">
                <label htmlFor="name"> Nombre de usuario</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={valueInput.name}
                    onChange={handleChange}
                />
            </div>
            <div className="form-user__container-data">
                <label htmlFor="email"> Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={valueInput.email}
                    onChange={handleChange}
                />
            </div>
            <div className="form-user__container-data">
                <label htmlFor="password"> Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={valueInput.password}
                    onChange={handleChange}
                />
            </div>

            <div className="form-user__container-data">
                <label htmlFor="active_until">Activo hasta:</label>
                <input
                    type="date"
                    id="active_until"
                    name="active_until"
                    value={valueInput.active_until || ""}
                    onChange={handleChange}
                />
            </div>
            <button >enviar</button>
            <p style={{color: 'red'}}> {error} </p>
        </form>
    )
}
