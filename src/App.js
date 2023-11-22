import './App.css';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import { useState, useEffect } from 'react';


function App () {
    const [searchString, setSearchString] = useState('')
    
    let country = 'us'

    const options = {
        method: 'GET',
        url: 'https://streaming-availability.p.rapidapi.com/search/title',
        params: {
          title: {searchString},
          country: {country},
          show_type: 'all',
          output_language: 'en'
        },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_MOTN_KEY,
          'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    };

    console.log(options)
      

    //   try {
    //       const response = await axios.request(options);
    //       console.log(response.data);
    //   } catch (error) {
    //       console.error(error);
    //   }

 

    return (
       <div>
            <div className='top'>
                <Header />
                <SearchBar />
            </div>
            <div className='bottom'>

            </div>

       </div>
    )
}

export default App