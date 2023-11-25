import "./SearchBar.css"
import { SearchIcon } from '../shared/AppIcons'

function SearchBar ({ handleSubmit, handleChange, searchString }) {
  return (
        <div>
            <form
                className="form-horizontal"
                onSubmit={handleSubmit}>
                    <input 
                        placeholder="Search" 
                        type="search" 
                        name="searchString" 
                        required
                        onChange={handleChange}
                        value={searchString} />
                    <button type="submit">
                        <SearchIcon height='1rem' width='1rem' />
                    </button>
            </form>
        </div>
        
  )
}

export default SearchBar