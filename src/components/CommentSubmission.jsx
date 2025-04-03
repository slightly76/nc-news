import { useEffect, useState } from 'react';
import axios from 'axios';
import './commentSubmission.css';

function CommentSubmission({ article_id }) {
	const [comment, setComment] = useState('');
	const [error, setError] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleComment = async (submit) => {
		submit.preventDefault();
		if (!comment.trim()) return;
		setIsSubmitting(true);
		setError(null);
		const user = 'jessjelly';
		const stuff = { body: comment, username: user };
		console.log('comment is', stuff);
		try {
			console.log('this is article', article_id);
			const response = await axios.post(
				`https://slightly76-does-nc-news.onrender.com/api/articles/${article_id}/comments/`,
				{ body: comment, author: user }
			);
			console.log('comment submitted', response.data);
			setComment('');
		} catch (error) {
			console.error('Error submitting comment:', error);
			setError('Failed to submit comment. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	// setComment((prevComments) => [response.data.comment, ...prevComments]);

	return (
		<form onSubmit={handleComment} className='commentForm'>
			<textarea
				value={comment}
				onChange={(e) => setComment(e.target.value)}
				placeholder='Enter your comment here...'
				className='commentBox'
				rows={4}
			/>
			<button
				type='submit'
				className='commentSubmitButton'
				disabled={isSubmitting}
			>
				{isSubmitting ? 'Submitting...' : 'Submit Comment'}
			</button>
			{error && <p className='message'>{error}</p>}
		</form>
	);
}
export default CommentSubmission;
