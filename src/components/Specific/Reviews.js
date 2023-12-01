import imdbLogo from "../../logos/imdblogo.png"
import letterLogo from "../../logos/letterboxdlogo.png"
import "./Reviews.css"

function Reviews ({ resultDetails }) {
    let imdbURL = `https://www.imdb.com/title/${resultDetails.imdb_id}/`
    
    const letterboxd = resultDetails.title.toLowerCase().replace(/ /g,"-").replace(/[:().!,?'"]/g, '')
    let letterURL = `https://letterboxd.com/film/${letterboxd}/`

    return (
        <div className="reviews">
            <a href={imdbURL} target="_blank" rel="noopener noreferrer">
                <img
                    className="sourceLogo"
                    src={imdbLogo}
                    alt={`IMDB Logo`}
                />
            </a>
            {resultDetails.type === "movie" && (
                <a href={letterURL} target="_blank" rel="noopener noreferrer">
                    <img
                        className="sourceLogo"
                        src={letterLogo}
                        alt={`Letterbox'd Logo`}
                    />
                </a>
            )}    
        </div>
    )
}

export default Reviews