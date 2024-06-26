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
      getChoice();
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

    function getChoice () {
      const result_id = localStorage.getItem("result_id")
      const url = `${searchOptions.url}title/${result_id}/details/?apiKey=${searchOptions.key}&append_to_response=sources`;
      axios
        .get(url)
        .then((res) => {
          setChoice(res.data);
          navigate(`/substream/detail/${result_id}`);
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


    useEffect(() => {
      const storedSearchString = localStorage.getItem('lastSearchString');
      const storedResultId = localStorage.getItem('result_id');
      
      if (storedResultId) {
        getChoice();
      } else if (storedSearchString) {
        setSearchString(storedSearchString);
        getMovies(storedSearchString);
      } else {
        navigate('/substream');
      }
    }, [navigate]);


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
        {results ? (
          <div className='middle'>
            <Routes>
              <Route path="/" element={<Navigate to="/substream" />} />
              <Route path="/substream/search/:userSearch" element={
                <SearchResults
                  results={results}
                  onResultClick={handleResultClick}
                />
              }/>
              <Route path="/substream/detail/:id" element={
                <Choice handleBack={handleBack} choice={choice} />
              }/>
            </Routes>
          </div> ) : (
            <></>
          )}
        </div>
      </div>
    )
}

export default App