// import "./SearchBar.css"
// import { Search } from "semantic-ui-react"

// function SearchBar ({ handleSubmit, handleChange, searchString, results }) {
//     const handleSelect = (e, data) => {
//         e.preventDefault();
//         handleSubmit();
//     }
  
//     return (
//         <div className="searchBox">
//            <Search 
//                 className="searchBar"
//                 placeholder="Search"
//                 onSearchChange={handleChange}
//                 onKeyDown={handleSubmit}
//                 value={searchString}
//                 results={results}
//                 showNoResults={true}
//                 onResultSelect={handleSelect}
//                 noResultsMessage={null}
//             />
//         </div>
        
//   )
// }

// export default SearchBar


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