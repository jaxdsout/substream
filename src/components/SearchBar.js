import { Icon, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { auto_search, reset_choice, change_filter, set_search_string, clear_stream } from "../store/actions/search";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"

function SearchBar ({ auto_search, filter, change_filter, searchString, region, set_search_string, reset_choice, choice, isLoaded, clear_stream, results }) {
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
        if (isLoaded && results.length === 0) {
            clear_stream();
            navigate("/");
        }
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
        <>
            <Header />
            <div className="w-11/12 flex flex-row items-center justify-center bg-[#3b383f] bg-opacity-70 p-4 rounded-lg shadow-inner drop-shadow-md z-30 transition-all transition-discrete duration-300 ease-in-out">
                <div className="flex flex-row items-center justify-center">
                    {choice?.id ? (
                    <button
                        onClick={handleBack}
                        className="h-[40px] bg-[#1e1e1e] text-[#8e8e8e] hover:bg-[#a5d294] hover:text-black p-4 rounded-lg mr-1 flex flex-row items-center justify-center"
                    >
                        <i className="fast backward icon"></i>
                        <span className="text-[0.6rem] mt-0.5 font-semibold"> BACK </span>
                    </button>
                    ) : null}

                    <div className="relative flex flex-row items-center w-full mr-1">
                    <input
                        type="search"
                        placeholder="Search..."
                        onChange={handleSearchChange}
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                        value={searchString}
                        enterKeyHint="search"
                        onDoubleClick={handleClear}
                        className="text-[#a5d294] text-[16px] placeholder-[#a5d294] bg-[#1e1e1e] h-[40px] rounded-md indent-3 focus:outline-none focus:ring-2 focus:ring-[#a5d294] focus:ring-inset w-[12rem] md:w-[20rem]"
                        spellCheck
                    />
                    {searchString && (
                        <button
                        onClick={handleClear}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-[30px] w-[30px] text-[#8e8e8e] hover:text-[#a5d294] flex items-center justify-center"
                        >
                        <Icon name="window close" />
                        </button>
                    )}
                    </div>

                    <button
                    onClick={handleSubmit}
                    className="h-[40px] bg-[#1e1e1e] text-[#8e8e8e] hover:bg-[#a5d294] hover:text-black p-2 rounded-lg mr-1 ml-1"
                    >
                    <Icon name="search" className="!mb-1 !ml-1" />
                    </button>

                    <Dropdown
                    className="h-[40px] p-2 text-[#8e8e8e] bg-[#1e1e1e] hover:bg-[#a5d294] hover:text-black font-semibold rounded-lg !inset-shadow ml-1"
                    options={filters}
                    value={filter}
                    icon={null}
                    onChange={handleFilterChange}
                    direction={"left"}
                    header={
                        <p className="text-xs text-[#8e8e8e] p-3 mt-3 pointer-events-none select-none">
                        CONTENT SELECTION
                        </p>
                    }
                    trigger={<Icon className="filter !mt-1 !ml-1" />}
                    />
                </div>
            </div>
        </>
  )
}

const mapStateToProps = state => ({
   filter: state.filter,
   searchString: state.searchString,
   region: state.region,
   choice: state.choice,
   isLoaded: state.isLoaded,
   results: state.results
})

export default connect(mapStateToProps, { auto_search, change_filter, set_search_string, reset_choice, clear_stream })(SearchBar);