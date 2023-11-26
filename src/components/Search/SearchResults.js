import "./SearchResults.css"
import Result from "./Result"
import { Fragment } from "react";

function SearchResults({ results, onResultClick }) {
  console.log(results)
  return (
    <div className="results">
      {Object.keys(results).map((key, index) => (
        <Fragment key={index}>
          {results[key].map((result, resultIndex) => (
            <Result key={resultIndex} result={result} onResultClick={onResultClick} />
          ))}
        </Fragment>
      ))}
    </div>
  );
}

export default SearchResults;