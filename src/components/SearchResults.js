import { useParams } from "react-router-dom";
import { useEffect } from "react";

function SearchResults({ results, onResultClick, searchString, getMovies }) {
  const { id } = useParams();
  
  const handleClick = (result) => {
    onResultClick(result);
  };

   useEffect(() => {
          if (!results) {
              console.log(id)
              getMovies(id)
              console.log("getting movies again")
          }
      }, [results, id, getMovies])

  return (
    <>
      {results?.length > 0 ? (
        <div className="min-w-[349px] max-w-[350px] md:max-w-[600px] min-h-[250px] max-h-[900px] md:max-h-[500px] mt-5 mb-10 bg-[#e0e1e2] p-3 rounded-lg grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 overflow-y-scroll">
          {results.map((result, index) => (
            result.image_url !== "https://cdn.watchmode.com/posters/blank.gif" ? (
              <div className="p-2 mt-1">
                <img className="thumbnail drop-shadow-md rounded-md cursor-pointer" src={result.image_url} alt={result.name} onClick={() => handleClick(result)} />
                <p className='text-xs text-center mt-2 font-bold'>
                    {result.name.length > 40 ? result.name.substring(0, 37) + '...' : result.name}
                </p>
              </div>
            ) : (
              <>
              </>
            )
          ))}          
        </div>
      ) : (
        <div className="w-1/2 max-w-[600px] flex flex-row items-center justify-center mt-8 bg-[#e0e1e2] p-3 rounded-lg">
          <p>No results for that query</p>
        </div>
      )}
    </> 
  );
}

export default SearchResults;