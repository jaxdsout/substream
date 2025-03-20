import { useState } from 'react';
import { Button, Modal } from "semantic-ui-react";
import { matchPath, Route, Routes, useLocation } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import SearchResults from './pages/SearchResults';
import Choice from './pages/Choice';
import Header from './components/Header'

function App () {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  const isSearchPage = matchPath("/search/:id", location.pathname);  
  const isDetailPage = matchPath("/detail/:id", location.pathname);  
  
  return (
    <div className='flex flex-col items-center justify-between h-screen'>
      <div className='flex flex-col items-center justify-center mt-4 w-11/12 md:w-1/2 h-screen'>
        <div className='flex flex-col items-center justify-center w-full'>
          <Header />
          <SearchBar />
        </div>
        
        <Routes>
          <Route index path="/" />
        </Routes>
        {(isSearchPage || isDetailPage) ? (
          <div className='w-full mt-5 mb-10 bg-[#3b383f] bg-opacity-70 rounded-lg shadow-inner drop-shadow-md border-t-8 border-b-8 border-[#3b383f] border-opacity-0'>
            <Routes>
                <Route path="/search/:id" element={ <SearchResults /> }/>
                <Route path="/detail/:id" element={ <Choice /> }/>
            </Routes>
          </div>
        ) : (
          <div className='mt-10 mb-10'>
            <i className="info circle icon cursor-pointer text-[#a5d294] hover:text-white" onClick={() => setShowModal(true)} />
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
 
export default App;