import logos from "../constants/logos"
import { connect } from "react-redux"

function Reviews ({ choice }) {
    let imdbURL = `https://www.imdb.com/title/${choice?.imdb_id}/`
    
    const letterboxd = choice?.title.toLowerCase().replace(/ /g,"-").replace(/[:().!,?'"]/g, '')
    let letterURL = `https://letterboxd.com/film/${letterboxd}/`

    return (
        <div className="flex flex-row items-center justify-center mb-4 mt-4">
            <a href={imdbURL} target="_blank" rel="noopener noreferrer">
                <img
                    className="h-12 w-12 sourceLogo rounded-lg m-0.5"
                    src={logos.imdbLogo}
                    alt={`IMDB Logo`}
                />
            </a>
            {choice?.type === "movie" && (
                <a href={letterURL} target="_blank" rel="noopener noreferrer">
                    <img
                        className="h-12 w-12 sourceLogo rounded-lg m-0.5"
                        src={logos.letterLogo}
                        alt={`Letterbox'd Logo`}
                    />
                </a>
            )}   
        </div>
    )
}

const mapStateToProps = state => ({
    choice: state.choice
})
 
export default connect(mapStateToProps, {  })(Reviews);