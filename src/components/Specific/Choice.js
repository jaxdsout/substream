import { Fragment, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Button, Icon } from "semantic-ui-react"
import axios from "axios"
import "./Choice.css"
import Sources from "./Sources"
import Reviews from "./Reviews"


function Choice ({handleBack}) {
    const { id } = useParams()
    const [resultDetails, setResultDetails] = useState(null)

    const searchOptions = {
        key: process.env.REACT_APP_KEY,
        url: `https://api.watchmode.com/v1/title/`,
    }

    useEffect(() => {
        const url = `${searchOptions.url}${id}/details/?apiKey=${searchOptions.key}&append_to_response=sources`;
        axios
            .get(url)
            .then((res) => {
                setResultDetails(res.data);
            })
            .catch((error) => {
                console.error(error);
            })
    }, [id, searchOptions.key, searchOptions.url])
    
    if (!resultDetails) {
        return (
            <Fragment>
                <Button className="loading" loading secondary>
                    Loading
                </Button>            
            </Fragment>
        )
    }
    
    return (
        <div className="choice">
            <Button 
                icon onClick={handleBack}
                className="backButton"
            >
                <Icon name='fast backward' /> 
                <span> RESULTS </span>
            </Button>

            <div className="description">
                <img className="poster" src={resultDetails.poster} alt={resultDetails.title} />
                <div className="info">
                    <h3> {resultDetails.title}</h3> 
                    <p>{resultDetails.us_rating}</p>
                    <p> <b>Release Date:</b> {resultDetails.release_date} </p>
                    <p> <b>Genre:</b>{' '}
                        {resultDetails.genre_names.map((genre, index) => (
                            <span key={index}>
                                {index === 0 ? '' : ', '}{genre}
                            </span>
                        ))}
                    </p>
            
                </div>
            </div>
            
            <div className="buttons">
                <h3>SOURCES:</h3>
                <Sources resultDetails={resultDetails}/>
                <h3>REVIEWS:</h3>
                <Reviews resultDetails={resultDetails}/>
            </div>
        </div>
    )
}

export default Choice