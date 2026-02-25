import { useFormStore } from "../../../store/useFormStore";


export const InputLogin = () => {
    const handleChange = useFormStore((state) => state.handleChange);
    const valueInput = useFormStore((state) => state.valueInput);
    return (
        <>

            <input
                type="email"
                name="email"
                placeholder="Ingrese email"
                value={valueInput.email}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Ingrese password"
                value={valueInput.password}
                onChange={handleChange}
            />
            <button type="submit">Enviar</button>
        </>
    )
}
