import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Route, Routes, useNavigate, Navigate, useParams } from 'react-router-dom';
import './App.css';

import SearchBar from './components/Search/SearchBar';
import Header from './components/Header';
import SearchResults from './components/Search/SearchResults';
import Choice from './components/Specific/Choice';

function App () {
    const [searchString, setSearchString] = useState('')
    const [lastSearchString, setLastSearchString] = useState('')
    const [results, setResults] = useState({})
    const [filters, setFilters] = useState('2')
    const navigate = useNavigate()

    function handleSearch (event) {
      setSearchString(event.target.value)
    }

    function handleClear (event) {
      event.preventDefault();
      setSearchString('')
    }

    function handleFilter (filter) {
      setFilters(filter)
    }

    function handleResultClick(result) {
      navigate(`/substream/${result.id}`)
    }

    function handleHeaderClick(event) {
      event.preventDefault()
      setSearchString('')
      setLastSearchString('')
      navigate("/substream")
    }

    function handleBack (event) {
      const userSearch = encodeURIComponent(searchString)
      event.preventDefault();
      navigate(`/substream/results/${userSearch}`)
    }

    const filterOptions = [
      {key: '2', text: 'TV & Movies', value: '2'},
      {key: '3', text: 'Movies', value: '3'},
      {key: '4', text: 'TV', value: '4'},
    ]

    const searchOptions = {
      key: process.env.REACT_APP_KEY,
      filter: filters,
      url: `https://api.watchmode.com/v1/autocomplete-search/?`
    }

    const getMovie = useCallback(
      (searchString) => {
      const userSearch = encodeURIComponent(searchString)
      const url = `${searchOptions.url}apiKey=${searchOptions.key}&search_value=${userSearch}&search_type=${searchOptions.filter}`;
      axios.get(url)
        .then((res) => {
          setResults(res.data.results)
          navigate(`/substream/results/${userSearch}`);
        })
        .catch((error) => {
          console.error(error)
        })
      },
      [searchOptions.key, searchOptions.filter]
    )

    function handleSubmit (event) { 
      if (event.key === 'Enter' || event.type === 'click') {
        getMovie(searchString)
        setLastSearchString(searchString)
      }
    }


    return (
       <div className='mainBox'>
          <div className='top'>
             <Header 
              onClick={handleHeaderClick}
              />  
             <SearchBar 
                handleChange={handleSearch}
                handleSubmit={handleSubmit}
                searchString={searchString}
                handleClear={handleClear}
                handleFilter={handleFilter}
                filters={filterOptions}
                />
              <div className='middle'>
              <Routes>
                <Route path="/" element={ <Navigate to="/substream" /> } />
                <Route path="/substream/results/:userSearch" element={
                  <SearchResults
                    results={results}
                    onResultClick={handleResultClick}
                    lastSearchString={lastSearchString}
                    getMovie={getMovie}
                  />
                }/>
                <Route path="/substream/:id" element={
                  <Choice 
                    handleBack={handleBack}/>
                }/>
              </Routes>
              </div>
          </div>
       </div>
    )
}

export default App