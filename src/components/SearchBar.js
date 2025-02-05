import { useState } from "react";
import { Icon, Dropdown, Button } from "semantic-ui-react";

function SearchBar ({ handleSubmit, handleChange, searchString, handleClear, handleFilter, filters, handleHeaderClick }) {
    
    const [selectedFilter, setSelectedFilter] = useState(filters[0].value);
    
    const handleFilterChange = (event, data) => {
        setSelectedFilter(event.target.value)
        handleFilter(data.value)
    }
    
    return (
        <div className='min-w-[349px] max-w-[350px] md:max-w-[600px] flex flex-col items-center justify-center mt-10'>
            <h1 className='logo text-[#a5d294] text-[3.8rem] md:text-[6.7rem] italic select-none cursor-pointer hover:text-[#e0e1e2] -mb-1' 
                onClick={handleHeaderClick}
            >
                SUBSTREAM
            </h1>
            <div className="w-full flex flex-row items-center justify-center bg-[#e0e1e2] p-4 rounded-lg">
                <input 
                    type="search"
                    placeholder="search..."
                    onChange={handleChange}
                    onKeyDown={handleSubmit}
                    value={searchString}
                    onDoubleClick={handleClear}
                    className="h-[40px] w-[340px] rounded-md mr-1 indent-3 focus:outline-none focus:ring-2 focus:ring-[#a5d294] focus:ring-inset"
                    spellCheck
                />
                <Button onClick={handleSubmit} className="h-[40px]">
                    <Icon name="search" text="Search" className="!-mr-0"/>
                </Button>
                <Dropdown 
                    className="h-[40px] w-[150px] text-white bg-[#49494a] font-semibold !flex !items-center !justify-center rounded-lg text-nowrap p-2 text-[0.6rem] md:text-base !inset-shadow !border-2"
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
