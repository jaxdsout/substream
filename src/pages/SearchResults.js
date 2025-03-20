import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import { auto_search } from "../store/actions/search";
import Card from "../components/Card";
import { Loader } from "semantic-ui-react";

function SearchResults({ results, isLoaded, auto_search, filter, region, searchString }) {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
    }

    if (results.length === 0 && id) {
      auto_search(id, filter, region);
    }
  }, [id, auto_search, filter, region, results, navigate]); 

  
  if (results.length > 0 && isLoaded) return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4  p-4 mt-7 mb-10 w-11/12 sm:w-full
      bg-[#3b383f] bg-opacity-70 rounded-lg shadow-inner drop-shadow-md overflow-y-scroll results-scrollbar 
      border-t-8 border-b-8 border-[#3b383f] border-opacity-0 
      transition-all transition-discrete duration-300 ease-in-out"
    >
      {results.map((result) => (
        <Card result={result} />
      ))}          
    </div>
  ) 

  if (results.length < 1 && isLoaded) return (
    <div className="w-full text-[#ededed] text-center p-5 text-sm text-nowrap flex flex-col items-center bg-[#3b383f] bg-opacity-70 rounded-lg drop-shadow-md mt-7 mb-10 p-3 transition-all transition-discrete duration-300 ease-in-out">
      <p>No results for that {searchString} on any {region} platforms.</p>
    </div>
  )

  if (!isLoaded) return (
    <div>
      <Loader active />
    </div>
  )
}

const mapStateToProps = state => ({
  results: state.results,
  filter: state.filter,
  region: state.region,
  searchString: state.searchString,
  isLoaded: state.isLoaded
})

export default connect(mapStateToProps, { auto_search })(SearchResults);