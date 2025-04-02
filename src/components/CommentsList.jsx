import { useEffect, useState } from 'react';
import axios from 'axios';
import './commentsList.css';
import getDaysPassed from './getDaysPassed';

function CommentsList({ article_id }) {
	const [comments, setComments] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axios
			.get(
				`https://slightly76-does-nc-news.onrender.com/api/articles/${article_id}/comments`
			)
			.then((response) => {
				setComments(response.data.comments);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching comments:', error);
				setIsLoading(false);
			});
	}, [article_id]);

	if (isLoading) return <p className='message'>Loading comments...</p>;

	return (
		<div className='commentsSection'>
			<h3 className='commentTitle'>Comments</h3>
			{comments.length === 0 ? (
				<p>Be the first to comment!</p>
			) : (
				comments.map((comment) => {
					const time = getDaysPassed(comment.created_at);
					return (
						<div key={comment.comment_id} className='commentCard'>
							<p className='commentTimeStamp'>{time}</p>
							<p className='commentAuthor'>{comment.author} said:</p>
							<p className='commentBody'>{comment.body}</p>
						</div>
					);
				})
			)}
		</div>
	);
}

export default CommentsList;
