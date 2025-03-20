import { useState } from 'react';
import { Button, Modal } from "semantic-ui-react";
import { Route, Routes } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import SearchResults from './pages/SearchResults';
import Choice from './pages/Choice';
import Header from './components/Header'
import { connect } from 'react-redux';

function App ({ results, choice }) {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div className='flex flex-col items-center justify-between h-screen'>
      <div className='h-screen flex flex-col items-center justify-center mt-4 w-11/12 md:w-1/2'>
        <Header />
        <SearchBar />
        <Routes>
            <Route index path="/" />
            <Route path="/search/:id" element={ <SearchResults /> }/>
            <Route path="/detail/:id" element={ <Choice /> }/>
        </Routes>
        {results || choice ? null : (
          <div>
            <i className="mt-10 !mb-10 info circle icon cursor-pointer text-[#a5d294] hover:text-white" onClick={() => setShowModal(true)} />
          </div> 
        )}  
      </div>  
      <Modal open={showModal} onClose={() => setShowModal(false)} className='!max-w-[500px]'>
        <Modal.Header><p className='text-black'>Substream</p></Modal.Header>
        <Modal.Content>
          <p>This app was built to help make sense of the modern media landscape where streamers constantly pass around content like a hot potato.</p>
          <p>Currently only serves the U.S. market.</p>
          <p>Made possible by the <a href='https://api.watchmode.com/' target='_blank' rel="noreferrer" >Watchmode API</a></p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}

const mapStateToProps = state => ({
  results: state.results,
  choice: state.choice
})
 
export default connect(mapStateToProps, {  })(App);