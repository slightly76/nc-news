import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import getDaysPassed from './getDaysPassed';

function NewArticleList() {
console.log('NEWarticlelist');
    const [newArticles, setNewArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // let activepage = "home";
useEffect (() => {
    setIsLoading(true);

    Promise.all([
        axios.get('https://slightly76-does-nc-news.onrender.com/api/articles')
    ])
    .then(([articlesResult]) => {
        
        setNewArticles(articlesResult.data.articles);
        setIsLoading(false);
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false)
    });
}, []);

if (isLoading) return <p>Please wait, loading...</p>;

return (
    <>
    <p className="ArticleTitle">-=Articles=-</p>
    <div className="articleslist">
        

        {newArticles.map((article) => {
           const time = getDaysPassed(article.created_at);
           return (
                <div className="articleListCard" key={article.article_id}>
                 <p className="articleTitle">{article.title}</p>
                 <p className="articleAuthor">by {article.author}</p>
                 <p className="articleCreated">{time}</p>
                 <br></br>

                </div>
           )
     })}
        </div>
    </>

);
}

export default NewArticleList;