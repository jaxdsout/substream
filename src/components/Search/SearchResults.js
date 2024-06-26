import "./SearchResults.css"
import Result from "./Result"
import { Fragment } from "react";

function SearchResults({ results, onResultClick }) {

    return (
      <div className="results">
        <Fragment>
          {results.map((result, index) => (
              result.image_url !== "https://cdn.watchmode.com/posters/blank.gif" ? (
                <Result key={index} result={result} onResultClick={onResultClick} />
              ) : null
              ))}
        </Fragment>
      </div>
    )
}

export default SearchResults;