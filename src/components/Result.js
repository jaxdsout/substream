import './Result.css'

function Result ({ result, onResultClick }) {
    console.log(result)
    const handleClick = () => {
      onResultClick(result);
    };
  
    return (
      <div className="result" onClick={handleClick}>
        <p className="title">{result.name}</p>
        <img className="thumbnail" src={result.image_url} alt={result.name} />
      </div>
    );
}

export default Result