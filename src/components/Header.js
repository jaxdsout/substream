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
        <div className="text-center flex flex-col items-center mb-2">
            <h1 
                data-text='SUBSTREAM' 
                className={`logo text-[#a5d294] italic select-none cursor-pointer transition-all transition-discrete duration-300 ease-in-out ${
                location.pathname === '/' ? 'text-[3.3rem] md:text-[6.3rem]' : 'text-4xl'
                }`}
                onClick={handleHeaderClick}
            >
                <span>SUBSTREAM</span>
            </h1>
        </div>
    
    )
}

const mapStateToProps = state => ({
    isLoaded: state.isLoaded,
})
 
export default connect(mapStateToProps, { clear_stream })(Header);
