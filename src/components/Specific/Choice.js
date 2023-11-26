import { Fragment, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import "./Choice.css"


import MaxLogo from "../logos/maxlogo.png"
import NetflixLogo from "../logos/netflixlogo.png"
import HuluLogo from "../logos/hululogo.png"
import imdbLogo from "../logos/imdblogo.png"
import letterLogo from "../logos/letterboxdlogo.png"


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


    function filterUniqueSources(sources) {
        const subSources = [];
        const sourceNames = new Set();
    
        for (const source of sources) {
          const { name, type } = source;
          const sourceKey = `${name}-${type}`;
    
          if (type==="sub" && !sourceNames.has(sourceKey)) {
            subSources.push(source)
            sourceNames.add(sourceKey);
          }
        }

        return subSources;
    }

    if (!resultDetails) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    
    const sources = filterUniqueSources(resultDetails.sources);

    console.log(resultDetails)
    console.log(sources)


    function getLogo(name) {        
        switch (name) {
            case "Max":
                return MaxLogo;
            case "Netflix":
                return NetflixLogo;
            case "Hulu":
                return HuluLogo;
            default:
                return ``;
        }
    }

    let imdbURL = `https://www.imdb.com/title/${resultDetails.imdb_id}/`

    
    const letterboxd = resultDetails.title.toLowerCase().replace(/ /g,"-")
    let letterURL = `https://letterboxd.com/film/${letterboxd}/`


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
                <div className="sources">
                    <h3>Sources:</h3>
                        {sources.map((source, index) => (
                            <Fragment key={index}>
                                <a href={source.web_url} target="_blank" rel="noopener noreferrer">
                                    <img
                                        className="sourceLogo"
                                        src={getLogo(source.name)}
                                        alt={`${source.name} Logo`}
                                    />
                                </a>
                            </Fragment>
                        ))}   
                    <h3>Reviews:</h3>
                    <a href={imdbURL} target="_blank" rel="noopener noreferrer">
                        <img
                            className="sourceLogo"
                            src={imdbLogo}
                            alt={`IMDB Logo`}
                        />
                    </a>
                    <a href={letterURL} target="_blank" rel="noopener noreferrer">
                        <img
                            className="sourceLogo"
                            src={letterLogo}
                            alt={`Letterbox'd Logo`}
                        />
                    </a>
                </div>
       
        </div>
    )
}

export default Choice