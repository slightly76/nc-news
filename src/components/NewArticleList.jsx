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
	const [sortBy, setSortBy] = useState('created_at');
	const [order, setOrder] = useState('desc');

	useEffect(() => {
		setIsLoading(true);

		const url = topic_slug
			? `https://slightly76-does-nc-news.onrender.com/api/articles?topic=${topic_slug}&sort_by=created_at&order=${order}`
			: `https://slightly76-does-nc-news.onrender.com/api/articles?sort_by=created_at&order=${order}`;

		setPageTitle(topic_slug ? `Article Topic: ${topic_slug}` : 'List Articles');

		axios
			.get(url)

			.then((articlesResult) => {
				let articles = articlesResult.data.articles;

				if (sortBy === 'comment_count') {
					articles.sort((a, b) => {
						const compareCount = a.comment_count - b.comment_count;
						return order === 'asc' ? compareCount : -compareCount;
					});
				}
				setNewArticles(articles);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
				setIsLoading(false);
			});
	}, [setPageTitle, topic_slug, sortBy, order]);

	if (isLoading) return <p className='message'>Please wait, loading...</p>;

	if (newArticles.length === 0) {
		return <p className='message'>No articles found for this topic!</p>;
	}

	return (
		<>
			<div className='articleListContainer'>
				<div className='articleSortControls'>
					<label>
						Sort by:{' '}
						<select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
							<option value='created_at'>Date</option>
							<option value='votes'>Votes</option>
							<option value='comment_count'>Comments</option>
						</select>
					</label>
					<label>
						Order:{' '}
						<select value={order} onChange={(e) => setOrder(e.target.value)}>
							<option value='desc'>↓</option>
							<option value='asc'>↑</option>
						</select>
					</label>
				</div>

				{/* <div className='articleListCard'> */}
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
								<p className='articleListVotes'>Votes {article.votes}</p>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}

export default NewArticleList;
