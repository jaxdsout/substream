import "./SearchResults.css"
import Result from "./Result"
import { Fragment } from "react";

function SearchResults({ results, onResultClick, lastSearchString }) {
  return (
    <div className="results">
        <Fragment>
        {Object.keys(results).map((key, index) => (
          <Fragment key={index}>
            {results[key].map((result, resultIndex) => (
              <Result key={resultIndex} result={result} onResultClick={onResultClick} />
            ))}
          </Fragment>
        ))}
        </Fragment>
    </div>
  );
}

export default SearchResults;