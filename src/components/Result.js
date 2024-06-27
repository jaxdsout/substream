
function Result ({ result, onResultClick }) {
    const handleClick = () => {
      onResultClick(result);
    };
  
    return (
      <div className="result">
        <img className="thumbnail" 
          src={result.image_url} 
          alt={result.name}
          onClick={handleClick}
        />
        <p className='title'>
            {result.name.length > 34
              ? result.name.substring(0, 30) + '...'
              : result.name}
        </p>
      </div>
    );
}

export default Result