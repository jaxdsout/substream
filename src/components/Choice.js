import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

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
        const buySources = []
        const sourceNames = new Set();
    
        for (const source of sources) {
          const { name, type } = source;
          const sourceKey = `${name}-${type}`;
    
          if (!sourceNames.has(sourceKey)) {
            if (type === "sub") {
                subSources.push(source)
            } else  {
                buySources.push(source)
            }
            sourceNames.add(sourceKey);
          }
        }

        buySources.sort((a, b) => a.name.localeCompare(b.name))

        const sortedSources = [...subSources, ...buySources]
    
        return sortedSources;
    }

    if (!resultDetails) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    
    const sortedSources = filterUniqueSources(resultDetails.sources);

    return (
        <div>
            <h2> {resultDetails.title}</h2>
            <img src={resultDetails.poster} alt={resultDetails.title} />
            <p> Release Date: {resultDetails.release_date} </p>
            <h3>Sources:</h3>
            {sortedSources.map((source, index) => (
                <div key={index}>
                    <p>{source.name} | {source.type}</p>
                </div>
            ))}
        </div>
    )
}

export default Choice