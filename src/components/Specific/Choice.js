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
        append: `&append_to_response=sources`
    }

    useEffect(() => {
        const url = `${searchOptions.url}${id}/details/?apiKey=${searchOptions.key}${searchOptions.append}`;
        axios
            .get(url)
            .then((res) => {
                setResultDetails(res.data);
            })
            .catch((error) => {
                console.error(error);
            })
    }, [id, searchOptions.key])

    if (!resultDetails) {
        return (
            <div>
                <Button loading secondary>
                    Loading
                </Button>            
            </div>
        )
    }
    


    return (
        <div>
                <div className="backBox">
                    <Button icon onClick={handleBack}>
                        <Icon name='fast backward' /> 
                        <span> RESULTS </span>
                    </Button>
                </div>
                <div classname="description">
                    <img className="poster" src={resultDetails.poster} alt={resultDetails.title} />
                    <h3> {resultDetails.title}</h3> 
                    <p>{resultDetails.us_rating}</p>
                    <p> Release Date: {resultDetails.release_date} </p>
                    <p> Genre(s): {resultDetails.genre_names.map((genre) => (
                        <span>{genre}, </span>  
                        ))}
                    </p>
                </div>
                <Sources resultDetails={resultDetails}/>
                <Reviews resultDetails={resultDetails}/>
       
        </div>
    )
}

export default Choice