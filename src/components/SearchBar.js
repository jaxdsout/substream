import "./SearchBar.css"
import { Search } from "semantic-ui-react"

function SearchBar ({ handleSubmit, handleChange, searchString, results }) {
  return (
        <div className="searchBox">
           <Search className="searchBar"
                placeholder="Search"
                onSearchChange={handleChange}
                onKeyDown={handleSubmit}
                value={searchString}
                results={results}
                showNoResults={true}
            />
        </div>
        
  )
}

export default SearchBar