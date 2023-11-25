import "./Header.css"
import mainLogo from "../logo.png"

function Header ( { onClick }) {
     return (
        <div className='header'>
            {/* <p className='logo' onClick={onClick}>UBISTREAM</p> */}
               <img className='logo' src={mainLogo} alt="logo" onClick={onClick}/>
            <p> <i>Where the f*ck is this content?</i></p>
    </div>
     )
}

export default Header