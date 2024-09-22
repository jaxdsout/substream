import { Button, Icon } from "semantic-ui-react"
import Sources from "./Sources"
import Reviews from "./Reviews"
import { Fragment } from "react"

function Choice ({handleBack, choice}) {

    return (
        <Fragment> 
        <div className="choice">
            <div className="tiered">
                <img className="poster" src={choice.poster} alt={choice.title} />
                <div className="description">
                    <h3 className="smallTitle"> {choice.title}</h3> 
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
                <div className="buttons">
                    <h3>SOURCES:</h3>
                    <Sources choice={choice}/>
                </div>
                <div className="buttons">
                    <h3>REVIEWS:</h3>
                    <Reviews choice={choice}/>
                </div> 
            </div> 
            <div className="backButtonBox">
                <Button icon onClick={handleBack}  className="backButton">
                    <Icon name='fast backward' /> 
                    <span> BACK TO RESULTS </span>
                </Button>
            </div>
        </div> 
        </Fragment>
    )
}

export default Choice