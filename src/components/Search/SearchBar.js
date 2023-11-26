import "./SearchBar.css"
import "semantic-ui-css/semantic.min.css";

function SearchBar ({ handleSubmit, handleChange, searchString }) {
    return (
        <div className="searchBox">
           <div className="ui action input">
                <input 
                    type="text"
                    placeholder="Search..."
                    onChange={handleChange}
                    onKeyDown={handleSubmit}
                    value={searchString}
                />
                <button className="ui button" onClick={handleSubmit}>
                    Search
                </button>
            </div>
        </div>
        
  )
}

export default SearchBar