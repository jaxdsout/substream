import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { clear_stream } from "../store/actions/search";

function Header ({ clear_stream, isLoaded }) {
    const navigate = useNavigate();
    
    function handleHeaderClick() {

        clear_stream();
        navigate("/");
    }

    return (
        <div className="text-center">
            <h1 data-text='SUBSTREAM' className='logo text-[#a5d294] text-[3.4rem] md:text-[6.4rem] italic select-none cursor-pointer mb-2 sm:mb-0 transition-all transition-discrete duration-300 ease-in-out' 
                    onClick={handleHeaderClick}
                >
                    <span>SUBSTREAM</span>
            </h1>
        </div>
    
    )
}

const mapStateToProps = state => ({
    isLoaded: state.isLoaded
})
 
export default connect(mapStateToProps, { clear_stream })(Header);
