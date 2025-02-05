import { useState, useEffect } from 'react';
import { Button, Modal, Icon } from "semantic-ui-react";
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
    const [showModal, setShowModal] = useState(false);

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
      navigate("/")
    }

    function handleBack (event) {
      event.preventDefault();
      localStorage.removeItem('result_id')
      const id = localStorage.getItem('lastSearchString')
      navigate(`/search/${id}`)
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
      const id = encodeURIComponent(searchString);
      const url = `${searchOptions.url}autocomplete-search/?apiKey=${searchOptions.key}&search_value=${id}&search_type=${searchOptions.filter}&region=${searchOptions.region}}`;
      axios
        .get(url)
        .then((res) => {
          setResults(res.data.results);
          navigate(`/search/${id.toLowerCase()}`);
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
          navigate(`/detail/${choice_id}`);
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

    const handleInfoClick = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
  

    return (
      <div className='flex flex-col items-center justify-between h-screen w-full'>

        <div className='flex flex-col items-center justify-between'>
          <SearchBar 
            handleChange={handleSearch}
            handleSubmit={handleSubmit}
            searchString={searchString}
            handleClear={handleClear}
            handleFilter={handleFilter}
            filters={filterOptions}
            handleHeaderClick={handleHeaderClick}
          />
          <Routes>
              <Route index path="/" />
              <Route path="/search/:id" element={
                <SearchResults
                  searchString={searchString}
                  results={results}
                  onResultClick={handleResultClick}
                  getMovies={getMovies}
                />
              }/>
              <Route path="/detail/:id" element={
                <Choice handleBack={handleBack} choice={choice} getChoice={getChoice}/>
              }/>
          </Routes>
        </div>  
        

        <div className='mb-10'>
          <Icon name="info circle" className="text-white mb-3 cursor-pointer" onClick={handleInfoClick} />
        </div>
          
        <Modal open={showModal} onClose={handleCloseModal}>
          <Modal.Header>Substream</Modal.Header>
          <Modal.Content>
            <p>This app was built to help make sense of the modern media landscape where streamers constantly pass around content like a hot potato.</p>
            <p>Currently only serves the U.S. market.</p>
            <p>Made possible by the <a href='https://api.watchmode.com/' target='_blank'>Watchmode API</a></p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={handleCloseModal}>Close</Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
}

export default App