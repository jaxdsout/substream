import Sources from "./Sources"
import Reviews from "./Reviews"
import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { back_to_results, load_choice } from "../store/actions/search"
import { connect } from "react-redux"


function Choice ({back_to_results, load_choice, choice, searchString, region}) {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleBack = async () => {
        if (!searchString) {
            navigate("/");
        } else {
            await back_to_results();
            navigate(`/search/${searchString}`)
        }
    }

    useEffect(() => {
        if (!choice) {
            load_choice(id, region);
        }

        if (!id) {
            navigate("/");
        }

    }, [choice, id, load_choice, region, navigate]);
    
    return (
        <div className="flex flex-col items-center justify-center drop-shadow-md min-w-[349px] max-w-[350px] md:max-w-[600px] md:min-w-[599px] mt-10 mb-10 p-3 bg-[#e0e1e2] rounded-lg border-t-8 border-b-8 border-[#e0e1e2]">
            <div className="flex flex-col items-center md:items-start justify-center  md:flex-row">
                
                <img className="mr-0 md:mr-3 rounded-md drop-shadow-md mb-5 md:mb-0 shadow-inner" src={choice?.poster} alt={choice?.title} />
                
                <div className="bg-[#49494a] flex flex-col items-start justify-center ml-0 md:ml-5 drop-shadow-md shadow-inner rounded-lg">
                    <div className="w-full flex flex-col items-center p-5 text-white ">
                        <h3 className="text-base text-wrap w-[200px] text-center drop-shadow-sm"> {choice?.title.toUpperCase()}</h3>
                        <div className="flex flex-col items-start justify-center text-xs">
                            <p className="drop-shadow-sm"><b>Rating:</b> {choice?.us_rating}</p>
                            <p className="drop-shadow-sm"> <b>Release Date:</b> {choice?.release_date} </p>
                            <p className="drop-shadow-sm"> <b>Genre:</b>
                                {choice?.genre_names?.map((genre, index) => (
                                    <span key={index}>
                                        {index === 0 ? ' ' : ', '}{genre}
                                    </span>
                                ))}
                            </p>
                        </div> 
                    
                        <div className="w-full flex flex-col items-start justify-center mt-5 mb-5 bg-black/5 p-3 rounded-md shadow-inner">
                            <Sources />
                            <Reviews />
                        </div>

                        <button 
                            onClick={handleBack}  
                            className="flex flex-row justify-center items-center bg-[#6c6b71] text-white hover:bg-[#e0e1e2] hover:text-[#49494a] backButton font-semibold p-3 rounded-lg shadow-inner drop-shadow-md"
                        >
                            <i className='fast backward icon'></i> 
                            <span className="text-xs mt-0.5"> BACK </span>
                        </button>
                    </div>
                </div>

            </div> 
        </div> 
    )
}

const mapStateToProps = state => ({
    choice: state.choice,
    searchString: state.searchString,
    region: state.region
})
 
 export default connect(mapStateToProps, { back_to_results, load_choice })(Choice);