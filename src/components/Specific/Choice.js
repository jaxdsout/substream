import { Button, Icon } from "semantic-ui-react"
import "./Choice.css"
import Sources from "./Sources"
import Reviews from "./Reviews"

function Choice ({handleBack, choice}) {
    
    if (!choice) {
      return <div>Loading...</div>;
    }

    return (
        <div className="choice">
            <div className="description">
                <img className="poster" src={choice.poster} alt={choice.title} />
                <div className="info">
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
            </div>
            <div className="buttons">
                <h3>SOURCES:</h3>
                <Sources choice={choice}/>
                <h3>REVIEWS:</h3>
                <Reviews choice={choice}/>
                <Button icon onClick={handleBack}  className="backButton">
                    <Icon name='fast backward' /> 
                    <span> BACK TO RESULTS </span>
                </Button>
            </div>
        </div>
    )
}

export default Choice