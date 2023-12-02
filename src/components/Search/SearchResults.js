import "./SearchResults.css"
import Result from "./Result"
import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";

function SearchResults({ results, onResultClick, lastSearchString, getMovie }) {
  const { userSearch } = useParams()
  const reloadString = encodeURIComponent(userSearch)

  useEffect(() => {
    if (!lastSearchString) {
      getMovie(reloadString);
    }
  }, [reloadString, lastSearchString])

  if (results && results.length > 0) {
    return (
      <div className="results">
        <Fragment>
          {results.map((result, index) => (
                <Result key={index} result={result} onResultClick={onResultClick} />
              ))}
        </Fragment>
      </div>
    ) 
  }

  return null;
}

export default SearchResults;