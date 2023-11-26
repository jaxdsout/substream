import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import "./Choice.css"


import MaxLogo from "../maxlogo.png"
import NetflixLogo from "../netflixlogo.png"


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

    console.log(sources)


    function getLogo(name) {        
        switch (name) {
            case "Max":
                return MaxLogo;
            case "Netflix":
                return NetflixLogo;
            default:
                return ``;
        }
    }

    return (
        <div className="choiceBox">
                <img className="poster" src={resultDetails.poster} alt={resultDetails.title} />
                <h2> {resultDetails.title}</h2>
                <p> Release Date: {resultDetails.release_date} </p>
                <h3>Sources:</h3>
                            {sources.map((source, index) => (
                                <div key={index}>
                                    <a href={source.web_url} target="_blank" rel="noopener noreferrer">
                <img
                    className="sourceLogo"
                    src={getLogo(source.name)}
                    alt={`${source.name} Logo`}
                />
            </a>
                                </div>
                            ))}          
        </div>
    )
}

export default Choice