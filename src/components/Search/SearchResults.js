import "./SearchResults.css"
import Result from "./Result"
import { Fragment } from "react";

function SearchResults({ results, onResultClick }) {
  return (
    <div>
    <h2> Results for: </h2>
    <div className="results">
      {Object.keys(results).map((key, index) => (
        <Fragment key={index} className="resultsII">
          {results[key].map((result, resultIndex) => (
            <Result key={resultIndex} result={result} onResultClick={onResultClick} />
          ))}
        </Fragment>
      ))}
    </div>
    </div>
  );
}

export default SearchResults;