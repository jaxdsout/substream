import imdbLogo from "./logos/imdblogo.png"
import letterLogo from "./logos/letterboxdlogo.png"

function Reviews ({ choice }) {
    let imdbURL = `https://www.imdb.com/title/${choice?.imdb_id}/`
    
    const letterboxd = choice?.title.toLowerCase().replace(/ /g,"-").replace(/[:().!,?'"]/g, '')
    let letterURL = `https://letterboxd.com/film/${letterboxd}/`

    return (
        <>
            <h3>Reviews:</h3>
            <div className="flex flex-row mb-4">
                <a href={imdbURL} target="_blank" rel="noopener noreferrer">
                    <img
                        className="h-20 w-20 sourceLogo rounded-lg m-0.5"
                        src={imdbLogo}
                        alt={`IMDB Logo`}
                    />
                </a>
                {choice?.type === "movie" && (
                    <a href={letterURL} target="_blank" rel="noopener noreferrer">
                        <img
                            className="h-20 w-20 sourceLogo rounded-lg m-0.5"
                            src={letterLogo}
                            alt={`Letterbox'd Logo`}
                        />
                    </a>
                )}   
            </div>
             
        </>
    )
}

export default Reviews