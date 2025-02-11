import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { clear_search } from "../store/actions/search";

function Header ({ clear_search }) {
    const navigate = useNavigate();
    
    function handleHeaderClick() {
        clear_search();
        navigate("/");
    }

    return (
        <>
            <h1 
                data-text='SUBSTREAM'
                className='glitchy logo text-[#a5d294] text-[3.8rem] md:text-[6.7rem] italic select-none cursor-pointer -mb-1' 
                onClick={handleHeaderClick}
            >
                <span>SUBSTREAM</span>
            </h1>
        </>
    )
}

const mapStateToProps = state => ({

})
 
export default connect(mapStateToProps, { clear_search })(Header);
