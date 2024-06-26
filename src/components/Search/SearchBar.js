import "./SearchBar.css"
import "semantic-ui-css/semantic.min.css";
import { useState } from "react";
import { Icon, Dropdown } from "semantic-ui-react";

function SearchBar ({ handleSubmit, handleChange, searchString, handleClear, handleFilter, filters }) {
    
    const [selectedFilter, setSelectedFilter] = useState(filters[0].value);
    
    const handleFilterChange = (event, data) => {
        setSelectedFilter(event.target.value)
        handleFilter(data.value)
    }
    
    return (
           <div className="ui action input buster">
                <input 
                    type="search"
                    placeholder="search..."
                    onChange={handleChange}
                    onKeyDown={handleSubmit}
                    value={searchString}
                    className="searchBox"
                    spellCheck
                />
                <button className="ui button search" onClick={handleSubmit}>
                    <Icon name="search" text="Search" />
                </button>
                <button className="ui button clear" onClick={handleClear}>
                    <Icon name="eraser" text="Clear" />
                </button>
                <Dropdown className="ui button dropdown"
                    options={filters}
                    value={selectedFilter}
                    onChange={handleFilterChange}
                    header="CONTENT SELECTION"
                >
                </Dropdown>
            </div>
  )
}

export default SearchBar
