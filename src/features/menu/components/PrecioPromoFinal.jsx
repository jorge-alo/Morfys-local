
export const PrecioPromoFinal = (
    {
        productMode,
        valueInput,
        handleChange
    }
) => {
    return (
        <>
            {(productMode === 'simple' || productMode === 'addons' || productMode === 'selection') && (
                <div className='form__item'>
                    <label>{productMode === 'selection' ? 'Precio de la Promo' : 'Precio Final'}</label>
                    <input type="number" name="price" value={valueInput.price} onChange={handleChange} />
                </div>
            )}
        </>
    )
}
