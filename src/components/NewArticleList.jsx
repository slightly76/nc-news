import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getDaysPassed from './getDaysPassed';
import { usePageTitle } from './PageTitleContext';
import './newArticleList.css';

function NewArticleList({}) {
	const { topic_slug } = useParams();
	const [newArticles, setNewArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { setPageTitle } = usePageTitle();

	useEffect(() => {
		setIsLoading(true);
		if (topic_slug) {
			setPageTitle(`Articles on Topic: ${topic_slug}`);

			axios
				.get(
					`https://slightly76-does-nc-news.onrender.com/api/articles?topic=${topic_slug}&sort_by=created_at`
				)

				.then((articlesResult) => {
					setNewArticles(articlesResult.data.articles);
					setIsLoading(false);
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
					setIsLoading(false);
				});
		} else {
			setPageTitle('New Articles');
			axios
				.get(
					'https://slightly76-does-nc-news.onrender.com/api/articles?sort_by=created_at'
				)
				.then((articlesResult) => {
					setNewArticles(articlesResult.data.articles);
					setIsLoading(false);
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
					setIsLoading(false);
				});
		}
	}, [setPageTitle, topic_slug]);

	if (isLoading) return <p className='message'>Please wait, loading...</p>;

	if (newArticles.length === 0) {
		return <p className='message'>No articles found for this topic!</p>;
	}

	return (
		<>
			<div className='articleListContainer'>
				<div className='articleHeader'>
					{newArticles.map((article) => {
						const time = getDaysPassed(article.created_at);
						return (
							<div className='articleListCard' key={article.article_id}>
								<Link
									to={`/articles/${article.article_id}`}
									className='articleListTitle'
								>
									{article.title}
								</Link>

								<p className='articleAuthor'>
									in {article.topic} by {article.author}
								</p>

								<p className='articleTimeStamp'>{time}</p>
								<p className='articleListVotes'>votes {article.votes}</p>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}

export default NewArticleList;
