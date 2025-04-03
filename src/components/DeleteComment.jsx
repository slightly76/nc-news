import { useState } from 'react';
import axios from 'axios';
import './deleteComment.css';

function CommentDelete({ article_id, comment_id, removeComment }) {
	const [isDeleting, setIsDeleting] = useState(false);
	const [error, setError] = useState(null);

	const handleDelete = async (submit) => {
		setIsDeleting(true);
		setError(null);
		console.log('deleting', article_id, comment_id);
		try {
			await axios.delete(
				`https://slightly76-does-nc-news.onrender.com/api/comments/${comment_id}`,
				{ article_id: article_id, comment_id: comment_id }
			);
			removeComment(comment_id);
		} catch (error) {
			console.error('Comment not found:', error);
			setError('Failed to delete comment. Please try again.');
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<div>
			<button
				className='commentDeleteButton'
				onClick={handleDelete}
				disabled={isDeleting}
			>
				{isDeleting ? 'Deleting...' : 'Delete Comment'}
			</button>
			{error && <p>{error}</p>}
		</div>
	);
}

export default CommentDelete;
