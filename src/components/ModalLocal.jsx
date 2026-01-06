import '../styles/Ajustes.css'
import '../styles/ModalUser.css'
import { useFormStore } from '../store/useFormStore';
import { useDataStore } from '../store/useDataStore';

export const ModalLocal = ({ userId, setShowModalLocal }) => {
    const valueInput = useFormStore((state) => state.valueInput);
    const fileLogo = useFormStore((state) => state.fileLogo);
    const fileBanner = useFormStore((state) => state.fileBanner);
    const handleChange = useFormStore((state) => state.handleChange);
    const resetForm = useFormStore((state) => state.resetForm);
    const sendDataNewLocal = useDataStore((state) => state.sendDataNewLocal);

    const handleClickSend = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (fileLogo) formData.append("logo", fileLogo);
        if (fileBanner) formData.append("banner", fileBanner);
        formData.append('userId', userId)
        formData.append('local', valueInput.local)
        formData.append('celNumero', valueInput.celNumero)
        formData.append('celPais', valueInput.celPais);
        formData.append('celProvincia', valueInput.celProvincia);
        formData.append('envio', valueInput.envio)
        formData.append('envioMinimo', valueInput.envioMinimo)
        formData.append('diaManianaEntrada', valueInput.diaMañanaEntrada)
        formData.append('diaManianaSalida', valueInput.diaMañanaSalida)
        formData.append('horarioManianaEntrada', valueInput.horarioManianaEntrada)
        formData.append('horarioManianaSalida', valueInput.horarioManianaSalida)
        formData.append('diaTardeEntrada', valueInput.diaTardeEntrada)
        formData.append('diaTardeSalida', valueInput.diaTardeSalida)
        formData.append('horarioTardeEntrada', valueInput.horarioTardeEntrada)
        formData.append('horarioTardeSalida', valueInput.horarioTardeSalida)
        try {
            await sendDataNewLocal(formData);
            resetForm(); // limpia state después de enviar
            setShowModalLocal(false);
        } catch (error) {
            console.error("Error enviando datos:", error);
        }
    }
    const handleClose = () => {
        resetForm()
        setShowModalLocal(false)
    }
    const handleOverlayCloseModal = (e) => {
        if (e.target.classList.contains('ajustes-container')) {
            handleClose()
        }
    }
    return (
        <div className='modal-overlay' onClick={handleOverlayCloseModal}>
            <div className='ajustes-container' onClick={(e) => e.stopPropagation()}>
                <span className='close' onClick={handleClose}>X</span>
                <form className='form-ajustes' >
                    <div className='container-logo'>
                        <h3>Logo:</h3>
                        <label className='label-logo' htmlFor="logo">{fileLogo ? fileLogo.name : 'Cargar imagen'} <span>+</span></label>
                        <input
                            className='logo'
                            type="file"
                            id="logo"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className='container-banner'>
                        <h3>Banner:</h3>
                        <label className='label-banner' htmlFor="banner">{fileBanner ? fileBanner.name : 'Cargar imagen'} <span>+</span></label>
                        <input
                            className='banner'
                            type="file"
                            id="banner"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
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

                    <div className='horario-h3'>
                        <h3>Ingrese el horario de a mañana</h3>
                        <div className='form-ajuste__horario-mañana'>
                            <div className='container-horarios'>
                                <label >De:</label>
                                <select
                                    name="diaMañanaEntrada"
                                    value={valueInput.diaMañanaEntrada}
                                    onChange={(e) => handleChange(e)}
                                >
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
                                <label >A:</label>
                                <select
                                    name="diaMañanaSalida"
                                    value={valueInput.diaMañanaSalida}
                                    onChange={(e) => handleChange(e)} >
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
                                    name="horarioManianaEntrada"
                                    value={valueInput.horarioManianaEntrada}
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
                                </select>
                            </div>
                            <div className='container-horarios'>
                                <label >A:</label>
                                <select
                                    name="horarioManianaSalida"
                                    value={valueInput.horarioManianaSalida}
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
                        </div>


                    </div>
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
                    <button className='button-ajustes' onClick={(e) => handleClickSend(e)}>Enviar</button>
                </form>
            </div>
        </div>


    )
}
