import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './components/Header.jsx';
import NewArticleList from './components/NewArticleList.jsx';
import ReadArticle from './components/ReadArticle.jsx';
// import HotArticleList from './components/HotArticleList.jsx' ;
import { PageTitleProvider } from './components/PageTitleContext.jsx';



//articles, setArticles, topics, setTopics, users, setUsers, isLoading, setIsLoading, error, setError

function App() {
  function HomePage() {
    const [pageTitle, setPageTitle] = useState('Dummy Page');
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
        <PageTitleProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles/:article_id" element={<ReadArticle />} />

        </Routes>
        </PageTitleProvider>
    
        
       
      </div>
      
      
    
    </>
  )
}

export default App;
