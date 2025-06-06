import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePageTitle } from './PageTitleContext';
import CommentsList from './CommentsList';
import getDaysPassed from './getDaysPassed';
// import CommentSubmission from './CommentSubmission';
import axios from 'axios';
import './readArticle.css';

function ReadArticle() {
	const { article_id } = useParams();
	const { setPageTitle } = usePageTitle();
	const [article, setArticle] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [hasVoted, setHasVoted] = useState(null);
	// const [authorDetails, setAuthorDetails] = useState(null);

	useEffect(() => {
		axios
			.get(
				`https://slightly76-does-nc-news.onrender.com/api/articles/${article_id}`
			)
			.then((response) => {
				setArticle(response.data.article);
				setPageTitle('Articles');
				setIsLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching article:', error);
				setIsLoading(false);
			});
	}),
		[article_id, setPageTitle];

	const handleUpvote = () => {
		if (hasVoted === 'up') return;
		axios
			.patch(
				`https://slightly76-does-nc-news.onrender.com/api/articles/${article_id}`,
				{ inc_votes: 1 }
			)
			.then(() => {
				setHasVoted('up');
			})
			.catch((error) => {
				console.error('Error updating article votes:', error);
			});
	};

	const handleDownvote = () => {
		if (hasVoted === 'down') return;
		axios
			.patch(
				`https://slightly76-does-nc-news.onrender.com/api/articles/${article_id}`,
				{ inc_votes: -1 }
			)
			.then(() => {
				setHasVoted('down');
			})
			.catch((error) => {
				console.error('Error updating article votes:', error);
			});
	};

	if (isLoading) return <p className='message'>Loading Article...</p>;

	if (!article) return <p className='message'>Article Not Found!</p>;

	const time = getDaysPassed(article.created_at);

	return (
		<div className='articleReadPage'>
			<p className='articleReadTitle'>
				{article.title}
				<br />
				<br />
				<div className='articleMeta'>
					<p className='articleReadAuthor'>
						by user {article.author} in the topic {article.topic}
						{/* {authorDetails && (
					<img
						className='userAvatar'
						src={authorDetails.avatar_url}
						alt='user avatar'
					/>
				)} */}
					</p>
					<p className='articleReadTimeStamp'>{time}</p>
				</div>
			</p>

			<p className='articleReadBody'>
				<img className='articleImage' src={article.article_img_url} />

				<br />
				{article.body}
			</p>

			<div className='voteContainer'>
				<div className='articleVotes'>
					{article.votes} Votes
					<br></br>
					<button
						className='voteButton'
						onClick={handleUpvote}
						disabled={hasVoted === 'up'}
						style={{
							opacity: hasVoted === 'up' ? 0.4 : 1,
							cursor: hasVoted === 'up' ? 'not-allowed' : 'pointer',
						}}
					>
						upvote
					</button>
					<button
						className='voteButton'
						onClick={handleDownvote}
						disabled={hasVoted === 'down'}
						style={{
							opacity: hasVoted === 'down' ? 0.4 : 1,
							cursor: hasVoted === 'down' ? 'not-allowed' : 'pointer',
						}}
					>
						downvote
					</button>
				</div>
			</div>

			<CommentsList article_id={article_id} />
		</div>
	);
}

export default ReadArticle;
