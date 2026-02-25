
export const ValorEnvio = ( {valueInput, handleChange} ) => {
    return (
        <div className='container-envio'>
            <label htmlFor="envio">Ingrese valor de envio</label>
            <input
                type="text"
                id='envio'
                name='envio'
                value={valueInput.envio}
                onChange={(e) => handleChange(e)}
            />
        </div>
    )
}
