import "./Header.css"
import secondLogo from "../logo 2.png"

function Header ( { onClick }) {
     return (
        <div className='header'>
            {/* <p className='logo' onClick={onClick}>UBISTREAM</p> */}
               <img className='logo' src={secondLogo} alt="logo" onClick={onClick}/>
            <p> <i>Where the f*ck is this content?</i></p>
    </div>
     )
}

export default Header