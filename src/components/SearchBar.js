import { useState } from "react";


function SearchBar ({ handleSubmit, handleChange, searchString, handleClear, handleFilter, filters }) {
    
    const [selectedFilter, setSelectedFilter] = useState(filters[0].value);
    
    const handleFilterChange = (event, data) => {
        setSelectedFilter(event.target.value)
        handleFilter(data.value)
    }
    
    return (
           <div className="input-group">
                <input 
                    type="search"
                    placeholder="search..."
                    onChange={handleChange}
                    onKeyDown={handleSubmit}
                    value={searchString}
                    className="form-control input"
                    spellCheck
                />
                <button className="btn btn-outline-secondary" onClick={handleSubmit}>
                    <i class="bi-search"></i>               
                </button>
                <button className="btn btn-outline-secondary" onClick={handleClear}>
                    <i class="bi-eraser-fill"></i>
                </button>
                <div className="dropdown">
                    <button
                        className="btn btn-outline-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <i class="bi bi-filter"></i>
                    </button>
                    <ul className="dropdown-menu">
                        {filters.map((filter, index) => (
                            <li key={index}>
                                <a
                                    className="dropdown-item"
                                    href="/"
                                    onClick={() => handleFilterChange(filter)}
                                >
                                    {filter.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>


                {/* <Dropdown className=""
                    options={filters}
                    value={selectedFilter}
                    onChange={handleFilterChange}
                    header="CONTENT SELECTION"
                >
                </Dropdown> */}
            </div>

            
  )
}

export default SearchBar
