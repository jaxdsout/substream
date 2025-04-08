import { useState } from 'react';
import { Modal } from "semantic-ui-react";
import { matchPath, Route, Routes, useLocation } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import SearchResults from './pages/SearchResults';
import Choice from './pages/Choice';
import Header from './components/Header'
import { connect } from 'react-redux';

function App ({ isLoaded }) {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  const isSearchPage = matchPath("/search/:id", location.pathname);  
  const isDetailPage = matchPath("/detail/:id", location.pathname);  
  
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='flex flex-col items-center justify-center w-11/12 md:w-1/2 h-11/12'>
        <div className={`flex flex-col items-center justify-center w-full ${isLoaded ? "" : "h-screen"}`}>
          <Header />
          <SearchBar />
        </div>
        {(isSearchPage || isDetailPage) && (
          <div className='w-full mt-5 bg-[#3b383f] bg-opacity-70 rounded-lg shadow-inner drop-shadow-md border-t-8 border-b-8 border-[#3b383f] border-opacity-0'>
            <Routes>
              <Route index path="/" />
              <Route path="/search/:id" element={ <SearchResults /> }/>
              <Route path="/detail/:id" element={ <Choice /> }/>
            </Routes>
          </div>
        )}  
      </div>  
      <Modal open={showModal} onClose={() => setShowModal(false)} className='!max-w-[500px]'>
        <Modal.Content className='!bg-[#3b383f] text-[#a5d294] text-center'>
          <p>This app was built to help make sense of the modern media landscape where streamers constantly pass around content like a hot potato.</p>
          <p>Currently only serves the U.S. market.</p>
          <p>Made possible by <a href='https://api.watchmode.com/' target='_blank' rel="noreferrer" >Watchmode</a></p>
        </Modal.Content>
      </Modal>
    </div>
  )
}

const mapStateToProps = state => ({
  isLoaded: state.isLoaded
})
 
export default connect(mapStateToProps, {})(App);