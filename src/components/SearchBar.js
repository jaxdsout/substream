import { Icon, Dropdown, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { auto_search, back_to_results, change_filter, clear_search, set_search_string } from "../store/actions/search";
import { useNavigate } from "react-router-dom";

function SearchBar ({ auto_search, filter, change_filter, searchString, clear_search, region, set_search_string, back_to_results, choice }) {
    const navigate = useNavigate();

    const filters = [
        {key: '2', text: 'TV & Movies', value: 2},
        {key: '3', text: 'Movies', value: 3},
        {key: '4', text: 'TV', value: 4},
    ]
    
    const handleClear = () => {
        clear_search();
    }

    const handleSubmit = async () => {
        await auto_search(searchString, filter, region);
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
            navigate("/");
        } else {
            back_to_results();
            navigate(`/search/${searchString}`)
        }
    }

    console.log(choice)
    
    return (
        <div className="w-full flex flex-row items-center justify-center bg-[#3b383f] bg-opacity-70 p-4 rounded-lg shadow-inner drop-shadow-md">
            {choice === null ? null : (
                <button 
                    onClick={handleBack}  
                    className="h-[40px] bg-[#1e1e1e] text-[#8e8e8e] hover:bg-[#a5d294] hover:text-black p-4 rounded-lg mr-1 flex flex-row items-center justify-center"
                >
                    <i className='fast backward icon'></i> 
                    <span className="text-xs mt-0.5 font-semibold"> BACK </span>
                </button>
            )}
         
            <input 
                type="search"
                placeholder="Search..."
                onChange={handleSearchChange}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                value={searchString}
                onDoubleClick={handleClear}
                className="text-[#8e8e8e] bg-[#1e1e1e] h-[40px] w-[340px] rounded-md mr-1 indent-3 focus:outline-none focus:ring-2 focus:ring-[#a5d294] focus:ring-inset"
                spellCheck
            />
            <button onClick={handleSubmit} className="h-[40px] bg-[#1e1e1e] text-[#8e8e8e] hover:bg-[#a5d294] hover:text-black p-4 rounded-lg mr-1">
                <Icon name="search" text="Search" className="!-mr-0"/>
            </button>
            <Dropdown 
                className="h-[40px] w-[80px] text-[#8e8e8e] bg-[#1e1e1e] hover:bg-[#a5d294] hover:text-black font-semibold rounded-lg text-nowrap p-4 text-[0.6rem] md:text-base !inset-shadow"
                options={filters}
                value={filter}
                onChange={handleFilterChange}
                header={<p className="text-xs text-[#8e8e8e] p-3 pointer-events-none select-none">CONTENT SELECTION</p>}
                trigger={<Icon className="filter " />}
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

export default connect(mapStateToProps, { auto_search, change_filter, clear_search, set_search_string, back_to_results })(SearchBar);