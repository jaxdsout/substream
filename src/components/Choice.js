import { Icon } from "semantic-ui-react"
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
        <div className="min-w-[349px] max-w-[350px] md:min-w-[599px] md:max-w-[600px] min-h-[250px] flex flex-col items-center justify-center mt-8 bg-[#e0e1e2] p-5 rounded-lg">
            <div className="flex flex-col items-center md:items-start justify-center md:flex-row">
                <div>
                    <img className="mr-0 md:mr-3 rounded-md drop-shadow-md mb-5 md:mb-0" src={choice?.poster} alt={choice?.title} />
                </div>
                <div className="flex flex-col items-start justify-center ml-5 drop-shadow-sm shadow-inner">
                    <div className="bg-[#49494a] rounded-lg p-5 text-white w-full border-2 border-[#000000]/20">
                        <h3 className=""> {choice?.title}</h3> 
                        <p>{choice?.us_rating}</p>
                        <p> <b>Release Date:</b> {choice?.release_date} </p>
                        <p> <b>Genre:</b>
                            {choice?.genre_names?.map((genre, index) => (
                                <span key={index}>
                                    {index === 0 ? ' ' : ', '}{genre}
                                </span>
                            ))}
                        </p>
                    </div>
                    <div className="w-full flex flex-col mt-5 mb-5 bg-[#49494a]/25 rounded-lg p-3 text-white shadow-inner drop-shadow-sm border-2 border-[#49494a]/30">
                        <Sources choice={choice}/>
                        <Reviews choice={choice}/>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full">
                        <button icon onClick={handleBack}  className="bg-[#6c6b71] text-white hover:bg-[#e0e1e2] hover:text-[#49494a] backButton font-semibold p-3 rounded-lg drop-shadow-md">
                            <Icon name='fast backward' /> 
                            <span> BACK </span>
                        </button>
                    </div>
                </div>
            </div> 
        </div> 
    )
}

export default Choice