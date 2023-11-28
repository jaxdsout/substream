import "./SearchResults.css"
import Result from "./Result"
import { Fragment } from "react";

function SearchResults({ results, onResultClick, lastSearchString }) {
  return (
    <div>
    <h2> Results for: <span>{lastSearchString}</span></h2>
    <div className="results">
      {Object.keys(results).map((key, index) => (
        <Fragment key={index}>
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