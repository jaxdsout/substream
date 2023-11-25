import "./SearchResults.css"
function SearchResults ({ results }) {

  return (
    <div className="list">
    {Object.keys(results).map((key, index) => (
      <div className="results" key={index}>
        {results[key].map((item, itemIndex) => (
            <div className="result" key={itemIndex}>
                <p className="title">{item.name}</p>
                <img className="thumbnail" src={item.image_url} alt={item.name} />
            </div>
        ))}
      </div>
    ))}
  </div>
  )
}

export default SearchResults