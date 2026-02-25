
export const Banner = ( {fileBanner, handleChange} ) => {
  return (
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
  )
}
