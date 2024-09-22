import Sources from "./Sources"
import Reviews from "./Reviews"
import { Fragment } from "react"

function Choice ({handleBack, choice}) {

    return (
        <Fragment> 
        <div className="choice mt-3 p-3 d-flex flex-column">
            <div className="backButtonBox">
                <button icon onClick={handleBack}  className="backButton">
                <i class="bi bi-skip-backward-btn-fill"></i>
                <span> BACK TO RESULTS </span>
                </button>
            </div>
            <div className="d-flex flex-row align-items-baseline">
                <img className="poster" src={choice.poster} alt={choice.title} />
                <div className="text-wrap p-3 align-items-baseline">
                    <h3 className="small_h3 text-wrap"> {choice.title}</h3> 
                    <p>{choice.us_rating}</p>
                    <p> <b>Release Date:</b> {choice.release_date} </p>
                    <p> <b>Genre:</b>{' '}
                        {choice.genre_names.map((genre, index) => (
                            <span key={index}>
                                {index === 0 ? '' : ', '}{genre}
                            </span>
                        ))}
                    </p>
                </div>
                <div className="ps-2 pe-2">
                    <h3 className="small_h3 text-center">SOURCES:</h3>
                    <Sources choice={choice}/>
                </div>
                <div className="ps-2 pe-2">
                    <h3 className="small_h3 text-center">REVIEWS:</h3>
                    <Reviews choice={choice}/>
                </div> 
            </div> 
        </div> 
        </Fragment>
    )
}

export default Choice