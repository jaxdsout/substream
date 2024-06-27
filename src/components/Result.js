
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
            {result.name.length > 40
              ? result.name.substring(0, 37) + '...'
              : result.name}
        </p>
      </div>
    );
}

export default Result