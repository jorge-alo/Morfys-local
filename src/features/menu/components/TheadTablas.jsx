
export const TheadTablas = (
    {
         handleChangeSelectAll, 
        selectAll,
        comidas,
        aceptarHeaderCheck,
        handleChangeAceptarHeader
    }
) => {
    return (
        <thead>
            <tr>
                <th className="check-col">
                    <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={(e) => handleChangeSelectAll(e.target.checked)}
                    />
                </th>
                {
                    comidas && comidas.length > 0 &&
                    Object.keys(comidas[0]).map((key, index) => {
                        if (key == "id" || key == "description" || key == "variantes" || key == "tamanio" || key == "image" || key == "productMode") return null;
                        return <th key={key} className={key === 'name' ? 'name' : 'other'}>
                            {key == "standby" ?
                                <>
                                    <div className="standby" >
                                        <input
                                            type="checkbox"
                                            checked={aceptarHeaderCheck}
                                            onChange={(e) => handleChangeAceptarHeader(e.target.checked)}
                                        />
                                        {key}
                                    </div>

                                </>

                                :
                                key
                            }   </th>
                    })

                }

                <th>Accion</th>

            </tr>

        </thead>

    )
}
