import "./SearchResults.css"
import Result from "./Result"
import { Fragment, useEffect, Loader } from "react";
import { useParams } from "react-router-dom";

function SearchResults({ results, onResultClick, lastSearchString, getMovie }) {
  const { userSearch } = useParams()
  const reloadString = encodeURIComponent(userSearch)

  useEffect(() => {
    if (!lastSearchString) {
      getMovie(reloadString);
    }
  }, [reloadString, lastSearchString])

  if (!results) {
    return <div className="results">
      <Loader active inline='centered' />
    </div>
  }
  else {
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
}

export default SearchResults;