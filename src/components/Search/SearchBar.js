import "./SearchBar.css"
import "semantic-ui-css/semantic.min.css";
import { Dropdown, Icon } from "semantic-ui-react";
import { useState } from "react";

function SearchBar ({ handleSubmit, handleChange, searchString, handleClear, handleFilter, filters }) {
    const [selectedFilter, setSelectedFilter] = useState(filters[0].value);

    const handleFilterChange = (event, data) => {
        setSelectedFilter(event.target.value)
        handleFilter(data.value)
    }
    
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
                <button className="ui button search" onClick={handleSubmit}>
                    <Icon name="search" text="Search" />
                </button>
                <button className="ui button clear" onClick={handleClear}>
                    <Icon name="remove circle" text="Clear" />
                </button>
                <Dropdown className="ui button dropdown"
                    selection
                    options={filters}
                    value={selectedFilter}
                    onChange={handleFilterChange}
                    header="CONTENT SELECTION"

                >
                </Dropdown>
            </div>
        </div>
        
  )
}

export default SearchBar
