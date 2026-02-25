
export const Logo = ({fileLogo, handleChange}) => {
  return (
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
  )
}
