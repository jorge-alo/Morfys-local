import { Banner } from '../../../shared/components/Banner';
import { Celular } from '../../../shared/components/Celular';
import { EnvioMinimo } from '../../../shared/components/EnvioMinimo';
import { HorarioMañana } from '../../../shared/components/HorarioMañana';
import { HorarioTarde } from '../../../shared/components/HorarioTarde';
import { Logo } from '../../../shared/components/Logo';
import { NombreLocal } from '../../../shared/components/NombreLocal';
import { ValorEnvio } from '../../../shared/components/ValorEnvio';
import { useFormStore } from '../../../store/useFormStore';

import { useAjustesForm } from '../hooks/useAjustesForm';

export const FormAjustes = () => {
    const valueInput = useFormStore((state) => state.valueInput);
    const fileLogo = useFormStore((state) => state.fileLogo);
    const fileBanner = useFormStore((state) => state.fileBanner);
    const handleChange = useFormStore((state) => state.handleChange);
    const { handleClickSend, loading } = useAjustesForm()

    return (
        <form className='form-ajustes' onSubmit={handleClickSend}>
            <Logo fileLogo={fileLogo} handleChange={handleChange} />
            <Banner fileBanner={fileBanner} handleChange={handleChange} />
            <NombreLocal valueInput={valueInput} handleChange={handleChange} />
            <Celular valueInput={valueInput} handleChange={handleChange} />
            <ValorEnvio valueInput={valueInput} handleChange={handleChange} />
            <EnvioMinimo valueInput={valueInput} handleChange={handleChange} />
            <HorarioMañana valueInput={valueInput} handleChange={handleChange} />
            <HorarioTarde valueInput={valueInput} handleChange={handleChange} />

            <button disabled={loading} className='button-ajustes'>{loading ? "Enviando..." : "Enviar"}</button>
        </form>
    )
}
