import { useEffect, useState } from 'react';
import axios from 'axios';

function CommentSubmission({ article_id }) {
	const [comment, setComment] = useState('');
	const [error, setError] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleComment = async (submit) => {
		submit.preventDefault();
		console.log(submit);
		if (!comment.trim()) return;
		setIsSubmitting(true);
		setError(null);
		const user = 'DUMMYUSER';

		try {
			const response = await axios.post(
				`https://slightly76-does-nc-news.onrender.com/api/articles/${article_id}/comments`,
				{ comment, user }
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

	return (
		<form onSubmit={handleComment} className='commentForm'>
			<textarea
				value={comment}
				onChange={(submit) => setComment(submit.target.value)}
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
