import './App.css';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import SearchResults from './components/SearchResults';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App () {
    const [searchString, setSearchString] = useState('')
    const [results, setResults] = useState([])
    const key = process.env.REACT_APP_KEY
    
    function handleSearch (event) {
      setSearchString(event.target.value)
    }

    function handleSubmit (event) { 
      event.preventDefault();
      getMovie(searchString);
    }

    useEffect(() => {
      getMovie(searchString);
    }, [])
  
    function getMovie (searchString) {
      const url = `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${key}&search_value=${searchString}&search_type=2`;
      axios.get(url)
        .then((res) => {
          console.log(res.data)
          setResults(res.data)
          console.log(results)
        })
        .catch((error) => {
          console.error(error)
        })
      }

      ;

    return (
       <div>
            <div className='top'>
                <Header />
                <SearchBar 
                  handleChange={handleSearch}
                  handleSubmit={handleSubmit}
                  searchString={searchString}
                  />
            </div>
            <div className='bottom'>
                <SearchResults
                  results={results}
                  />
            </div>

       </div>
    )
}

export default App