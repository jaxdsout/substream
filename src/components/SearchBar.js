import { Icon, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { auto_search, reset_choice, change_filter, set_search_string } from "../store/actions/search";
import { useNavigate } from "react-router-dom";

function SearchBar ({ auto_search, filter, change_filter, searchString, region, set_search_string, reset_choice, choice }) {
    const navigate = useNavigate();

    const filters = [
        {key: '2', text: 'TV & Movies', value: 2},
        {key: '3', text: 'Movies', value: 3},
        {key: '4', text: 'TV', value: 4},
    ]
    
    const handleClear = () => {
        set_search_string('');
    }

    const handleSubmit = () => {
        auto_search(searchString, filter, region);
        reset_choice();
        navigate(`/search/${searchString.toLowerCase()}`);
    }

    const handleSearchChange = (e) => {
        set_search_string(e.target.value)
    }

    const handleFilterChange = (e, data) => {
        change_filter(data.value)
    }

    const handleBack = () => {
        if (searchString === '' ) {
            reset_choice();
            navigate("/");
        } else {
            reset_choice();
            navigate(`/search/${searchString}`)
        }
    }
    
    return (
        <div className="w-full flex flex-row items-center justify-center bg-[#3b383f] bg-opacity-70 p-4 rounded-lg shadow-inner drop-shadow-md z-30 transition-all transition-discrete duration-300 ease-in-out">
            {choice?.id ? (
                <button 
                    onClick={handleBack}  
                    className="h-[40px] bg-[#1e1e1e] text-[#8e8e8e] hover:bg-[#a5d294] hover:text-black p-4 rounded-lg mr-1 flex flex-row items-center justify-center"
                >
                    <i className='fast backward icon'></i> 
                    <span className="text-[0.6rem] mt-0.5 font-semibold"> BACK </span>
                </button>
            ) : null}
            <div className="relative flex flex-row items-center justify-center">
                <input 
                    type="search"
                    placeholder="Search..."
                    onChange={handleSearchChange}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    value={searchString}
                    enterKeyHint="search"
                    onDoubleClick={handleClear}
                    className="text-[#a5d294] text-[16px] placeholder-[#a5d294] bg-[#1e1e1e] h-[40px] sm:w-[12rem] md:w-[18rem] rounded-md ml-1 mr-1 indent-3 focus:outline-none focus:ring-2 focus:ring-[#a5d294] focus:ring-inset relative"
                    spellCheck
                />
                { searchString ? (
                    <button onClick={handleClear} className="h-[40px] text-[#8e8e8e] hover:text-[#a5d294] p-2 rounded-lg mr-1 ml-1 absolute right-0 z-30">
                        <Icon name="window close"/>
                    </button>
                ) : null }
           
            </div>
          
            <button onClick={handleSubmit} className="h-[40px] bg-[#1e1e1e] text-[#8e8e8e] hover:bg-[#a5d294] hover:text-black p-2 rounded-lg mr-1 ml-1">
                <Icon name="search" className="!mb-1 !ml-1"/>
            </button>

            <Dropdown 
                className="h-[40px] p-2 text-[#8e8e8e] bg-[#1e1e1e] hover:bg-[#a5d294] hover:text-black font-semibold rounded-lg !inset-shadow ml-1"
                options={filters}
                value={filter}
                icon={null}
                onChange={handleFilterChange}
                direction={"left"}
                header={<p className="text-xs text-[#8e8e8e] p-3 mt-3 pointer-events-none select-none">CONTENT SELECTION</p>}
                trigger={<Icon className="filter !mt-1 !ml-1" />}
            >
            </Dropdown>
        </div>
  )
}

const mapStateToProps = state => ({
   filter: state.filter,
   searchString: state.searchString,
   region: state.region,
   choice: state.choice
})

export default connect(mapStateToProps, { auto_search, change_filter, set_search_string, reset_choice })(SearchBar);