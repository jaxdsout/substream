import imdbLogo from "./logos/imdblogo.png"
import letterLogo from "./logos/letterboxdlogo.png"
import { connect } from "react-redux"

function Reviews ({ choice }) {
    let imdbURL = `https://www.imdb.com/title/${choice?.imdb_id}/`
    
    const letterboxd = choice?.title.toLowerCase().replace(/ /g,"-").replace(/[:().!,?'"]/g, '')
    let letterURL = `https://letterboxd.com/film/${letterboxd}/`

    return (
        <>
            <h3 className="text-sm uppercase mb-1">Reviews:</h3>
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

const mapStateToProps = state => ({
    choice: state.choice
})
 
export default connect(mapStateToProps, {  })(Reviews);