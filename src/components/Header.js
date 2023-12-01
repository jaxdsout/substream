import "./Header.css"

function Header ( { onClick }) {
     return (
        <div className='header'>
            <h1 className='logo' onClick={onClick}>SUBSTREAM</h1>
    </div>
     )
}

export default Header