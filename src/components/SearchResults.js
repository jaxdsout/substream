import Result from "./Result"
import { Fragment } from "react";

function SearchResults({ results, onResultClick, searchString }) {

    return (
      <Fragment>
        {results.length > 0 ? (
          <>
            <div className="results container mt-4 d-flex flex-column flex-sm-row overflow-x-auto">
              {results.map((result, index) => (
                result.image_url !== "https://cdn.watchmode.com/posters/blank.gif" ? (
                  <Result key={result.id || index} result={result} onResultClick={onResultClick} />
                ) : null
              ))}
            </div>
          </>
        ) : (
          <div className="results noResults">
            <p>No results for that query</p>
          </div>
        )}
      </Fragment>
  );
}

export default SearchResults;