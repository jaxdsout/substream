import "./SearchResults.css"
import Result from "./Result"
import { Fragment } from "react";
import { Button } from "semantic-ui-react";

function SearchResults({ results, onResultClick }) {
  console.log(results.length)

  if (!results) {
    return (
        <Fragment>
            <Button className="loading" loading secondary>
                Loading
            </Button>            
        </Fragment>
    )
  }

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