
export const NombreLocal = ({ valueInput, handleChange } ) => {
    return (
        <div className='container-cel'>
            <label htmlFor="local">Ingrese nombre del local</label>
            <input
                type="text"
                id='local'
                name='local'
                value={valueInput.local}
                onChange={(e) => handleChange(e)}
            />
        </div>
    )
}
