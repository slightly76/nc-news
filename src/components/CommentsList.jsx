import { useEffect, useState } from 'react';
import axios from 'axios';
import './commentsList.css';
import getDaysPassed from './getDaysPassed';
import CommentSubmission from './CommentSubmission';
import DeleteComment from './DeleteComment';

function CommentsList({ article_id }) {
	const [article, setArticle] = useState({});
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

	const addComment = (newComment) => {
		setComments((prevComments) => [newComment, ...prevComments]);
	};

	const removeComment = (comment_id) => {
		setComments((prevComments) =>
			prevComments.filter((comment) => comment.comment_id !== comment_id)
		);
	};

	if (isLoading) return <p className='message'>Loading comments...</p>;

	return (
		<div className='commentsSection'>
			<CommentSubmission article_id={article_id} addComment={addComment} />
			<h3 className='commentTitle'>User Comments</h3>
			{comments.length === 0 ? (
				<p>Be the first to comment!</p>
			) : (
				comments.map((comment) => {
					const time = getDaysPassed(comment.created_at);

					return (
						<div key={comment.comment_id} className='commentCard'>
							<p className='commentTimeStamp'>{time}</p>
							<p className='commentAuthor'>{comment.author} commented:</p>
							<p className='commentBody'>{comment.body}</p>
							{comment.author === 'jessjelly' && (
								<DeleteComment
									article_id={article_id}
									comment_id={comment.comment_id}
									removeComment={removeComment}
								/>
							)}
							<br></br>
						</div>
					);
				})
			)}
		</div>
	);
}

export default CommentsList;
