import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import { auto_search } from "../store/actions/search";
import Card from "../components/Card";

function SearchResults({ results, isLoaded, auto_search, filter, region, searchString }) {
  const { id } = useParams();

  useEffect(() => {
    if (results.length === 0 && id && !isLoaded) {
      auto_search(id, filter, region);
    }
  }, [id, filter, region, results, isLoaded]); 
  
  if (results.length > 0 && isLoaded) return (
    <div className="w-11/12 bg-[#3b383f] bg-opacity-70 rounded-lg shadow-inner drop-shadow-md border-t-8 border-b-8 border-[#3b383f] border-opacity-0 my-5">
      <div
        className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 overflow-y-scroll results-scrollbar transition-all transition-discrete duration-300 ease-in-out max-h-[50rem]"
      >
        {results.map((result) => (
          <Card result={result} />
        ))}          
      </div>
    </div>
  
  ) 

  if (results.length === 0 && isLoaded) return (
    <div className="bg-[#3b383f] bg-opacity-70 rounded-lg shadow-inner drop-shadow-md border-t-8 border-b-8 border-[#3b383f] border-opacity-0 my-5">
      <div className="text-[#ededed] text-center p-5 text-sm text-nowrap flex flex-col items-center transition-all transition-discrete duration-300 ease-in-out">
        <p>No results for '{searchString}' on any {region} platforms.</p>
      </div>
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