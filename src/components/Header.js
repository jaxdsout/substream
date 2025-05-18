import { useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { clear_stream } from "../store/actions/search";

function Header ({ clear_stream, isLoaded }) {
    const navigate = useNavigate();
    const location = useLocation();

    function handleHeaderClick() {
        clear_stream();
        navigate("/");
    }

    return (
        <h1 
            data-text='SUBSTREAM' 
            className={`w-full logo text-[#a5d294] italic select-none cursor-pointer transition-all transition-discrete duration-300 ease-in-out text-center pt-10 ${location.pathname === '/' ? 'text-6xl md:text-9xl' : 'text-4xl'}`}
            onClick={handleHeaderClick}
        >
            <span>SUBSTREAM</span>
        </h1>
    
    )
}

const mapStateToProps = state => ({
    isLoaded: state.isLoaded,
})
 
export default connect(mapStateToProps, { clear_stream })(Header);
