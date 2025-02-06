import Sources from "./Sources"
import Reviews from "./Reviews"
import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

function Choice ({choice, getChoice}) {
    const { id } = useParams();
    const navigate = useNavigate();


    function handleBack (event) {
        localStorage.removeItem('result_id')
        const id = localStorage.getItem('lastSearchString')
        navigate(`/search/${id}`)
    }

    useEffect(() => {
        let extractedId = id;

        if (!extractedId) {
            const parts = window.location.pathname.split("/");
            extractedId = parts[parts.length - 1]; 
        }

        if (!choice && extractedId) {
            getChoice(extractedId);
        }

        if (!extractedId) {
            navigate("/");
        }

    }, [choice, id, getChoice, navigate]);
    
    return (
        <div className="min-w-[349px] max-w-[350px] md:min-w-[599px] md:max-w-[600px] min-h-[250px] flex flex-col items-center justify-center mt-8 bg-[#e0e1e2] p-5 rounded-lg drop-shadow-md shadow-inner">
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
                            <Sources choice={choice}/>
                            <Reviews choice={choice}/>
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

export default Choice