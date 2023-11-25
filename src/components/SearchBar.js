import "./SearchBar.css"
import { Search } from "semantic-ui-react"

function SearchBar ({ handleSubmit, handleChange, searchString, results }) {
  return (
        <div>
           <Search
                placeholder="Search"
                onSearchChange={handleChange}
                onKeyDown={handleSubmit}
                value={searchString}
                onResultSelect={() => {}}
                results={results}
                showNoResults={false}
                noResultsDescription={"/////"}
            />
        </div>
        
  )
}

export default SearchBar