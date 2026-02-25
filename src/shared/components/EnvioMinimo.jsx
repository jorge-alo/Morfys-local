
export const EnvioMinimo = ( {valueInput, handleChange} ) => {
    return (
        <div className='container-envio-minimo'>
            <label htmlFor="envio-minimo">Ingrese valor minimo de envio</label>
            <input
                type="text"
                id='envio-minimo'
                name='envioMinimo'
                value={valueInput.envioMinimo}
                onChange={(e) => handleChange(e)}
            />
        </div>
    )
}
