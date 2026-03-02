
export const ComidaData = (
    {
        valueInput,
        handleChange,
        imageFile
    }
) => {

    return (
        <>
            <div className='form__item'>
                <label>Nombre del producto</label>
                <input type="text" name="name" value={valueInput.name} onChange={handleChange} />
            </div>

            <div className='form__item'>
                <label>Descripción</label>
                <input type="text" name="description" value={valueInput.description} onChange={handleChange} />
            </div>

            <div className='form__item'>
                <label htmlFor="image">Imagen</label>
                <label htmlFor="image" className="agregararchivo">{imageFile ? imageFile.name : (valueInput.image || "cargar imagen")}</label>
                <input type="file" name="image" id="image" className="file" onChange={handleChange} />
            </div>

            <div className='form__item'>
                <label htmlFor="categoria">Categoria</label>
                <input type="text" name="categoria" id="categoria" value={valueInput.categoria} onChange={handleChange} />
            </div>
        </>
    )
}
