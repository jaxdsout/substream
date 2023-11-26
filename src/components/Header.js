import "./Header.css"

function Header ( { onClick }) {
     return (
        <div className='header'>
            <h1 className='logo' onClick={onClick}>SUBSTREAM</h1>
               {/* <img className='logo' src={secondLogo} alt="logo" onClick={onClick}/> */}
    </div>
     )
}

export default Header