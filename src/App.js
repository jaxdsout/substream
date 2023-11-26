import { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';

import './App.css';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import SearchResults from './components/SearchResults';
import Choice from './components/Choice';

function App () {
    const [searchString, setSearchString] = useState('')
    const [results, setResults] = useState({})

    const navigate = useNavigate()
    const key = process.env.REACT_APP_KEY
    

    function handleSearch (event) {
      setSearchString(event.target.value)
    }

    function handleSubmit (event) { 
      if (event.key === 'Enter') {
        getMovie(searchString)
      }
    }

    function handleResultClick(result) {
      console.log(`result clicked ${result.name}`)
      navigate(`/${result.id}`)
    }

    function handleHeaderClick(event) {
      event.preventDefault()
      navigate("/")
    }


    useEffect(() => {
    }, [])
  
    function getMovie (searchString) {
      const encodedSearchString = encodeURIComponent(searchString);
      const url = `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${key}&search_value=${encodedSearchString}&search_type=2`;
      axios.get(url)
        .then((res) => {
          console.log(res.data)
          setResults(res.data)
          navigate("/results")
        })
        .catch((error) => {
          console.error(error)
        })
      }

      ;

    return (
       <div className='mainBox'>
          <div className='top'>
             <Header onClick={handleHeaderClick}/>  
             <SearchBar 
                handleChange={handleSearch}
                handleSubmit={handleSubmit}
                searchString={searchString}
                results={results}
                />
          </div>
          <div className='bottom'>
              <Routes>
                <Route path="/" element={ <Navigate to="/" /> } />
                <Route path="/results" element={
                  <SearchResults
                    results={results}
                    onResultClick={handleResultClick}
                  />
                }/>
                <Route path="/:id" element={
                  <Choice />
                }/>
              </Routes>
          </div>
       </div>
    )
}

export default App