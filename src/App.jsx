import { useState } from 'react'
import './App.css'
import ncnLogo from './assets/ncnewslogo.png';
import Header from './components/header.jsx';
import NewArticleList from './components/NewArticleList.jsx' ;
// import HotArticleList from './components/HotArticleList.jsx' ;
import { Routes, Route } from 'react-router-dom';

//articles, setArticles, topics, setTopics, users, setUsers, isLoading, setIsLoading, error, setError

function App() {
  function HomePage() {
    return (
      <>
      <NewArticleList />
      {/* <HotArticleList /> */}


      {/* <MainWindow />
      <Navbar /> */}
      {/* <Footer /> */}
      </>
    )
  }

  return (
    <>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />

        </Routes>
        
    
        
       
      </div>
      
      
    
    </>
  )
}

export default App;
