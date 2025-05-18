import { useState } from 'react';
import { Modal } from "semantic-ui-react";
import { Route, Routes } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import SearchResults from './pages/SearchResults';
import Choice from './pages/Choice';
import { connect } from 'react-redux';

function App ({ isLoaded }) {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <div className='flex flex-col items-center justify-center h-full sm:h-screen w-screen'>
        <SearchBar />
        <Routes>
          <Route index path="/" />
          <Route path="/search/:id" element={ <SearchResults /> }/>
          <Route path="/detail/:id" element={ <Choice /> }/>
        </Routes>
      </div>  
      <Modal open={showModal} onClose={() => setShowModal(false)} className='!max-w-[500px]'>
        <Modal.Content className='!bg-[#3b383f] text-[#a5d294] text-center'>
          <p>This app was built to help make sense of the modern media landscape where streamers constantly pass around content like a hot potato.</p>
          <p>Currently only serves the U.S. market.</p>
          <p>Made possible by <a href='https://api.watchmode.com/' target='_blank' rel="noreferrer" >Watchmode</a></p>
        </Modal.Content>
      </Modal>
    </>
  )
}

const mapStateToProps = state => ({
  isLoaded: state.isLoaded
})
 
export default connect(mapStateToProps, {})(App);