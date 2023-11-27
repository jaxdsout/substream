import { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';

import './App.css';
import SearchBar from './components/Search/SearchBar';
import Header from './components/Header';
import SearchResults from './components/Search/SearchResults';
import Choice from './components/Specific/Choice';

function App () {
    const [searchString, setSearchString] = useState('')
    const [results, setResults] = useState({})
    const [filters, setFilters] = useState('2')
    const navigate = useNavigate()
    

    const filterOptions = [
      {key: '2', text: 'TV & Movies', value: '2'},
      {key: '3', text: 'Movies', value: '3'},
      {key: '4', text: 'TV', value: '4'},
    ]

    function handleSearch (event) {
      setSearchString(event.target.value)
    }

    function handleClear (event) {
      event.preventDefault();
      setSearchString('')
    }

    function handleResultClick(result) {
      console.log(`result clicked ${result.name}`)
      navigate(`/${result.id}`)
    }

    function handleHeaderClick(event) {
      event.preventDefault()
      setSearchString('')
      navigate("/")
    }

    function handleBack (event) {
      event.preventDefault();
      navigate("/results")
    }

    function handleFilter (filter) {
      setFilters(filter)
    }

    const searchOptions = {
      key: process.env.REACT_APP_KEY,
      filter: filters,
      url: `https://api.watchmode.com/v1/autocomplete-search/?`
    }

    console.log(searchOptions.filter)
    
    function getMovie (searchString) {
      const encodedSearchString = encodeURIComponent(searchString);
      const url = `${searchOptions.url}apiKey=${searchOptions.key}&search_value=${encodedSearchString}&search_type=${searchOptions.filter}`;
      console.log(url)
      axios.get(url)
        .then((res) => {
          setResults(res.data)
          navigate("/results")
        })
        .catch((error) => {
          console.error(error)
        })
      }

    function handleSubmit (event) { 
      if (event.key === 'Enter' || event.type === 'click') {
        getMovie(searchString)
      }
    }

    return (
       <div className='mainBox'>
          <div className='top'>
             <Header onClick={handleHeaderClick}/>  
             <SearchBar 
                handleChange={handleSearch}
                handleSubmit={handleSubmit}
                searchString={searchString}
                handleClear={handleClear}
                handleFilter={handleFilter}
                filters={filterOptions}
                />
          </div>
          <div className='middle'>
              <Routes>
                <Route path="/" element={ <Navigate to="/" /> } />
                <Route path="/results" element={
                  <SearchResults
                    results={results}
                    onResultClick={handleResultClick}
                  />
                }/>
              </Routes>
          </div>
          <div className='bottom'>
              <Routes>
                <Route path="/:id" element={
                  <Choice 
                    handleBack={handleBack}/>
                }/>
              </Routes>
          </div>
       </div>
    )
}

export default App