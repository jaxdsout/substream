import { Fragment, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import "./Choice.css"
import Sources from "./Sources"
import Reviews from "./Reviews"


function Choice () {
    const { id } = useParams()
    const [resultDetails, setResultDetails] = useState(null)
    const key = process.env.REACT_APP_KEY

    useEffect(() => {
        const url = `https://api.watchmode.com/v1/title/${id}/details/?apiKey=${key}&append_to_response=sources`;
        axios
            .get(url)
            .then((res) => {
                setResultDetails(res.data);
            })
            .catch((error) => {
                console.error(error);
            })
    }, [id, key])

    if (!resultDetails) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    


    return (
        <div className="choiceBox">
                <img className="poster" src={resultDetails.poster} alt={resultDetails.title} />
                <Fragment>
                    <h2> {resultDetails.title}</h2> 
                    <p>{resultDetails.us_rating}</p>
                    <p> Release Date: {resultDetails.release_date} </p>
                    <p> Genre(s): {resultDetails.genre_names.map((genre) => (
                        <span>{genre}, </span>  
                        ))}
                    </p>
                </Fragment>
                <Sources resultDetails={resultDetails}/>
                <Reviews resultDetails={resultDetails}/>
       
        </div>
    )
}

export default Choice