

export const buildFormData = (fileLogo, fileBanner, valueInput) => {

    const formData = new FormData();
    if (fileLogo) formData.append("logo", fileLogo);
    if (fileBanner) formData.append("banner", fileBanner);
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
    return (
        formData
  )
}
