import { useState } from 'react';
import { Button, Modal } from "semantic-ui-react";
import { Route, Routes } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Choice from './components/Choice';
import Header from './components/Header'

function App () {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div className='flex flex-col items-center justify-between h-screen'>
      <div className='flex flex-col items-center justify-center'>
        <div className='min-w-[349px] max-w-[350px] md:max-w-[600px] flex flex-col items-center justify-center mt-10 z-20'>
          <Header />
          <SearchBar />
        </div>
        <Routes>
            <Route index path="/" />
            <Route path="/search/:id" element={ <SearchResults /> }/>
            <Route path="/detail/:id" element={ <Choice /> }/>
        </Routes>    
      </div>  
      
      <div>
        <i className="mt-10 !mb-10 info circle icon cursor-pointer text-[#a5d294] hover:text-white" onClick={() => setShowModal(true)} />
      </div>
        
      <Modal open={showModal} onClose={() => setShowModal(false)} className='!max-w-[500px]'>
        <Modal.Header>Substream</Modal.Header>
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