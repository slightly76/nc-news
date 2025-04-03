import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header.jsx';
import NewArticleList from './components/NewArticleList.jsx';
import ReadArticle from './components/ReadArticle.jsx';
import Footer from './components/Footer.jsx';
import TopicList from './components/TopicList.jsx';
// import HotArticleList from './components/HotArticleList.jsx' ;
import { PageTitleProvider } from './components/PageTitleContext.jsx';

function HomePage() {
	const [pageTitle, setPageTitle] = useState('Dummy Page');

	return (
		<>
			<NewArticleList />
		</>
	);
}
function App() {
	return (
		<>
			<PageTitleProvider>
				<Header />
				<div className='pageContainer'>
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/articles/:article_id' element={<ReadArticle />} />
						<Route path='/topics/' element={<TopicList />} />
						<Route path='/topics/:topic_slug' element={<NewArticleList />} />
					</Routes>
				</div>
			</PageTitleProvider>
			<Footer />
		</>
	);
}

export default App;
