import "./SearchResults.css"
import Result from "./Result"
import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SearchResults({ results, onResultClick }) {
  const navigate = useNavigate()
  console.log(results.length)

  useEffect(() => {
    if (!results) {
      navigate('/substreams/');
    }
  }, [results, navigate]);

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