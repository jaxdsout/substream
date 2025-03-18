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
        // <h1 data-text='SUBSTREAM' className='logo text-[#a5d294] text-[3.8rem] md:text-[6.7rem] italic select-none cursor-pointer -mb-1' 
        //     onClick={handleHeaderClick}
        // >
        //     <span>SUBSTREAM</span>
        // </h1>
        <h1 className="logo text-[#a5d294] !text-[10rem] md:text-[6.7rem] italic select-none cursor-pointer -mb-1">S</h1>
    )
}

const mapStateToProps = state => ({
    isLoaded: state.isLoaded
})
 
export default connect(mapStateToProps, { clear_stream })(Header);
