import { useState } from 'react'
import './App.css'
import ncnLogo from './assets/ncnewslogo.png';
import Header from './components/header.jsx';
import { Routes, Route } from 'react-router-dom';

//articles, setArticles, topics, setTopics, users, setUsers, isLoading, setIsLoading, error, setError

function App() {
  function HomePage() {
    return (
      <>
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
      {/* routes go here */}
        <HomePage />
       
      </div>
      
      <h1>NC News (coming soon...)</h1>
    
    </>
  )
}

export default App;
