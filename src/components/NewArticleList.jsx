import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getDaysPassed from './getDaysPassed';
import { usePageTitle } from './PageTitleContext';
import './newArticleList.css';

function NewArticleList({} ) {

    const [newArticles, setNewArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { setPageTitle } = usePageTitle();

useEffect (() => {
    setIsLoading(true);
    setPageTitle('Recent Articles');

    Promise.all([
        axios.get('https://slightly76-does-nc-news.onrender.com/api/articles?sort_by=created_at')
    ])
    .then(([response]) => {
        
        setNewArticles(response.data.articles);
        setIsLoading(false);
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false)
    });
}, [setPageTitle]);

if (isLoading) return <p className="message">Please wait, loading...</p>;

return (
    <>
   
    <div className="articleListContainer">
        

        {newArticles.map((article) => {
           const time = getDaysPassed(article.created_at);
           return (
                <div className="articleListCard" key={article.article_id}>
                    <Link to={`/articles/${article.article_id}`} className="articleListTitle">
                    {article.title}
                    </Link>
                 {/* <p className="articleTitle">{article.title}</p> */}
                 <p className="articleAuthor">in {article.topic} by {article.author}</p>
                 {/* <img src={article.author.avatar_url} className="userAvatar" alt="user avatar"></img> */}
                 
                 <p className="articleTimeStamp">{time}</p>
                 <br></br>

                </div>
           )
     })}
        </div>
    </>

);
}

export default NewArticleList;