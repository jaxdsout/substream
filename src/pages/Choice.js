import Sources from "../components/Sources"
import Reviews from "../components/Reviews"
import { useEffect, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { load_choice } from "../store/actions/search"
import { connect } from "react-redux"
import { Icon } from "semantic-ui-react"

function Choice ({ load_choice, choice, region}) {
    const { id } = useParams();
    const navigate = useNavigate();
    // const prevChoice = useRef(null)

    useEffect(() => {
        if (!choice && id) {
            console.log("running load choice", id, region)
            load_choice(id, region);
            console.log(choice)
        }

        if (!id) {
            navigate("/");
            return;
        }
    }, [choice, id, load_choice, region, navigate]);
    
    return (
        <div
            className="grid grid-cols-1 mt-7 mb-10 p-4 
            text-[#ededed] bg-[#3b383f] bg-opacity-70 rounded-lg drop-shadow-md border-t-8 border-b-8 border-[#3b383f] border-opacity-0 
            transition-all transition-discrete duration-300 ease-in-out w-11/12 sm:w-full"
        >
            <div className="flex flex-col items-center justify-center ">
                <div className="bg-[#3b383f] p-4 flex flex-col md:flex-row items-center md:items-start justify-center ml-0 md:ml-5 drop-shadow-md shadow-inner rounded-lg mb-5">
                    <img className="select-none pointer-events-none mr-0 md:mr-3 rounded-md drop-shadow-md mb-5 md:mb-0 shadow-inner h-84 w-48" src={choice?.posterLarge} alt={choice?.title} />
                    <div className="w-full flex flex-col items-star px-4 py-2 text-[#ededed] ">
                        <h3 className="text-base text-wrap text-center drop-shadow-sm"> {choice?.title.toUpperCase()}</h3>
                        <div className="flex flex-col items-start justify-center text-xs">
                            <div className="flex flex-row mb-2">
                                <Icon className="star icon"/>
                                <p className="drop-shadow-sm">  {choice?.user_rating} / 10 </p>
                            </div>
                            <p className="drop-shadow-sm"><b>Release Year: </b> {choice?.year} </p>
                            <p className="drop-shadow-sm"><b>Rating:</b> {choice?.rating ? (choice?.us_rating) : "NR"}</p>
                            <p className="drop-shadow-sm"> <b>Runtime: </b> {choice?.runtime_minutes} minutes </p>
                            <p className="drop-shadow-sm"> <b>Genre: </b>
                                {choice?.genre_names?.join(', ')}
                            </p>
                        </div> 
                        <Reviews />
                    </div>
                </div>
                <Sources />
            </div> 
        </div> 
    )
}

const mapStateToProps = state => ({
    choice: state.choice,
    region: state.region
})
 
export default connect(mapStateToProps, { load_choice })(Choice);