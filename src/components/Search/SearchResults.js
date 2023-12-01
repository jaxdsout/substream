import "./SearchResults.css"
import Result from "./Result"
import { Fragment } from "react";

function SearchResults({ results, onResultClick }) {
  console.log(results.length)

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

export default SearchResults;