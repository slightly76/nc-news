import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePageTitle } from './PageTitleContext';
import CommentsList from './CommentsList';
import getDaysPassed from './getDaysPassed';
import CommentSubmission from './CommentSubmission';
import axios from 'axios';
import './readArticle.css';

function readArticle() {
	const { article_id } = useParams();
	const { setPageTitle } = usePageTitle();
	const [article, setArticle] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axios
			.get(
				`https://slightly76-does-nc-news.onrender.com/api/articles/${article_id}`
			)
			.then((response) => {
				setArticle(response.data.article);
				setPageTitle('Read');
				setIsLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching article:', error);
				setIsLoading(false);
			});
	}),
		[article_id, setPageTitle];

	const handleUpvote = () => {
		axios
			.patch(
				`https://slightly76-does-nc-news.onrender.com/api/articles/${article_id}`,
				{ inc_votes: 1 }
			)
			.catch((error) => {
				console.error('Error updating article votes:', error);
			});
	};

	const handleDownvote = () => {
		axios
			.patch(
				`https://slightly76-does-nc-news.onrender.com/api/articles/${article_id}`,
				{ inc_votes: -1 }
			)
			.catch((error) => {
				console.error('Error updating article votes:', error);
			});
	};

	if (isLoading) return <p className='message'>Loading Article...</p>;

	if (!article) return <p className='message'>Article Not Found!</p>;

	const time = getDaysPassed(article.created_at);

	return (
		<div className='articleReadPage'>
			<p className='articleReadTitle'>{article.title}</p>
			<p className='articleReadAuthor'>
				by {article.author} in {article.topic}
			</p>
			<p className='articleReadTimeStamp'>{time}</p>

			<p className='articleReadBody'>{article.body}</p>

			<div className='voteContainer'>
				<div className='articleVotes'>
					{article.votes} Votes
					<br></br>
					<button className='voteButton' onClick={handleUpvote}>
						↑vote
					</button>
					<button className='voteButton' onClick={handleDownvote}>
						↓vote
					</button>
				</div>
			</div>

			<CommentsList article_id={article_id} />
		</div>
	);
}

export default readArticle;
