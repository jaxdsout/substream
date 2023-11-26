import './Result.css'

function Result ({ result, onResultClick }) {
    console.log(result)
    const handleClick = () => {
      onResultClick(result);
    };
  
    return (
      result.image_url ? (
        <div className="result">
        <img className="thumbnail" 
          src={result.image_url} 
          alt={result.name}
          onClick={handleClick}
        />
        <p className="title">{result.name}</p>
      </div>
      ) : null
    );
}

export default Result