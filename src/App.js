import { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';

import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Choice from './components/Choice';

function App () {
    const [searchString, setSearchString] = useState('')
    const [results, setResults] = useState(null)    
    const [filters, setFilters] = useState('2')
    const [choice, setChoice] = useState(null);

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
      localStorage.setItem('result_id', result.id);
      setChoice(result)
      getChoice(result.id);
    }

    function handleHeaderClick(event) {
      event.preventDefault()
      setSearchString('')
      localStorage.removeItem('lastSearchString')
      localStorage.removeItem('result_id')
      navigate("/substream")
    }

    function handleBack (event) {
      event.preventDefault();
      localStorage.removeItem('result_id')
      const userSearch = localStorage.getItem('lastSearchString')
      navigate(`/substream/search/${userSearch}`)
    }

    const filterOptions = [
      {key: '2', text: 'TV & Movies', value: '2'},
      {key: '3', text: 'Movies', value: '3'},
      {key: '4', text: 'TV', value: '4'},
    ]

    const searchOptions = {
      key: process.env.REACT_APP_KEY,
      filter: filters,
      url: `https://api.watchmode.com/v1/`,
      region: 'US'
    }

    function getMovies (searchString) {
      const userSearch = encodeURIComponent(searchString);
      const url = `${searchOptions.url}autocomplete-search/?apiKey=${searchOptions.key}&search_value=${userSearch}&search_type=${searchOptions.filter}&region=${searchOptions.region}}`;
      axios
        .get(url)
        .then((res) => {
          setResults(res.data.results);
          navigate(`/substream/search/${userSearch.toLowerCase()}`);
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
        });
    };

    function getChoice (choice_id) {
      const url = `${searchOptions.url}title/${choice_id}/details/?apiKey=${searchOptions.key}&append_to_response=sources&regions=${searchOptions.region}`;
      axios
        .get(url)
        .then((res) => {
          setChoice(res.data);
          navigate(`/substream/detail/${choice_id}`);
        })
        .catch((error) => {
          console.error('Error fetching details:', error);
        });
    };

    function handleSubmit (event) { 
      if (event.key === 'Enter' || event.type === 'click') {
        localStorage.setItem('lastSearchString', searchString);
        getMovies(searchString)
      }
    }

    return (
      <div className='mainBox'>
        <div className='top'>
          <div className='header'>
              <h1 className='logo' onClick={handleHeaderClick}>SUBSTREAM</h1>
          </div>
          <SearchBar 
            handleChange={handleSearch}
            handleSubmit={handleSubmit}
            searchString={searchString}
            handleClear={handleClear}
            handleFilter={handleFilter}
            filters={filterOptions}
          />
        </div>
        {results ? (
        <div className='bottom ui container'>
            <Routes>
            <Route path="/" element={<Navigate to="/substream" />} />
              <Route path="/substream/search/:userSearch" element={
                <SearchResults
                  results={results}
                  onResultClick={handleResultClick}
                />
              }/>
              <Route path="/substream/detail/:choice_id" element={
                <Choice handleBack={handleBack} choice={choice}/>
              }/>
            </Routes>
        </div>
        ) : (
          <></>
        )}
      </div>
    )
}

export default App