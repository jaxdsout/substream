import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import { load_choice, auto_search } from "../store/actions/search";

function SearchResults({ results, load_choice, auto_search, filter, region }) {
  const { id } = useParams();
  const navigate = useNavigate();


  const handleResultClick = async (result) => {
    console.log(result.id, region)
    await load_choice(result.id, region);
    navigate(`/detail/${result.id}`);
  }

  useEffect(() => {
    if (!id) {
        navigate("/");
        return;
    }

    if (results.length === 0) {
        console.log(id, filter, region);
        auto_search(id, filter, region);
    }
  }, [id, auto_search, filter, region, results, navigate]); 
  
  return (
    <>             
      {results.length > 0 ? (
        <div className="bg-[#3b383f] bg-opacity-70 p-4 mt-10 mb-10 rounded-lg shadow-inner drop-shadow-md results-scrollbar grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 overflow-y-scroll drop-shadow-md min-w-[349px] max-w-[350px] min-h-[250px] max-h-[900px] md:max-h-[500px] md:max-w-[600px] md:min-w-[599px] border-t-8 border-b-8 border-[#3b383f] border-opacity-70">
          {results.map((result, index) => (
            <>
              {result.image_url === 'https://cdn.watchmode.com/posters/blank.gif'? (
                <>
                </>
              ) : (
                <div className="p-2 mt-1">
                  <img 
                    className="thumbnail drop-shadow-md rounded-md cursor-pointer" 
                    src={result.image_url} 
                    alt={result.name} 
                    onClick={() => handleResultClick(result)} 
                  />
                  <p className='text-xs text-center mt-2 font-bold text-[#ededed]'>
                      {result.name.length > 40 ? result.name.substring(0, 37) + '...' : result.name}
                  </p>
                </div>
              ) }
            </>
          ))}          
        </div>
      ) : (
        <div className="w-full text-[#ededed] text-center p-5 text-sm text-nowrap flex flex-col items-center bg-[#3b383f] bg-opacity-70 rounded-lg drop-shadow-md mt-10 mb-10 p-3">
          <p>No results for that query</p>
        </div>
      )}
    </> 
  );
}

const mapStateToProps = state => ({
  results: state.results,
  filter: state.filter,
  region: state.region

})

export default connect(mapStateToProps, { load_choice, auto_search })(SearchResults);