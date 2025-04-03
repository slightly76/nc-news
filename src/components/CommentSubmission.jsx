import { useState } from 'react';
import axios from 'axios';
import './commentSubmission.css';

function CommentSubmission({ article_id, addComment }) {
	const [comment, setComment] = useState('');
	const [error, setError] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleComment = async (submit) => {
		submit.preventDefault();
		if (!comment.trim()) return;
		setIsSubmitting(true);
		setError(null);
		const user = 'jessjelly';
		try {
			const response = await axios.post(
				`https://slightly76-does-nc-news.onrender.com/api/articles/${article_id}/comments/`,
				{ body: comment, author: user }
			);
			addComment(response.data.comment);
			setComment('');
		} catch (error) {
			console.error('Error submitting comment:', error);
			setError('Failed to submit comment. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

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
