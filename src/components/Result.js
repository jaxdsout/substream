
function Result ({ result, onResultClick }) {
    const handleClick = () => {
      onResultClick(result);
    };
  
    return (
      <div className="me-2 ms-2 p-2">
        <img className="thumbnail" 
          src={result.image_url} 
          alt={result.name}
          onClick={handleClick}
        />
        <p className='title mt-2 p-1'>
            {result.name.length > 40
              ? result.name.substring(0, 37) + '...'
              : result.name}
        </p>
      </div>
    );
}

export default Result