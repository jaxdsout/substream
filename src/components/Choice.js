import { Icon } from "semantic-ui-react"
import Sources from "./Sources"
import Reviews from "./Reviews"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

function Choice ({handleBack, choice, getChoice}) {
    const { id } = useParams();

    useEffect(() => {
        if (!choice) {
            console.log(id)
            getChoice(id)
            console.log("getting choice")
        }
    }, [choice, id, getChoice])
    
    return (
        <div className="min-w-[349px] max-w-[350px] md:min-w-[599px] md:max-w-[600px] min-h-[250px] flex flex-col items-center justify-center mt-8 bg-[#e0e1e2] p-5 rounded-lg">
            <div className="flex flex-col items-center md:items-start justify-center md:flex-row">
                <div>
                    <img className="mr-0 md:mr-3 rounded-md drop-shadow-md mb-5 md:mb-0" src={choice?.poster} alt={choice?.title} />
                </div>
                <div className="flex flex-col items-start justify-center ml-5 drop-shadow-sm shadow-inner">
                    <div className="bg-[#49494a]/50 rounded-lg p-3 text-white w-full">
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
                    <div className="w-full flex flex-col mt-5 mb-5 bg-[#49494a]/25 rounded-lg p-3 text-white shadow-inner drop-shadow-sm">
                        <Sources choice={choice}/>
                        <Reviews choice={choice}/>
                    </div>
                    <button icon onClick={handleBack}  className="bg-[#49494a] text-white hover:bg-[#e0e1e2] hover:text-black backButton font-semibold p-3 rounded-lg drop-shadow-md shadow-inner">
                        <Icon name='fast backward' /> 
                        <span> Back to Results </span>
                    </button>
                </div>
            </div> 
        </div> 
    )
}

export default Choice