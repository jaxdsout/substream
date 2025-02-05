import { useState } from "react";
import { Icon, Dropdown, Button } from "semantic-ui-react";

function SearchBar ({ handleSubmit, handleChange, searchString, handleClear, handleFilter, filters, handleHeaderClick }) {
    
    const [selectedFilter, setSelectedFilter] = useState(filters[0].value);
    
    const handleFilterChange = (event, data) => {
        setSelectedFilter(event.target.value)
        handleFilter(data.value)
    }
    
    return (
        <div className='w-1/2 flex flex-col items-center justify-center mt-10'>
            <h1 className='logo text-[#e0e1e2] text-[3.8rem] md:text-[6.7rem] italic select-none cursor-pointer hover:text-white -mb-1' 
                onClick={handleHeaderClick}
            >
                SUBSTREAM
            </h1>
            <div className="max-w-[350px] md:max-w-[600px] flex flex-row items-center justify-center bg-[#e0e1e2] p-4 rounded-lg">
                <input 
                    type="search"
                    placeholder="search..."
                    onChange={handleChange}
                    onKeyDown={handleSubmit}
                    value={searchString}
                    className="h-[40px] w-[300px] rounded-md mr-1 indent-3"
                    spellCheck
                />
                <Button onClick={handleSubmit} className="h-[40px]">
                    <Icon name="search" text="Search" className="!-mr-0"/>
                </Button>
                <Button onClick={handleClear} className="h-[40px]">
                    <Icon name="undo" text="Undo" className="!-mr-0"/>
                </Button>
                <Dropdown 
                    className="h-[40px] w-[150px] text-white bg-[#49494a] font-semibold !flex !items-center !justify-center rounded text-nowrap text-xs md:text-base"
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
