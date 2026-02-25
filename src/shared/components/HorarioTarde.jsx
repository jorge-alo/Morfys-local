
export const HorarioTarde = ( {valueInput,  handleChange} ) => {
  return (
     <div className='horario-h3'>
                <h3>Ingrese el horario de a tarde</h3>
                <div className='form-ajuste__horario-tarde'>
                    <div className='container-horarios'>
                        <label >De:</label>
                        <select
                            name="diaTardeEntrada"
                            value={valueInput.diaTardeEntrada}
                            onChange={(e) => handleChange(e)}>
                            <option value="">Elige dia</option>
                            <option value="lunes">Lunes</option>
                            <option value="martes">Martes</option>
                            <option value="miercoles">Miercoles</option>
                            <option value="jueves">Jueves</option>
                            <option value="viernes">Viernes</option>
                            <option value="sabado">Sabado</option>
                            <option value="domingo">Domingo</option>
                        </select>
                    </div>
                    <div className='container-horarios'>
                        <label>A:</label>
                        <select
                            name="diaTardeSalida"
                            value={valueInput.diaTardeSalida}
                            onChange={(e) => handleChange(e)}>
                            <option value="">Elige dia</option>
                            <option value="lunes">Lunes</option>
                            <option value="martes">Martes</option>
                            <option value="miercoles">Miercoles</option>
                            <option value="jueves">Jueves</option>
                            <option value="viernes">Viernes</option>
                            <option value="sabado">Sabado</option>
                            <option value="domingo">Domingo</option>
                        </select>
                    </div>
                    <div className='container-horarios'>
                        <label >De:</label>
                        <select
                            name="horarioTardeEntrada"
                            value={valueInput.horarioTardeEntrada}
                            onChange={(e) => handleChange(e)}>
                            <option value="">Elige horario</option>
                            <option value="12:00">12:00</option>
                            <option value="13:00">13:00</option>
                            <option value="14:00">14:00</option>
                            <option value="15:00">15:00</option>
                            <option value="16:00">16:00</option>
                            <option value="17:00">17:00</option>
                            <option value="18:00">18:00</option>
                            <option value="19:00">19:00</option>
                            <option value="20:00">20:00</option>
                            <option value="21:00">21:00</option>
                            <option value="22:00">22:00</option>
                            <option value="23:00">23:00</option>
                            <option value="24:00">24:00</option>
                        </select>
                    </div>
                    <div className='container-horarios'>
                        <label >A:</label>
                        <select
                            name="horarioTardeSalida"
                            value={valueInput.horarioTardeSalida}
                            onChange={(e) => handleChange(e)}>
                            <option value="">Elige horario</option>
                            <option value="1:00">1:00</option>
                            <option value="2:00">2:00</option>
                            <option value="3:00">3:00</option>
                            <option value="4:00">4:00</option>
                            <option value="5:00">5:00</option>
                            <option value="6:00">6:00</option>
                            <option value="7:00">7:00</option>
                            <option value="8:00">8:00</option>
                            <option value="9:00">9:00</option>
                            <option value="10:00">10:00</option>
                            <option value="11:00">11:00</option>
                            <option value="12:00">12:00</option>
                            <option value="13:00">13:00</option>
                            <option value="14:00">14:00</option>
                            <option value="15:00">15:00</option>
                            <option value="16:00">16:00</option>
                            <option value="17:00">17:00</option>
                            <option value="18:00">18:00</option>
                            <option value="19:00">19:00</option>
                            <option value="20:00">20:00</option>
                            <option value="21:00">21:00</option>
                            <option value="22:00">22:00</option>
                            <option value="23:00">23:00</option>
                            <option value="24:00">24:00</option>
                        </select>
                    </div>
                </div>
            </div>
  )
}
