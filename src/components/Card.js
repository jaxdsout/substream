import React from 'react'
import { useNavigate } from 'react-router-dom';
import { load_choice } from '../store/actions/search';
import { connect } from 'react-redux';

function Card({ result, region, load_choice, isLoaded }) {
    const navigate = useNavigate();

    if (result.image_url === 'https://cdn.watchmode.com/posters/blank.gif') {
        return null;
    } 

    const posterLarge = result.image_url.replace('w185', 'w780');

    const handleResultClick = async (result) => {
        await load_choice(result.id, region);
        navigate(`/detail/${result.id}`);
    }

    return (
        <div className="relative thumbnail">
            <img 
            className="drop-shadow-md rounded-md cursor-pointer w-full" 
            src={posterLarge} 
            alt={result.name} 
            onClick={() => handleResultClick(result)} 
            />
            <div className="bg-black/70 absolute bottom-0 left-0 w-full rounded-bl-md rounded-br-md px-4 py-1">
            <p className='text-xs text-center font-bold text-[#ededed] w-full'>
                {result.name.length > 36 ? result.name.substring(0, 33) + '...' : result.name}
            </p>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isLoaded: state.isLoaded
})
 
export default connect(mapStateToProps, { load_choice })(Card);
