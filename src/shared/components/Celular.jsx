
export const Celular = ( {valueInput, handleChange} ) => {
  return (
      <div className='container-cel'>
                <label htmlFor="cel">Ingrese su numero de celular</label>
                <div className='cel-inputs'>

                    <div className='container-pais'>
                        <label htmlFor="pais">pais</label>
                        <input
                            className='pais'
                            type="text"
                            id='pais'
                            name="celPais"
                            placeholder="ej: 54"
                            value={valueInput.celPais}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='container-provincia'>
                        <label htmlFor="provincia">provi.</label>
                        <input
                            className='provincia'
                            type="text"
                            id='provincia'
                            name="celProvincia"
                            placeholder="ej: 11"
                            value={valueInput.celProvincia}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='container-celNumber'>
                        <label htmlFor="provincia">numero</label>
                        <input
                            className='celNumber'
                            type="text"
                            id='cel'
                            name='celNumero'
                            placeholder="ej: 12345678"
                            value={valueInput.celNumero}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>

                </div>

            </div>
  )
}
